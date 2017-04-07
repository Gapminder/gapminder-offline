declare const electron: any;

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ChartService } from './components/tabs/chart.service';
import { TabModel } from './components/tabs/tab.model';
import { MessageService } from './message.service';
import { CLEAR_EDITABLE_TABS_ACTION } from './constants';
import { initMenuComponent } from './components/menu/system-menu';
import { Menu } from 'electron';

@Component({
  selector: 'ae-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public tabsModel: TabModel[] = [];
  public isMenuOpened: boolean = false;
  public menuComponent: Menu;
  public menuActions: any = {};

  @ViewChild('ddfModal') public ddfModal: ModalDirective;
  @ViewChild('additionalDataModal') public additionalDataModal: ModalDirective;
  @ViewChild('presetsModal') public presetsModal: ModalDirective;
  @ViewChild('versionsModal') public versionsModal: ModalDirective;
  @ViewChild('ddfDatasetConfigModal') public ddfDatasetConfigModal: ModalDirective;
  @ViewChild('csvConfigModal') public csvConfigModal: ModalDirective;
  @ViewChild('additionalCsvConfigModal') public additionalCsvConfigModal: ModalDirective;
  @ViewChild('addDdfFolder') public addDdfFolderInput: ElementRef;

  private viewContainerRef: ViewContainerRef;
  private chartService: ChartService;
  private messageService: MessageService;
  private ref: ChangeDetectorRef;

  public constructor(viewContainerRef: ViewContainerRef,
                     messageService: MessageService,
                     chartService: ChartService,
                     ref: ChangeDetectorRef) {
    this.viewContainerRef = viewContainerRef;
    this.chartService = chartService;
    this.messageService = messageService;
    this.ref = ref;
    this.menuActions = {
      gapminderChart: () => {
        this.isMenuOpened = false;
        this.chartService.initTab(this.tabsModel);
      },
      openDdfFolder: () => {
        this.ddfDatasetConfigModal.show();
        this.isMenuOpened = false;
      },
      openCsvFile: () => {
        this.csvConfigModal.show();
        this.isMenuOpened = false;
      },
      ddfFolderClick: (event: any, onFolderClickProcessed: Function) => {
        const dialog = electron.remote.dialog;
        const currentWindow = electron.remote.getCurrentWindow();

        event.preventDefault();
        event.stopImmediatePropagation();
        this.isMenuOpened = false;
        dialog.showOpenDialog(currentWindow, {properties: ['openDirectory']}, onFolderClickProcessed.bind(this));
      },
      addCsvFile: () => {
        this.additionalCsvConfigModal.show();
        this.isMenuOpened = false;
      },
      addDdfFolder: () => {
        this.isMenuOpened = false;
        this.addDdfFolderInput.nativeElement.click();
      },
      open: () => {
        this.isMenuOpened = false;
        electron.ipcRenderer.send('do-open');
      },
      save: () => {
        const currentTab = this.getCurrentTab();
        const model = Object.assign({}, currentTab.instance.getModel());

        this.isMenuOpened = false;

        electron.ipcRenderer.send('do-save', {model, chartType: currentTab.chartType, title: currentTab.title});
      },
      exportForWeb: () => {
        const currentTab = this.getCurrentTab();
        const model = Object.assign({}, currentTab.instance.getModel());

        this.isMenuOpened = false;

        electron.ipcRenderer.send('do-export-for-web', {model, chartType: currentTab.chartType});
      },
      checkForUpdates: () => {
        this.versionsModal.show();
        this.isMenuOpened = false;
      },
      openDevTools: () => {
        this.isMenuOpened = false;
        electron.ipcRenderer.send('open-dev-tools');
      }
    };

    initMenuComponent(this);
  }

  public ngOnInit(): void {
    electron.ipcRenderer.on('do-open-completed', (event: any, parameters: any) => {
      this.doOpenCompleted(event, parameters);
    });

    this.setAddDataItemsAvailability(false);
  }

  public onMenuItemSelected(methodName: string): void {
    this.menuActions[methodName]();
  }

  public setAddDataItemsAvailability(value: boolean): void {
    const fileMenu = this.menuComponent.items[0].submenu;
    const menuAddYourData = fileMenu.items[1];
    const csvFileItem = menuAddYourData.submenu.items[0];
    const ddfFolderItem = menuAddYourData.submenu.items[1];
    const openMenu = fileMenu.items[4];
    const saveForWebMenu = fileMenu.items[5];

    csvFileItem.enabled = value;
    ddfFolderItem.enabled = value;
    openMenu.enabled = value;
    saveForWebMenu.enabled = false;

    const currentTab = this.getCurrentTab();

    if (currentTab && currentTab.chartType === 'BubbleChart') {
      saveForWebMenu.enabled = value;
    }
  }

  public getCurrentTab(): TabModel {
    return this.tabsModel.find((tab: TabModel) => tab.active);
  }

  public appMainClickHandler(event: any): void {
    if (this.isMenuOpened) {
      const elementTarget = event.target;
      const elementMenu = document.getElementsByClassName('btn-group')[0];

      if (!elementMenu.contains(elementTarget)) {
        this.isMenuOpened = false;
      }
    }

    this.messageService.sendMessage(CLEAR_EDITABLE_TABS_ACTION, event);
  }

  public switchMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  public versionsFormComplete(version?: string): void {
    if (version) {
      electron.ipcRenderer.send('request-custom-update', version);
      this.versionsModal.hide();
    }
  }

  public onChartCreated(): void {
    this.setAddDataItemsAvailability(true);
  }

  public addData(data: any): void {
    const currentTab = this.getCurrentTab();
    const newAdditionalData = currentTab.additionalData.slice();

    this.chartService.log('add data', data);

    newAdditionalData.push(data);
    currentTab.additionalData = newAdditionalData;

    electron.ipcRenderer.send('modify-chart', `user data was added to ${currentTab.chartType}`);
  }

  public onDdfExtFolderChanged(filePaths: string[]): void {
    const firstFilePath = ChartService.getFirst(filePaths);

    if (firstFilePath) {
      this.addData({reader: 'ddf1-csv-ext', path: firstFilePath});
    }
  }

  public doOpenCompleted(event: any, parameters: any): void {
    const config = parameters.tab;
    const newTab = new TabModel(config.chartType, true, parameters.file);

    delete config.bind;
    delete config.chartType;

    newTab.model = config;

    this.chartService.setReaderDefaults(newTab);
    this.tabsModel.forEach((tab: TabModel) => tab.active = false);
    this.tabsModel.push(newTab);
    this.doDetectChanges();

    electron.ipcRenderer.send('menu', 'new chart was opened');
  };

  public completeDdfDatasetConfigForm(event: any): void {
    this.ddfDatasetConfigModal.hide();

    if (event) {
      const firstFilePath = event.selectedFolder;

      if (firstFilePath) {
        this.chartService.ddfFolderDescriptor.ddfUrl = firstFilePath;
        this.chartService.initTab(this.tabsModel, event.chartType);
        this.chartService.setReaderDefaults(this.chartService.ddfFolderDescriptor);
        this.chartService.newChart(this.getCurrentTab(), this.chartService.ddfFolderDescriptor, null, false);
        electron.ipcRenderer.send('new-chart', this.getCurrentTab().chartType + ' by DDF folder');
        this.doDetectChanges();
      }
    }
  }

  public completeCsvConfigForm(event: any): void {
    this.csvConfigModal.hide();

    if (event) {
      this.chartService.newSimpleChart(this.tabsModel, event);

      electron.ipcRenderer.send('new-chart', 'Simple chart: json based');
    }
  }

  public additionalCsvConfigFormComplete(data: any): void {
    this.additionalCsvConfigModal.hide();

    if (data) {
      this.addData(data);
    }
  }

  public onAdditionalCsvConfigModalShown(): void {
    this.chartService.currentTab = this.getCurrentTab();
  }

  public doDetectChanges(): void {
    this.ref.detectChanges();
  }
}
