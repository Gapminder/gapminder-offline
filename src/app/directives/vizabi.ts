import {
  EventEmitter, Input, Output, AfterContentInit, OnDestroy, Directive, ElementRef
} from '@angular/core';
import { MessageService } from '../message.service';
import { ElectronService } from '../providers/electron.service';

const isReaderReady = {};

@Directive({
  selector: 'vizabi'
})
export class VizabiDirective implements AfterContentInit, OnDestroy {
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
  private urlUpdateDisposer;

  constructor(private element: ElementRef, private ms: MessageService, private es: ElectronService) {
    this.createPlaceholder();
  }

  static removeElement(element: any) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  ngAfterContentInit(): void {
    this.createChart({
      model: {currentValue: this.model}
    });
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

    if (this.viz && this.viz.services && this.viz.model.locale) {
      this.viz.services.locale.id = _language;
      this.reloadTime = new Date().getTime();
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

      const currentModel = JSON.parse(JSON.stringify(this.viz.getModel()));
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

  @Input('reloadTime')
  get reloadTime() {
    return this._reloadTime;
  }

  set reloadTime(_reloadTime: number) {
    try {
      if (!this.viz || !_reloadTime) {
        return;
      }
      const currentModel = JSON.parse(JSON.stringify(this.viz.getModel()));

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
    try {
      this.urlUpdateDisposer && this.urlUpdateDisposer();
      this.es.vizabi.clearInstances(this.viz._id);
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
      try {
          
        this.vizabiModel = {};

        // this.vizabiModel.bind = {
        //   ready: () => {
        //     this.onPersistentChange();
        //     setTimeout(() => {
        //       this.ms.unlock();
        //     }, 300);
        //   },
        //   persistentChange: () => {
        //     this.onPersistentChange();
        //   },
        //   readyOnce: () => {
        //     this.onReadyOnce.emit({
        //       order: this.order,
        //       type: this.chartType,
        //       minInitialModel: this.model,
        //       component: this.viz
        //     });
        //   },
        //   'load_error': (event: any, error: string) => {
        //     this.emitError(error);
        //     this.ms.unlock();
        //   }
        // };

        this.readerProcessing();

        const placeholder = "." + this.placeholder.className;
        const {
          deepExtend,
          diffObject
        } = this.es.VizabiSharedComponents.LegacyUtils;

        this.vizabiModel = deepExtend({},
          changes.model.currentValue, this.getAdditionalData(), this.vizabiModel);
        this.vizabiPageModel = deepExtend({
          ui: {
            layout: deepExtend({}, this.es.VizabiSharedComponents.LayoutService.DEFAULTS, {
              placeholder: placeholder
            }),
            locale: deepExtend({}, this.es.VizabiSharedComponents.LocaleService.DEFAULTS, {
              placeholder: placeholder
            })
          }
        }, this.vizabiModel);
        //delete this.vizabiPageModel.bind;

        const {
          observable,
          autorun,
          toJS
        } = this.es.mobx;
        const VIZABI_UI_CONFIG = observable({});

        const VIZABI_LOCALE = observable(this.vizabiPageModel.ui.locale);
        if (VIZABI_UI_CONFIG.locale !== undefined) VIZABI_LOCALE.id = VIZABI_UI_CONFIG.locale;
        const VIZABI_LAYOUT = observable(this.vizabiPageModel.ui.layout);
        if (VIZABI_UI_CONFIG.projector !== undefined) VIZABI_LAYOUT.projector = VIZABI_UI_CONFIG.projector;
  
  

        const fullModel = deepExtend({}, this.vizabiModel, true);
        const lastModified = new Date().getTime();

        //this.refreshLastModified(fullModel, lastModified);

        // if (changes.isStateEmpty) {
        //   delete fullModel.state;
        // }

        //this.ms.lock();

        // if (fullModel.locale) {
        //   fullModel.locale.id = this.language;
        // } else {
        //   fullModel.locale = {
        //     id: this.language
        //   };
        // }

        const model = this.es.Vizabi(fullModel.model);

        this.viz = new this.es[this.chartType]({
          Vizabi: this.es.Vizabi,
          placeholder: "." + this.placeholder.className,
          model,
          locale: VIZABI_LOCALE,
          layout: VIZABI_LAYOUT,
          ui: VIZABI_UI_CONFIG,
          default_ui: this.vizabiPageModel.ui,
          options: {
            showLoading: true
          }
        });

        const VIZABI_DEFAULT_MODEL = diffObject(
          toJS(this.viz.model.config, { recurseEverything: true }),
          {}
          //(URLI.model && URLI.model.model) ? deepExtend({}, URLI.model.model) : {}
        );

        const removeProperties = (obj, array, keyStack = "") => {
          Object.keys(obj).forEach(key => {
            if (array.some(s => (keyStack + "." + key).endsWith(s)))
              delete obj[key];
            else
              (obj[key] && typeof obj[key] === "object") && removeProperties(obj[key], array, keyStack + "." + key);
          });
          return obj;
        };
    
        this.urlUpdateDisposer = autorun(() => {
          const Utils = this.es.VizabiSharedComponents.Utils;
          const UI_CONFIG = VIZABI_UI_CONFIG;
          const DEFAULT_MODEL = VIZABI_DEFAULT_MODEL;
          const MODEL = this.vizabiModel;
          const LOCALE = VIZABI_LOCALE;
          const LAYOUT = VIZABI_LAYOUT;
          const PAGE_MODEL = this.vizabiPageModel;
  
          let jsmodel = toJS(this.viz.model.config, { recurseEverything: true });
          let jsui = toJS(UI_CONFIG, { recurseEverything: true });
  
          jsmodel = diffObject(jsmodel, DEFAULT_MODEL || {});
          jsui = diffObject(jsui, MODEL.ui);
  
          const model = {
            model: Utils.clearEmpties(removeProperties(jsmodel, ["highlighted", "superhighlighted", "locale", "range", "frame.scale.domain"])),
            ui: Utils.clearEmpties(removeProperties(jsui, ["dragging", "opened"]))
          };
  
          if (PAGE_MODEL.ui.locale.id !== LOCALE.id)
            model.ui.locale = LOCALE.id;
          else
            delete model.ui.locale;
          if (PAGE_MODEL.ui.layout.projector !== LAYOUT.projector)
            model.ui.projector = LAYOUT.projector;
          else
            delete model.ui.projector;
  
          DEFAULT_MODEL 
          //&& updateURL(model, undefined, true);
        }, { name: "tool.js: update url" });




        this.onCreated.emit({
          order: this.order,
          type: this.chartType,
          model: this.vizabiPageModel,
          component: this.viz
        });
      } catch (error) {
        this.emitError(error);
        this.ms.unlock();
      }
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

      this.es.Vizabi.stores.dataSources.createAndAddType(this.readerName, readerObject);

      isReaderReady[this.readerName] = true;
    }
  }

  private onPersistentChange() {
    if (this.poppedState && this.es.vizabi.utils.comparePlainObjects(this.viz.getModel(), this.poppedState)) {
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
    this.placeholder.className = 'vzb-placeholder';
    this.placeholder.style.width = '100%';
    this.placeholder.style.height = '100%';
    this.element.nativeElement.appendChild(this.placeholder);
  }
}
