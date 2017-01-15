import {NgModule, Component, OnInit, NgZone, ViewChild, ElementRef, ViewContainerRef} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ModalDirective} from 'ng2-bootstrap/components/modal/modal.component';
import {AutoUpdateComponent} from './components/auto-update';
import {DdfFolderFormComponent} from './components/ddf-folder-form';
import {PresetService} from './components/preset-service';
import {ConfigService} from './components/config-service';
import {AdditionalDataComponent, IAdditionalDataItem} from './components/additional-data';
import {VersionsFormComponent} from './components/versions-form';
import {CsvConfigFormComponent} from './components/csv-config-form';
import {VizabiModule} from 'ng2-vizabi/ng2-vizabi';
import {configSg} from './components/config-sg';
import {InitMenuComponent} from './template-menu';
import {Menu} from 'electron';

declare var electron: any;

class Tab {
  public active: boolean;
  public title: string;
  public removable: boolean = true;
  public selectedChartType: string = '';
  public model: any;
  public additionalData: Array<IAdditionalDataItem> = [];

  public readerModuleObject: any;
  public readerGetMethod: string;
  public readerParams: Array<any>;
  public readerName: string;
  public extResources: any;
  public ddfChartType: string;
  public component: any;

  private order: number;

  constructor(public chartType: string, order: number, active: boolean = false, title: string = '') {
    this.order = order + 1;
    this.active = active;
    this.ddfChartType = chartType;
    this.title = title ? title : `Chart ${this.order}`;
    this.selectedChartType = '';

    if (order === 0) {
      this.removable = false;
    }
  }

  public getOrder() {
    return this.order;
  }
}

@Component({
  selector: 'ae-app',
  template: `
<div style="height: 100%" (click)="appMainClickHandler($event)">
<div style="position: absolute; top: -4px; left: 10px;">
    <a class="header-title">GAPMINDER TOOLS</a>
</div>

<div style="position: absolute; top: 0; right: 50px; width: 300px;">
  <ae-auto-update></ae-auto-update>
</div>

<div style="position: absolute; top: 0; right: 0;">
    <div class="ddf-menu">
        <div class="btn-group">
            <button type="button"
                    (click)="switchMenu()"
                    class="main-menu-btn"><img src="./public/images/hamburger.png" />
            </button>
            
            <ul role="menu" aria-labelledby="single-button" class="menu show-menu" *ngIf="isMenuOpen">
                <li class="menu-item submenu">
                    <button type="button" class="menu-btn"><span class="menu-text">New chart</span></button>
                    <ul class="menu">
                        <li class="menu-item" (click)="doGapminderChart()">
                            <button type="button" class="menu-btn"><span class="menu-text">Gapminder data</span> </button>
                        </li>
                        <li class="menu-item submenu">
                            <button type="button" class="menu-btn"><span class="menu-text">Your data (bubble chart only)</span> </button>
                            <ul class="menu">
                                <li class="menu-item" (click)="doNewCsvFile()">
                                    <button type="button" class="menu-btn"><span class="menu-text">CSV file...</span> </button>
                                </li>
                                <li class="menu-item" (click)="doNewDdfFolder()">
                                    <button type="button" class="menu-btn"><span class="menu-text">DDF folder</span> </button>
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
                            <button type="button" class="menu-btn"><span class="menu-text">DDF folder</span> </button>
                        </li>
                    </ul>
                </li>
                <li class="menu-separator"></li>
                <li class="menu-item" (click)="doOpen()">
                    <button type="button" class="menu-btn"><span class="menu-text">Open...</span></button>
                </li>
                <li class="menu-item" (click)="doSave()">
                    <button type="button" class="menu-btn"><span class="menu-text">Save...</span></button>
                </li>
                <li class="menu-separator"></li>
                <li class="menu-item" (click)="checkForUpdates()">
                    <button type="button" class="menu-btn"><span class="menu-text">Check for updates...</span></button>
                </li>
                <li class="menu-item" (click)="openDevTools()">
                    <button type="button" class="menu-btn"><span class="menu-text">Open Developer Tools</span> </button>
                </li>
            </ul>
        </div>
    </div>
</div>

<div style="min-width: 800px; height: calc(100% - 52px);">
    <tabset *ngIf="tabs.length > 0"
            style="height: 100%">
        <tab *ngFor="let tab of tabs"
             [heading]="tab.title"
             style="height: 100%"
             [active]="tab.active"
             (select)="tab.active = true; forceResize();"
             (deselect)="tab.active = false"
             [removable]="tab.removable">
            <div *ngIf="!tab.selectedChartType">
              <div class="tab-chart-choice">Choose Chart Type</div>
              <ul class="tab-chart-list">
                <li (click)="selectChart('BubbleChart')"><div><img src="./public/images/tools/bubblechart.png"><span>Bubble Chart</span></div></li>
                <li (click)="selectChart('BubbleMap')"><div><img src="./public/images/tools/bubblemap.png"><span>Bubble Map</span></div></li>
                <li (click)="selectChart('MountainChart')"><div><img src="./public/images/tools/mountainchart.png"><span>Mountain Chart</span></div></li>
              </ul>
            </div>
            <div *ngIf="tab.selectedChartType" style="height: 100%;">
            <vizabi *ngIf="tab.selectedChartType"
                    style="height: 100%;"
                    (onCreated)="chartCreated($event)"
                    (onChanged)="chartChanged($event)"
                    (onClick)="appMainClickHandler($event)"
                    [order]="tab.getOrder()"
                    [readerModuleObject]="tab.readerModuleObject"
                    [readerGetMethod]="tab.readerGetMethod"
                    [readerParams]="tab.readerParams"
                    [readerName]="tab.readerName"
                    [model]="tab.model"
                    [extResources]="tab.extResources"
                    [additionalItems]="tab.additionalData"
                    [chartType]="tab.chartType"></vizabi>
            </div>
        </tab>
    </tabset>
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

<div bsModal
     #csvConfigModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="New bubble chart from your data"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="csvConfigModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">New bubble chart from your data</h4>
            </div>
            <div class="modal-body">
                <ae-csv-config-form (done)="csvConfigFormComplete($event)"></ae-csv-config-form>
            </div>
        </div>
    </div>
</div>

<div bsModal
     *ngIf="getCurrentTab()"
     #additionalCsvConfigModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="Add your data to bubble chart"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="additionalCsvConfigModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Add your data to the chart</h4>
            </div>
            <div class="modal-body">
                <ae-csv-config-form [addDataMode]="true" [parent]="getParent()" (done)="additionalCsvConfigFormComplete($event)"></ae-csv-config-form>
            </div>
        </div>
    </div>
</div>


<input id="newDdfFolder" type="file" style="display: none;" #newDdfFolder (click)="onDdfFolderClick($event, onDdfFolderChanged)"/>
<input id="addDdfFolder" type="file" style="display: none;" #addDdfFolder (click)="onDdfFolderClick($event, onDdfExtFolderChanged)"/>
</div>
`
})
export class AppComponent implements OnInit {
  public tabs: Tab[] = [];
  public isMenuOpen: boolean = false;

  @ViewChild('ddfModal') public ddfModal: ModalDirective;
  @ViewChild('additionalDataModal') public additionalDataModal: ModalDirective;
  @ViewChild('presetsModal') public presetsModal: ModalDirective;
  @ViewChild('versionsModal') public versionsModal: ModalDirective;
  @ViewChild('csvConfigModal') public csvConfigModal: ModalDirective;
  @ViewChild('additionalCsvConfigModal') public additionalCsvConfigModal: ModalDirective;

  @ViewChild('newDdfFolder') newDdfFolderInput: ElementRef;
  @ViewChild('addDdfFolder') addDdfFolderInput: ElementRef;

  private readerModuleObject: any;
  private readerGetMethod: string;
  private readerParams: Array<any>;
  private readerName: string;
  private extResources: any;
  public menuComponent: Menu;

  constructor(private _ngZone: NgZone,
              private viewContainerRef: ViewContainerRef,
              private ddfFolderForm: DdfFolderFormComponent,
              private configService: ConfigService) {

    new InitMenuComponent(this);
    electron.ipcRenderer.send('get-app-path');
  }

  ngOnInit() {
    let processed = false;
    const that = this;

    electron.ipcRenderer.on('got-app-path', (event, path) => {
      this.ddfFolderForm.electronPath = path;

      if (!processed) {
        this.readerModuleObject = this.ddfFolderForm.getDdfCsvReaderObject();
        this.readerGetMethod = 'getDDFCsvReaderObject';
        this.readerParams = [this.ddfFolderForm.fileReader, console];
        this.readerName = 'ddf1-csv-ext';
        this.extResources = {
          host: this.ddfFolderForm.ddfUrl,
          preloadPath: 'preview-data/'
        };

        //this.defaultChart();
        that.initTab();
        that._ngZone.run(() => {
        });

        processed = true;
      }
    });

    electron.ipcRenderer.on('do-open-completed', (event, parameters) => {
      this.doOpenCompleted(event, parameters);
    });
  }

  public getParent(): AppComponent {
    return this;
  }

  public getCurrentTab(): Tab {
    return this.tabs.find(tab => tab.active);
  }

  private appMainClickHandler($event) {
    if (this.isMenuOpen) {
      const elementTarget = $event.target;
      const elementMenu = document.getElementsByClassName('btn-group')[0];
      if (!elementMenu.contains(elementTarget)) {
        this.isMenuOpen = false;
      }
    }
  }

  private switchMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private openDevTools() {
    this.isMenuOpen = false;
    electron.ipcRenderer.send('open-dev-tools');
  }

  public selectChart(chartType) {
    const tab = this.getCurrentTab();
    tab.selectedChartType = chartType;
    tab.chartType = chartType;
    tab.ddfChartType = chartType;
    this.defaultChart();
  }

  public initTab() {
    const tab = new Tab(this.ddfFolderForm.ddfChartType, this.tabs.length, true);
    this.tabs.forEach(tab => tab.active = false);
    this.tabs.push(tab);
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

    const tab = this.getCurrentTab();
    //const tab = new Tab(ddfFolderForm.ddfChartType, this.tabs.length, true);

    tab.readerModuleObject = this.readerModuleObject;
    tab.readerGetMethod = this.readerGetMethod;
    tab.readerParams = this.readerParams;
    tab.readerName = this.readerName;
    tab.extResources = this.extResources;

    const configRequestParameters = {
      ddfPath: ddfFolderForm.ddfUrl,
      chartType: ddfFolderForm.ddfChartType,
      onProgress: (value: number) => {
      }
    };

    tab.additionalData = ddfFolderForm.additionalData;

    // predefined config for SG
    if (!ddfFolderForm.ddfUrl || ddfFolderForm.ddfUrl.indexOf('systema_globalis') > 0) {
      const chartType = tab.selectedChartType;
      const config = configSg[chartType];

      config.data.ddfPath = ddfFolderForm.ddfUrl;
      config.data.path = ddfFolderForm.ddfUrl;

      tab.model = config;

      console.log(JSON.stringify(tab.model));

      //this.tabs.forEach(tab => tab.active = false);
      //this.tabs.push(tab);

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

      console.log(JSON.stringify(tab.model));

      //this.tabs.forEach(tab => tab.active = false);
      //this.tabs.push(tab);

      if (onChartReady) {
        onChartReady();
      }
    });
  }

  private newSimpleChart(properties, onChartReady) {
    const tab = new Tab(this.ddfFolderForm.ddfChartType, this.tabs.length, true);

    tab.selectedChartType = this.ddfFolderForm.ddfChartType;
    tab.model = {
      data: {
        reader: properties.reader,
        delimiter: properties.delimiter,
        path: properties.path
      }
    };

    console.log(JSON.stringify(tab.model));

    this.tabs.forEach(tab => tab.active = false);
    this.tabs.push(tab);

    if (onChartReady) {
      onChartReady();
    }
  }

  private versionsFormComplete(version?: string) {
    if (version) {
      electron.ipcRenderer.send('request-custom-update', version);
      this.versionsModal.hide();
    }
  }

  private chartCreated(data) {
    this.getCurrentTab().component = data.component;
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
    const currentTab = this.getCurrentTab();

    currentTab.component = data.component;
  }

  public doNewDdfFolder() {
    this.isMenuOpen = false;
    this.newDdfFolderInput.nativeElement.click();
  }

  private onDdfFolderChanged(filePaths) {
    if (filePaths && filePaths.length > 0) {
      this.ddfFolderForm.ddfUrl = filePaths[0];
      this.newChart(() => {
        this._ngZone.run(() => {
        });
      }, false);
    }
  }

  public doNewCsvFile() {
    this.csvConfigModal.show();
    this.isMenuOpen = false;
  }

  public doGapminderChart() {
    this.isMenuOpen = false;
    this.initTab();

    this._ngZone.run(() => {
    });
  }

  public doAddDdfFolder() {
    this.isMenuOpen = false;
    this.addDdfFolderInput.nativeElement.click();
  }

  public onDdfFolderClick(event, callback) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.isMenuOpen = false;
    const dialog = electron.remote.dialog;
    const currentWindow = electron.remote.getCurrentWindow();
    dialog.showOpenDialog(currentWindow, {properties: ['openDirectory']}, callback.bind(this));
  }

  public doAddCsvFile() {
    this.additionalCsvConfigModal.show();
    this.isMenuOpen = false;
  }

  private addData(data) {
    const currentTab = this.getCurrentTab();
    const newAdditionalData = currentTab.additionalData.slice();

    console.log('add data', data);

    newAdditionalData.push(data);
    currentTab.additionalData = newAdditionalData;
  }

  private onDdfExtFolderChanged(filePaths) {
    if (filePaths && filePaths.length > 0) {
      this.addData({reader: 'ddf1-csv-ext', path: filePaths[0]});
    }
  }

  private checkForUpdates() {
    this.versionsModal.show();
    this.isMenuOpen = false;
  }

  public doOpen() {
    this.isMenuOpen = false;
    electron.ipcRenderer.send('do-open');
  }

  private doOpenCompleted(event, parameters) {
    const config = parameters.tab;
    const tab = new Tab(config.chartType, this.tabs.length, true, parameters.file);

    delete config.bind;
    delete config.chartType;

    tab.selectedChartType = 'fromFile';
    tab.model = config;

    this.tabs.forEach(tab => tab.active = false);
    this.tabs.push(tab);

    this._ngZone.run(() => {
    });
  };


  public doSave() {
    const currentTab = this.getCurrentTab();
    const model = Object.assign({}, currentTab.component.getModel());

    this.isMenuOpen = false;

    electron.ipcRenderer.send('do-save', {model, chartType: currentTab.chartType});
  }

  private csvConfigFormComplete(event) {
    this.csvConfigModal.hide();

    if (event) {
      this.newSimpleChart(event, () => {
        this._ngZone.run(() => {
        });
      });
    }
  }

  private additionalCsvConfigFormComplete(event) {
    this.additionalCsvConfigModal.hide();

    if (event) {
      this.addData(event);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AutoUpdateComponent,
    DdfFolderFormComponent,
    AdditionalDataComponent,
    VersionsFormComponent,
    CsvConfigFormComponent
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
    AdditionalDataComponent,
    VersionsFormComponent,
    CsvConfigFormComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
