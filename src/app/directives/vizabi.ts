import {
  EventEmitter, Input, Output, AfterContentInit, OnDestroy, Directive, ElementRef
} from '@angular/core';
import { MessageService } from '../message.service';
import { ElectronService } from '../providers/electron.service';

const isReaderReady = {};
const readersDefinitions = {
  'excel': (es) => es.ExcelReader.excelReaderObject(es.Vizabi.csvReader),
  'ddf-csv': (es) => {
    const BackendFileReader = es.ddfCsvReader.BackendFileReader;
    const readerModuleObject = es.ddfCsvReader;
    const readerGetMethod = 'getDDFCsvReaderObject';
    const readerPlugins = es.devMode ? [new BackendFileReader(), console] : [new BackendFileReader()];
    return readerModuleObject[readerGetMethod].apply(this, readerPlugins);        
  }
}

@Directive({
  selector: 'vizabi'
})
export class VizabiDirective implements AfterContentInit, OnDestroy {
  @Input() order: number;
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
  private disposers = [];
  private urlUpdateDisposer: any;

  constructor(private element: ElementRef, private ms: MessageService, private es: ElectronService) {
  }

  ngOnInit(): void {
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

    if (this.viz && this.viz.services && this.viz.services.locale) {
      this.viz.services.locale.id = _language;
      //this.reloadTime = new Date().getTime();
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

      const currentModel = JSON.parse(JSON.stringify(this.model));
      this.urlUpdateDisposer && this.urlUpdateDisposer();
      this.removeTool();
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
      this._reloadTime = _reloadTime;

      const currentModel = JSON.parse(JSON.stringify(this.model));
      this.urlUpdateDisposer && this.urlUpdateDisposer();
      this.removeTool();
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
      this.removeTool();
      VizabiDirective.removeElement(this.placeholder);
    } catch (generalError) {
      this.emitError(generalError);
    }
  }

  private refreshLastModified(dataSources, lastModified) {
    for (const dsName of Object.keys(dataSources)) {
      dataSources[dsName].lastModified = lastModified;
      dataSources[dsName]._lastModified = lastModified;
    }
  }

  private bindLoadEvents(viz, markerName) {
    const markers = viz.model.markers;
    const marker = markers[markerName];
    const splashMarker = viz.splashMarker;
  
    const registerLoadFinish = (loadMarker, id) => {
      //console.time(id);

      const dispose = this.es.mobx.when(
        () => loadMarker.state == "fulfilled",
        () => {
          this.onReadyOnce.emit({
                  order: this.order,
                  type: this.chartType,
                  minInitialModel: this.model,
                  component: this.viz
                });
          // console.timeEnd(id);
          // const time = timeLogger.snapOnce(id);
          // if (gtag && time) gtag("event", "timing_complete", {
          //   "name": id + " load",
          //   "value": time,
          //   "event_category": "Page load",
          //   "event_label": appState.tool
          // });
        },
        { name: id + " google load registration",
          onError: (err) => {
            console.log(err);
          }
        }
      );  
      this.disposers.push(dispose);
    }  

    // if (splashMarker) {
    //   registerLoadFinish(splashMarker, "SPLASH");
    // }
    registerLoadFinish(marker, "FULL");

  }

  private createChart(changes) {
    setTimeout(() => {
      try {
        this.ms.unlock();

        const {
          observable,
          autorun,
          toJS
        } = this.es.mobx;

        const {
          deepExtend,
          diffObject,
          isEmpty
        } = this.es.VizabiSharedComponents.LegacyUtils;

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


        const placeholder = "." + this.placeholder.className;

        this.vizabiModel = deepExtend({},
          changes.model.currentValue, this.getAdditionalData(), this.vizabiModel);
                
        this.registerReaders(this.vizabiModel.model.dataSources);
        
        const markerNames = Object.keys(this.vizabiModel.model.markers);

        const toolMarkerNames = ["bubble", "line", "bar", "mountain", "pyramid", "spreadsheet"];
        let toolMarkerIndex = markerNames.findIndex(markerName => toolMarkerNames.includes(markerName));
        const toolMarkerName = markerNames[toolMarkerIndex];
        markerNames.splice(toolMarkerIndex, 1);
        markerNames.push(toolMarkerName);
        toolMarkerIndex = markerNames.length - 1;

        const markerAlterNames = markerNames.map(markerName => markerName + "-" + this.order);

        //disable splash
        this.vizabiModel.model.markers[markerNames[toolMarkerIndex]].encoding.frame.splash = false;

        let strConfig = JSON.stringify(this.vizabiModel);

        markerNames.forEach((markerName, i) => {
          const re = new RegExp(`((?<=markers.)${markerName}|(?<=")${markerName}(?="\s*:))`,"g");
          strConfig = strConfig.replace(re, markerAlterNames[i]);
        });
        
        const vizabiModelUpdated = JSON.parse(strConfig);
        this.vizabiModel.model.markers = vizabiModelUpdated.model.markers;
        if (this.vizabiModel.model.presets) {
          this.vizabiModel.model.presets = vizabiModelUpdated.model.presets;
        }

        this.vizabiPageModel = deepExtend({
          ui: {
            layout: deepExtend({}, this.es.VizabiSharedComponents.LayoutService.DEFAULTS),
            locale: deepExtend({}, this.es.VizabiSharedComponents.LocaleService.DEFAULTS)
          }
        }, this.vizabiModel);
        this.vizabiPageModel.ui.layout.placeholder = placeholder;
        this.vizabiPageModel.ui.locale.placeholder = placeholder;

        const VIZABI_UI_CONFIG = observable({});

        const VIZABI_LOCALE = observable(this.vizabiPageModel.ui.locale);
        if (VIZABI_UI_CONFIG.locale !== undefined) VIZABI_LOCALE.id = VIZABI_UI_CONFIG.locale;
        const VIZABI_LAYOUT = observable(this.vizabiPageModel.ui.layout);
        if (VIZABI_UI_CONFIG.projector !== undefined) VIZABI_LAYOUT.projector = VIZABI_UI_CONFIG.projector;
  
  

        const fullModel = deepExtend({}, this.vizabiModel, true);
        const lastModified = new Date().getTime();

        this.refreshLastModified(fullModel.model.dataSources, lastModified);

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
          id: "c0_" + this.order,
          Vizabi: this.es.Vizabi,
          placeholder: "." + this.placeholder.className,
          model,
          locale: VIZABI_LOCALE,
          layout: VIZABI_LAYOUT,
          ui: VIZABI_UI_CONFIG,
          default_ui: this.vizabiPageModel.ui,
          options: {
            showLoading: true,
            markerName: markerAlterNames[toolMarkerIndex],
            markerNames: markerNames.reduce((result, markerName , i) => {
              result[markerName] = markerAlterNames[i];
              return result;
            }, {})
          }
        })

        this.bindLoadEvents(this.viz, markerAlterNames[toolMarkerIndex]);

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
  
          //jsmodel = diffObject(jsmodel, DEFAULT_MODEL || {});
          
          //jsui = diffObject(jsui, MODEL.ui);
          jsui = deepExtend(deepExtend({}, PAGE_MODEL.ui), jsui);

          const model: any = {
            // model: Utils.clearEmpties(removeProperties(jsmodel, ["highlighted", "superhighlighted", "locale", "range", "frame.scale.domain"])),
            // ui: Utils.clearEmpties(removeProperties(jsui, ["dragging", "opened"]))
            model: removeProperties(jsmodel, ["highlighted", "superhighlighted", "locale", "range", "frame.scale.domain"]),
            ui: removeProperties(jsui, ["dragging", "opened"]),
            url: "v1"
          };
  
          // if (PAGE_MODEL.ui.locale.id !== LOCALE.id)
          //   model.ui.locale = LOCALE.id;
          // else
          //   delete model.ui.locale;
          // if (PAGE_MODEL.ui.layout.projector !== LAYOUT.projector)
          //   model.ui.projector = LAYOUT.projector;
          // else
          //   delete model.ui.projector;
  
          //DEFAULT_MODEL && (!isEmpty(model.model) || !isEmpty(model.ui)) && 
          if(DEFAULT_MODEL) {
            let strConfig = JSON.stringify(model);
            markerAlterNames.forEach((markerName, i) => {
              const re = new RegExp(`\\b${markerName}\\b`,"g");
              strConfig = strConfig.replace(re, markerNames[i]);
            });

            this.model = JSON.parse(strConfig);
    
            this.onChanged.emit({
              order: this.order,
              type: this.chartType,
              model: this.model
              //modelDiff: minModelDiff,
              //minInitialModel: this.model
            });
          }
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
        const newAdditionalItemHash = `${additionalItem.modelType || "csv"}_${name}`;

        if (!result[newAdditionalItemHash]) {
          result[newAdditionalItemHash] = additionalItem;
        }
      }
    }
    this.additionalItems.length = 0;

    return {
      model: {
        dataSources: result
      }
    }
  }

  private emitError(error: any) {
    this.onError.emit(error);
  }

  private registerReaders(dataSources = {}) {
    const dataSourceNames = Object.keys(dataSources);
    dataSourceNames.forEach(dsName => {
      const readerType = dataSources[dsName].modelType;
      if (readerType && readersDefinitions[readerType] && !isReaderReady[readerType]) {
        this.es.Vizabi.stores.dataSources.createAndAddType(readerType, readersDefinitions[readerType](this.es));
        isReaderReady[readerType] = true;          
      }
    });
  }

  private removeTool() {
    if (this.viz) {
      const markerNames = this.viz.options.markerNames;
      this.viz.deconstruct();
      this.viz = void 0;
      let dispose;
      while (dispose = this.disposers.pop()) {
        dispose();
      }
      Object.values(markerNames).forEach(markerName => {
        this.es.mobx.runInAction(() => {
          this.es.Vizabi.stores.markers.dispose(markerName);
        });
      });
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
    this.placeholder.className = 'vzb-placeholder_' + this.order;
    this.placeholder.style.width = '100%';
    this.placeholder.style.height = '100%';
    this.element.nativeElement.appendChild(this.placeholder);
  }
}
