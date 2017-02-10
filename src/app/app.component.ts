declare var electron: any;

import {Component, OnInit, NgZone, ViewChild, ElementRef, ViewContainerRef} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {ChartService} from './tabs/chart.service';
import {TabModel} from './tabs/tab.model';
import {initMenuComponent} from './menu/system-menu';
import {Menu} from 'electron';

@Component({
  selector: 'ae-app',
  templateUrl: './app.component.html'
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

  public csvConfigFormComplete(event) {
    this.csvConfigModal.hide();

    if (event) {
      this.chartService.newSimpleChart(this.tabsModel, event, () => {
        this._ngZone.run(() => {
        });
      });
    }
  }

  public additionalCsvConfigFormComplete(event) {
    this.additionalCsvConfigModal.hide();

    if (event) {
      this.addData(event);
    }
  }
}
