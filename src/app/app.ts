import {NgModule, Component, OnInit, NgZone, ViewChild, ElementRef, ViewContainerRef} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ModalDirective} from 'ng2-bootstrap/components/modal/modal.component';
import {AutoUpdateComponent} from './components/auto-update';
import {DdfFolderFormComponent} from './components/ddf-folder-form';
import {PresetsFormComponent} from './components/presets-form';
import {PresetService} from './components/preset-service';
import {ConfigService} from './components/config-service';
import {AdditionalDataComponent, IAdditionalDataItem} from './components/additional-data';
import {AdditionalDataFormComponent} from './components/additional-data-form';
import {VersionsFormComponent} from './components/versions-form';
import {VizabiModule} from 'ng2-vizabi/ng2-vizabi';
import {configSg} from './components/config-sg';

declare var electron: any;

/* class Progress {
  public value: number;

  constructor() {
    this.initProgress();
  }

  public initProgress() {
    this.value = 0;
  }

  public setProgress(progress: number) {
    this.value = progress;
  }

  public incProgress(value: number) {
    this.value += value;
  }

  public isProgress(): boolean {
    return this.value > 0 && this.value <= 100;
  }
}*/

class Tab {
  public active: boolean;
  public removable: boolean = true;
  public model: any;
  public additionalData: Array<IAdditionalDataItem> = [];

  private order: number;

  constructor(public chartType: string, order: number, active: boolean = false) {
    this.order = order + 1;
    this.active = active;

    if (order === 0) {
      this.removable = false;
    }
  }

  public getOrder() {
    return this.order;
  }

  public getCustomClass(): string {
    return this.active ? 'customClass' : '';
  }
}

@Component({
  selector: 'ae-app',
  template: `
<div style="position: absolute; top: -3px; left: 10px;">
    <a class="header-title">GAPMINDER TOOLS</a>
</div>

<div style="position: absolute; top: 0; right: 50px; width: 300px;">
  <ae-auto-update></ae-auto-update>
</div>

<div style="position: absolute; top: 0; right: 0;">
    <div class="ddf-menu">
        <div class="btn-group" dropdown [(isOpen)]="status.isMenuOpen">
            <button id="single-button"
                    type="button"
                    dropdownToggle
                    style="margin-top: -3px;"
                    class="btn btn-default"><img src="./public/images/hamburger.png" />
            </button>
            
            <ul dropdownMenu role="menu" aria-labelledby="single-button" class="menu show-menu">
                <li class="menu-item submenu">
                    <button type="button" class="menu-btn"><span class="menu-text">New chart</span></button>
                    <ul class="menu">
                        <li class="menu-item" (click)="doGapminderChart()">
                            <button type="button" class="menu-btn"><span class="menu-text">Gapminder data</span> </button>
                        </li>
                        <li class="menu-item submenu">
                            <button type="button" class="menu-btn"><span class="menu-text">Your data</span> </button>
                            <ul class="menu">
                                <li class="menu-item">
                                    <button type="button" class="menu-btn"><span class="menu-text">CSV file...</span> </button>
                                </li>
                                <li class="menu-item" (click)="doNewDdfFolder()">
                                    <button type="button" class="menu-btn"><span class="menu-text">DDFcsv dataset</span> </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="menu-item submenu">
                    <button type="button" class="menu-btn"><span class="menu-text">Add your data</span></button>
                    <ul class="menu">
                        <li class="menu-item" (click)="doAddCsvFile()">
                            <button type="button" class="menu-btn"><span class="menu-text">CSV file...</span> </button>
                        </li>
                        <li class="menu-item" (click)="doAddDdfFolder()">
                            <button type="button" class="menu-btn"><span class="menu-text">DDFcsv dataset</span> </button>
                        </li>
                    </ul>
                </li>
                <li class="menu-separator"></li>
                <li class="menu-item">
                    <button type="button" class="menu-btn"><span class="menu-text">Open...</span></button>
                </li>
                <li class="menu-item">
                    <button type="button" class="menu-btn"><span class="menu-text">Save...</span></button>
                </li>
                <li class="menu-separator"></li>
                <li class="menu-item" (click)="versionsModal.show()">
                    <button type="button" class="menu-btn"><span class="menu-text">Update</span></button>
                </li>
                <li class="menu-item" (click)="openDevTools()">
                    <button type="button" class="menu-btn"><span class="menu-text">Open dev tools</span> </button>
                </li>
            </ul>
        </div>
    </div>
</div>

<div style="min-width: 800px; height: calc(100% - 52px);">
    <tabset *ngIf="tabs.length > 0"
            style="height: 100%">
        <tab *ngFor="let tab of tabs"
             heading="Chart {{tab.order}}"
             style="height: 100%"
             [active]="tab.active"
             (select)="tab.active = true; forceResize();"
             (deselect)="tab.active = false"
             [removable]="tab.removable">
            <!--<div class="ddf-progress"
                 [style.width]="progress.value + '%'"
                 [style.display]="progress.value > 0 ? 'block' : 'none'"></div>-->
            <vizabi style="height: 100%;"
                    (onCreated)="chartCreated($event)"
                    (onChanged)="chartChanged($event)"
                    [order]="tab.getOrder()"
                    [readerModuleObject]="readerModuleObject"
                    [readerGetMethod]="readerGetMethod"
                    [readerParams]="readerParams"
                    [readerName]="readerName"
                    [model]="tab.model"
                    [extResources]="extResources"
                    [additionalItems]="tab.additionalData"
                    [chartType]="tab.chartType"></vizabi>
        </tab>
    </tabset>
</div>

<div bsModal
     #ddfModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="Open DDF folder"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="ddfModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">DDF folder settings</h4>
            </div>
            <div class="modal-body">
                <ae-ddf-folder-form (done)="ddfFolderFormComplete($event)"></ae-ddf-folder-form>
            </div>
        </div>
    </div>
</div>

<div bsModal
     #additionalDataModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="Add extra data"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="additionalDataModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Addition data</h4>
            </div>
            <div class="modal-body">
                <ae-additional-data-form (done)="additionalDataFormComplete($event)"></ae-additional-data-form>
            </div>
        </div>
    </div>
</div>

<div bsModal
     #presetsModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="Presets"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="presetsModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Presets</h4>
            </div>
            <div class="modal-body">
                <ae-presets-form (done)="presetsFormComplete($event)"></ae-presets-form>
            </div>
        </div>
    </div>
</div>

<div bsModal
     #versionsModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="Versions"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="versionsModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Update</h4>
            </div>
            <div class="modal-body">
                <ae-versions-form (done)="versionsFormComplete($event)"></ae-versions-form>
            </div>
        </div>
    </div>
</div>

<input type="file" style="display: none;" #newDdfFolder (change)="onDdfFolderChanged($event)" webkitdirectory directory />
<input type="file" style="display: none;" #addDdfFolder (change)="onDdfExtFolderChanged($event)" webkitdirectory directory />
<input type="file" style="display: none;" #addCsvFile (change)="onCsvFileChanged($event)" />
`
})
export class AppComponent implements OnInit {
  public tabs: Tab[] = [];
  public status: {isMenuOpen: boolean} = {isMenuOpen: false};

  @ViewChild('ddfModal') public ddfModal: ModalDirective;
  @ViewChild('additionalDataModal') public additionalDataModal: ModalDirective;
  @ViewChild('presetsModal') public presetsModal: ModalDirective;
  @ViewChild('versionsModal') public versionsModal: ModalDirective;

  @ViewChild('newDdfFolder') newDdfFolderInput: ElementRef;
  @ViewChild('addDdfFolder') addDdfFolderInput: ElementRef;
  @ViewChild('addCsvFile') addCsvFileInput: ElementRef;

  private readerModuleObject: any;
  private readerGetMethod: string;
  private readerParams: Array<any>;
  private readerName: string;
  private extResources: any;
  // private progress: Progress;

  constructor(private _ngZone: NgZone,
              private viewContainerRef: ViewContainerRef,
              private ddfFolderForm: DdfFolderFormComponent,
              private configService: ConfigService) {
    electron.ipcRenderer.send('get-app-path');
  }

  ngOnInit() {
    let processed = false;

    electron.ipcRenderer.on('got-app-path', (event, path) => {
      this.ddfFolderForm.electronPath = path;

      if (!processed) {
        this.readerModuleObject = this.ddfFolderForm.getDdfCsvReaderObject();
        this.readerGetMethod = 'getDDFCsvReaderObject';
        this.readerParams = [this.ddfFolderForm.fileReader];
        this.readerName = 'ddf1-csv-ext';
        this.extResources = {
          host: this.ddfFolderForm.ddfUrl,
          preloadPath: 'preview-data/'
        };

        this.defaultChart();

        processed = true;
      }
    });

    // this.progress = new Progress();
  }

  private openDevTools() {
    electron.ipcRenderer.send('open-dev-tools');
  }

  private presetsFormComplete(event) {
    this.presetsModal.hide();
  }

  private ddfFolderFormComplete(event) {
    this.ddfModal.hide();

    if (event.ddfFolderForm) {
      this.newChart(() => {
        this._ngZone.run(() => {
        });
      }, false, event.ddfFolderForm);
    }
  }

  private defaultChart() {
    this.newChart(() => {
      this._ngZone.run(() => {
      });
    });
  }

  private newChart(onChartReady, isDefaults = true, ddfFolderForm = this.ddfFolderForm) {
    if (isDefaults) {
      ddfFolderForm.defaults();
    }

    // this.progress.initProgress();

    // const progress = this.progress;
    const tab = new Tab(ddfFolderForm.ddfChartType, this.tabs.length, true);
    const configRequestParameters = {
      ddfPath: ddfFolderForm.ddfUrl,
      chartType: ddfFolderForm.ddfChartType,
      onProgress: (value: number) => {
        // progress.incProgress(value);
      }
    };

    tab.additionalData = ddfFolderForm.additionalData;

    // predefined config for SG
    if (!ddfFolderForm.ddfUrl || ddfFolderForm.ddfUrl.indexOf('systema_globalis') > 0) {
      const config = configSg.BubbleChart;

      config.data.ddfPath = ddfFolderForm.ddfUrl;
      config.data.path = ddfFolderForm.ddfUrl;

      tab.model = config;

      this.tabs.forEach(tab => tab.active = false);
      this.tabs.push(tab);

      if (onChartReady) {
        onChartReady();
      }

      return;
    }

    // heuristic config for other datasets
    this.configService.getConfig(configRequestParameters, (config) => {
      // tab.model = ddfFolderForm.getQuery();

      config.data.ddfPath = ddfFolderForm.ddfUrl;
      config.data.path = ddfFolderForm.ddfUrl;

      tab.model = config;

      this.tabs.forEach(tab => tab.active = false);
      this.tabs.push(tab);

      if (onChartReady) {
        onChartReady();
      }
    });
  }

  private additionalDataFormComplete(additionalData: Array<IAdditionalDataItem>) {
    if (additionalData) {
      const currentTab = this.tabs.find(tab => tab.active);

      currentTab.additionalData = additionalData;
    }

    this.additionalDataModal.hide();
  }

  private versionsFormComplete(version?: string) {
    if (version) {
      electron.ipcRenderer.send('request-custom-update', version);
      this.versionsModal.hide();
    }
  }

  private chartCreated(data) {
    /* const progress = this.progress;
    const modalInterval: any = setInterval(function () {
      if (data.component._ready) {
        progress.setProgress(100);
        clearInterval(modalInterval);
        setTimeout(() => {
          progress.initProgress();
        }, 3000);
      }
    }, 1000);*/
  }

  private forceResize() {
    setTimeout(function () {
      const event: any = document.createEvent('HTMLEvents');

      event.initEvent('resize', true, true);
      event.eventName = 'resize';
      window.dispatchEvent(event);
    }, 10);
  }

  private chartChanged(data) {
  }

  private doNewDdfFolder() {
    this.newDdfFolderInput.nativeElement.click();
  }

  private onDdfFolderChanged(event: any) {
    if (event.srcElement.files && event.srcElement.files.length > 0) {
      this.ddfFolderForm.ddfUrl = event.srcElement.files[0].path;
      this.newChart(() => {
        this._ngZone.run(() => {
        });
      }, false);
    }
  }

  private doGapminderChart() {
    this.newChart(() => {
      this._ngZone.run(() => {
      });
    });
  }

  private doAddDdfFolder() {
    this.addDdfFolderInput.nativeElement.click();
  }

  private doAddCsvFile() {
    this.addCsvFileInput.nativeElement.click();
  }

  private addData(data) {
    const currentTab = this.tabs.find(tab => tab.active);
    const newAdditionalData = currentTab.additionalData.slice();

    newAdditionalData.push(data);
    currentTab.additionalData = newAdditionalData;
  }

  private onDdfExtFolderChanged(event) {
    if (event.srcElement.files && event.srcElement.files.length > 0) {
      this.addData({reader: 'ddfcsv', path: event.srcElement.files[0].path});
    }
  }

  private onCsvFileChanged(event) {
    if (event.srcElement.files && event.srcElement.files.length > 0) {
      this.addData({reader: 'csv', path: event.srcElement.files[0].path});
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AutoUpdateComponent,
    DdfFolderFormComponent,
    PresetsFormComponent,
    AdditionalDataFormComponent,
    AdditionalDataComponent,
    VersionsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2BootstrapModule,
    ReactiveFormsModule,
    VizabiModule
  ],
  providers: [
    {provide: PresetService, useClass: PresetService},
    {provide: ConfigService, useClass: ConfigService},
    AutoUpdateComponent,
    DdfFolderFormComponent,
    PresetsFormComponent,
    AdditionalDataFormComponent,
    AdditionalDataComponent,
    VersionsFormComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
