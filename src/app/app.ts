declare var electron: any;

import {NgModule, Component, OnInit, NgZone, ViewChild, ElementRef, ViewContainerRef} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2BootstrapModule, TabsModule, ProgressbarModule} from 'ng2-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ModalDirective, ModalModule} from 'ng2-bootstrap';
import {HamburgerMenuComponent} from './components/hamburger-menu';
import {AutoUpdateComponent} from './components/auto-update';
import {ChartService} from './components/chart-service';
import {AdditionalDataComponent} from './components/additional-data';
import {VersionsFormComponent} from './components/versions-form';
import {CsvConfigFormComponent} from './components/csv-config-form';
import {TabModel} from './components/tab-model';
import {VizabiModule} from 'ng2-vizabi';
import {TabsComponent} from './components/tabs-component';
import {initMenuComponent} from './template-menu';
import {Menu} from 'electron';

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
            
            <ae-hamburger-menu [isMenuOpen]="isMenuOpen" [currentTab]="getCurrentTab()" (onMenuItemSelected)="onMenuItemSelected($event)"></ae-hamburger-menu>
        </div>
    </div>
</div>

<div style="min-width: 800px; height: calc(100% - 52px);">
    <ae-tabs [tabsModel]="tabsModel" (onChartCreated)="onChartCreated()" (onChartClicked)="appMainClickHandler($event)"></ae-tabs>
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
                <ae-csv-config-form [addDataMode]="true" [currentTab]="getCurrentTab()" (done)="additionalCsvConfigFormComplete($event)"></ae-csv-config-form>
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
  public tabsModel: TabModel[] = [];
  public isMenuOpen: boolean = false;
  public menuComponent: Menu;
  public menuActions: any = {};

  @ViewChild('ddfModal') public ddfModal: ModalDirective;
  @ViewChild('additionalDataModal') public additionalDataModal: ModalDirective;
  @ViewChild('presetsModal') public presetsModal: ModalDirective;
  @ViewChild('versionsModal') public versionsModal: ModalDirective;
  @ViewChild('csvConfigModal') public csvConfigModal: ModalDirective;
  @ViewChild('additionalCsvConfigModal') public additionalCsvConfigModal: ModalDirective;
  @ViewChild('newDdfFolder') newDdfFolderInput: ElementRef;
  @ViewChild('addDdfFolder') addDdfFolderInput: ElementRef;

  constructor(private _ngZone: NgZone,
              private viewContainerRef: ViewContainerRef,
              private chartService: ChartService) {
    this.menuActions = {
      gapminderChart: () => {
        this.isMenuOpen = false;
        this.chartService.initTab(this.tabsModel);

        this._ngZone.run(() => {
        });
      },
      openDdfFolder: () => {
        this.isMenuOpen = false;
        this.newDdfFolderInput.nativeElement.click();
      },
      openCsvFile: () => {
        this.csvConfigModal.show();
        this.isMenuOpen = false;
      },
      ddfFolderClick: (event, onFolderClickProcessed) => {
        const dialog = electron.remote.dialog;
        const currentWindow = electron.remote.getCurrentWindow();

        event.preventDefault();
        event.stopImmediatePropagation();
        this.isMenuOpen = false;
        dialog.showOpenDialog(currentWindow, {properties: ['openDirectory']}, onFolderClickProcessed.bind(this));
      },
      addCsvFile: () => {
        this.additionalCsvConfigModal.show();
        this.isMenuOpen = false;
      },
      addDdfFolder: () => {
        this.isMenuOpen = false;
        this.addDdfFolderInput.nativeElement.click();
      },
      open: () => {
        this.isMenuOpen = false;
        electron.ipcRenderer.send('do-open');
      },
      save: () => {
        const currentTab = this.getCurrentTab();
        const model = Object.assign({}, currentTab.component && currentTab.component.getModel ? currentTab.component.getModel() : currentTab.instance.getModel());

        this.isMenuOpen = false;

        electron.ipcRenderer.send('do-save', {model, chartType: currentTab.chartType});
      },
      exportForWeb: () => {
        const currentTab = this.getCurrentTab();
        const model = Object.assign({}, currentTab.component && currentTab.component.getModel ? currentTab.component.getModel() : currentTab.instance.getModel());

        this.isMenuOpen = false;

        electron.ipcRenderer.send('do-export-for-web', {model, chartType: currentTab.chartType});
      },
      checkForUpdates: () => {
        this.versionsModal.show();
        this.isMenuOpen = false;
      },
      openDevTools: () => {
        this.isMenuOpen = false;
        electron.ipcRenderer.send('open-dev-tools');
      }
    };

    initMenuComponent(this);
    electron.ipcRenderer.send('get-app-path');
  }

  ngOnInit() {
    electron.ipcRenderer.on('do-open-completed', (event, parameters) => {
      this.doOpenCompleted(event, parameters);
    });

    this.setAddDataItemsAvailability(false);
  }

  public onMenuItemSelected(methodName: string) {
    this.menuActions[methodName]();
  }

  public setAddDataItemsAvailability(value: boolean) {
    this.menuComponent.items[0].submenu.items[1].submenu.items[0].enabled = value;
    this.menuComponent.items[0].submenu.items[1].submenu.items[1].enabled = value;
    this.menuComponent.items[0].submenu.items[4].enabled = value;
    this.menuComponent.items[0].submenu.items[5].enabled = false;

    const currentTab = this.getCurrentTab();

    if (currentTab && currentTab.chartType === 'BubbleChart') {
      this.menuComponent.items[0].submenu.items[5].enabled = value;
    }
  }

  public getCurrentTab(): TabModel {
    return this.tabsModel.find(tab => tab.active);
  }

  public appMainClickHandler($event) {
    if (this.isMenuOpen) {
      const elementTarget = $event.target;
      const elementMenu = document.getElementsByClassName('btn-group')[0];

      if (!elementMenu.contains(elementTarget)) {
        this.isMenuOpen = false;
      }
    }
  }

  public switchMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public versionsFormComplete(version?: string) {
    if (version) {
      electron.ipcRenderer.send('request-custom-update', version);
      this.versionsModal.hide();
    }
  }

  private onChartCreated() {
    this.setAddDataItemsAvailability(true);
  }

  public onDdfFolderChanged(filePaths) {
    if (filePaths && filePaths.length > 0) {
      this.chartService.ddfFolderDescriptor.ddfUrl = filePaths[0];
      this.chartService.initTab(this.tabsModel, 'BubbleChart');
      this.chartService.newChart(this.getCurrentTab(), this.chartService.ddfFolderDescriptor, () => {
        this._ngZone.run(() => {
        });
      }, false);
    }
  }

  public addData(data) {
    const currentTab = this.getCurrentTab();
    const newAdditionalData = currentTab.additionalData.slice();

    console.log('add data', data);

    newAdditionalData.push(data);
    currentTab.additionalData = newAdditionalData;
  }

  public onDdfExtFolderChanged(filePaths) {
    if (filePaths && filePaths.length > 0) {
      this.addData({reader: 'ddf1-csv-ext', path: filePaths[0]});
    }
  }

  public doOpenCompleted(event, parameters) {
    const config = parameters.tab;
    const tab = new TabModel(config.chartType, this.tabsModel.length, true, parameters.file);

    delete config.bind;
    delete config.chartType;

    tab.model = config;

    this.tabsModel.forEach(tab => tab.active = false);
    this.tabsModel.push(tab);

    this._ngZone.run(() => {
    });
  };

  private csvConfigFormComplete(event) {
    this.csvConfigModal.hide();

    if (event) {
      this.chartService.newSimpleChart(this.tabsModel, event, () => {
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
    HamburgerMenuComponent,
    AdditionalDataComponent,
    VersionsFormComponent,
    CsvConfigFormComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    Ng2BootstrapModule,
    ReactiveFormsModule,
    VizabiModule
  ],
  providers: [
    {provide: ChartService, useClass: ChartService},
    AutoUpdateComponent,
    HamburgerMenuComponent,
    AdditionalDataComponent,
    VersionsFormComponent,
    CsvConfigFormComponent,
    TabsComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
