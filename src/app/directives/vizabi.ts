import { cloneDeep } from 'lodash';
import {
  EventEmitter, Input, Output, OnDestroy, Directive, ElementRef, OnChanges,
  SimpleChanges
} from '@angular/core';
import { ElectronService } from '../providers/electron.service';

const isReaderReady = {};

function clone(f) {
  const temp = function temporary() {
    return f.apply(this, arguments);
  };

  for (const key in f) {
    if (f.hasOwnProperty(key)) {
      temp[key] = f[key];
    }
  }

  return temp;
}

@Directive({
  selector: 'vizabi'
})
export class VizabiDirective implements OnDestroy, OnChanges {
  @Input() order: number;
  @Input() readerModuleObject;
  @Input() readerGetMethod: string;
  @Input() readerPlugins: any[];
  @Input() readerName: string;
  @Input() chartType: string;
  @Input() stopUrlRedirect: boolean;
  @Input() model;
  @Input() restoreStateAfterReload: boolean;

  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onCreated: EventEmitter<any> = new EventEmitter();
  @Output() onChanged: EventEmitter<any> = new EventEmitter();
  @Output() onReadyOnce: EventEmitter<any> = new EventEmitter();
  @Output() onError: EventEmitter<any> = new EventEmitter();

  private ownVizabi;
  private viz;
  private vizabiModel;
  private vizabiPageModel;
  private placeholder;
  private _active = false;
  private _language: string;
  private _additionalItems: any[] = [];
  private _reloadTime: number;
  private prevStateStr;
  private poppedState = null;

  constructor(private element: ElementRef, private es: ElectronService) {
    this.ownVizabi = clone(this.es.vizabi);
    this.createPlaceholder();
  }

  static removeElement(element: any) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model && changes.model.isFirstChange()) {
      this.createChart(changes);
    }
  }

  @Input('active')
  get active(): boolean {
    return this._active;
  }

  set active(_active: boolean) {
    this._active = _active;

    if (!this._active) {
      this.deactivate();
    }
  }

  @Input('language')
  get language(): string {
    return this._language;
  }

  set language(_language: string) {
    if (!_language) {
      return;
    }

    this._language = _language;

    if (this.viz && this.viz.model && this.viz.model.locale) {
      this.viz.model.locale.set('id', _language);
    }
  }

  @Input('additionalItems')
  get additionalItems(): any[] {
    return this._additionalItems;
  }

  set additionalItems(_additionalItems: any[]) {
    try {
      this._additionalItems.push(..._additionalItems);

      if (!this.viz || this._additionalItems.length <= 0) {
        return;
      }

      this.viz.clear();
      VizabiDirective.removeElement(this.placeholder);

      this.createPlaceholder();
      this.createChart({
        model: {currentValue: this.model}
      });
    } catch (additionalItemsError) {
      this.emitError(additionalItemsError);
    }
  }

  @Input('reloadTime')
  get reloadTime() {
    return this._reloadTime;
  }

  set reloadTime(_reloadTime: number) {
    try {
      if (!this.viz || !_reloadTime) {
        return;
      }
      const currentModel = Object.assign({}, this.model);

      this._reloadTime = _reloadTime;
      this.viz.clear();

      VizabiDirective.removeElement(this.placeholder);

      this.createPlaceholder();
      this.createChart({
        model: {currentValue: currentModel}
      });
    } catch (additionalItemsError) {
      this.emitError(additionalItemsError);
    }
  }

  ngOnDestroy() {
    // this.deactivate();

    try {
      Object.keys(this.ownVizabi._instances).forEach((instanceKey: any) => {
        this.ownVizabi._instances[instanceKey] = null;
      });

      // this.viz.clear();
      delete this.vizabiPageModel.bind;
      this.vizabiPageModel = null;
      this.readerModuleObject = null;
      this.vizabiModel = null;
      this.viz = null;
      this.ownVizabi = null;

      VizabiDirective.removeElement(this.placeholder);
    } catch (generalError) {
      this.emitError(generalError);
    }
  }

  private refreshLastModified(fullModel, lastModified) {
    for (const modelKey of Object.keys(fullModel)) {
      if (modelKey === 'data' || modelKey.indexOf('data_') === 0) {
        fullModel[modelKey].lastModified = lastModified;
        fullModel[modelKey]._lastModified = lastModified;
      }
    }
  }

  private createChart(changes) {
    setTimeout(() => {
      this.vizabiModel = {};

      this.vizabiModel.bind = {
        ready: () => {
          this.onPersistentChange();
        },
        persistentChange: () => {
          this.onPersistentChange();
        },
        readyOnce: () => {
          this.onReadyOnce.emit({
            order: this.order,
            type: this.chartType,
            minInitialModel: this.model,
            component: this.viz
          });
        },
        'load_error': (event: any, error: string) => {
          this.emitError(error);
        }
      };

      this.readerProcessing();

      this.vizabiModel = this.ownVizabi.utils.deepExtend({},
        changes.model.currentValue, this.getAdditionalData(), this.vizabiModel);
      this.vizabiPageModel = this.ownVizabi.utils.deepExtend({}, this.vizabiModel);
      delete this.vizabiPageModel.bind;

      const fullModel = this.ownVizabi.utils.deepExtend({}, this.vizabiModel, true);
      const lastModified = new Date().getTime();

      this.refreshLastModified(fullModel, lastModified);

      if (changes.isStateEmpty) {
        delete fullModel.state;
      }

      // this.viz = cloneDeep(this.ownVizabi(this.chartType, this.placeholder, fullModel));

      this.onCreated.emit({
        order: this.order,
        type: this.chartType,
        model: this.vizabiPageModel,
        component: this.viz
      });
    });
  }

  private getAdditionalData() {
    const result = {};

    if (this.additionalItems && this.additionalItems.length > 0) {
      for (const additionalItem of this.additionalItems) {
        const parsedPath = additionalItem.path.split(/[\\/]/);
        const name = parsedPath[parsedPath.length - 1];
        const newAdditionalItemHash = `data_${name}`;

        if (!result[newAdditionalItemHash]) {
          result[newAdditionalItemHash] = additionalItem;
        }
      }
    }

    return result;
  }

  private emitError(error: any) {
    this.onError.emit(error);
  }

  private readerProcessing() {
    if (this.readerModuleObject && this.readerGetMethod && this.readerName &&
      this.readerPlugins && this.readerModuleObject[this.readerGetMethod] && !isReaderReady[this.readerName]) {
      const readerObject = this.readerModuleObject[this.readerGetMethod].apply(this, this.readerPlugins);

      this.ownVizabi.Reader.extend(this.readerName, readerObject);

      isReaderReady[this.readerName] = true;
    }
  }

  private onPersistentChange() {
    if (this.poppedState && this.ownVizabi.utils.comparePlainObjects(this.viz.getModel(), this.poppedState)) {
      return;
    }

    const minModelDiff = this.viz.getPersistentMinimalModel(this.vizabiPageModel);
    delete minModelDiff.bind;
    const minModelDiffStr = JSON.stringify(minModelDiff);

    if (minModelDiffStr === this.prevStateStr) {
      return false;
    }

    this.prevStateStr = minModelDiffStr;

    this.onChanged.emit({
      order: this.order,
      type: this.chartType,
      modelDiff: minModelDiff,
      minInitialModel: this.model
    });
  }

  private deactivate() {
    if (this.viz && this.viz.components) {
      this.viz.components.find((component: any) => component.name === 'gapminder-dialogs').closeAllDialogs(true);
    }
  }

  private createPlaceholder() {
    this.placeholder = document.createElement('div');
    this.placeholder.style.width = '100%';
    this.placeholder.style.height = '100%';
    this.element.nativeElement.appendChild(this.placeholder);
  }
}
