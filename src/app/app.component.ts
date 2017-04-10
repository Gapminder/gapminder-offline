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
import { getMenuActions } from './components/menu/menu-actions';
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
  public chartService: ChartService;

  private viewContainerRef: ViewContainerRef;
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
    this.menuActions = getMenuActions(this);

    initMenuComponent(this);
  }

  public ngOnInit(): void {
    electron.ipcRenderer.on('do-open-completed', (event: any, parameters: any) => {
      this.doOpenCompleted(event, parameters);
    });

    electron.ipcRenderer.on('do-open-all-completed', (event: any, parameters: any) => {
      this.doOpenAllCompleted(event, parameters);
    });

    this.dataItemsAvailability();
  }

  public onMenuItemSelected(methodName: string): void {
    this.menuActions[methodName]();
  }

  public dataItemsAvailability(): void {
    const currentTab = this.getCurrentTab();
    const isItemEnabled = !!currentTab && !!currentTab.chartType;
    const fileMenu = this.menuComponent.items[0].submenu;
    const menuAddYourData = fileMenu.items[1];
    const csvFileItem = menuAddYourData.submenu.items[0];
    const ddfFolderItem = menuAddYourData.submenu.items[1];
    const saveMenu = fileMenu.items[4];
    const saveAllTabs = fileMenu.items[5];
    const saveForWebMenu = fileMenu.items[6];

    csvFileItem.enabled = isItemEnabled;
    ddfFolderItem.enabled = isItemEnabled;
    saveMenu.enabled = isItemEnabled;
    saveForWebMenu.enabled = false;

    if (currentTab && currentTab.chartType === 'BubbleChart') {
      saveForWebMenu.enabled = isItemEnabled;
    }

    saveAllTabs.enabled = this.areChartsAvailable();
  }

  public areChartsAvailable(): boolean {
    return this.chartService.areChartsAvailable(this.tabsModel);
  }

  public getCurrentTab(): TabModel {
    return this.chartService.getCurrentTab(this.tabsModel);
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
    this.dataItemsAvailability();
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

  public doOpenAllCompleted(event: any, tabsDescriptor: any): void {
    tabsDescriptor.forEach((tabDescriptor: any) => {
      const newTab = new TabModel(tabDescriptor.type, true, tabDescriptor.title);

      delete tabDescriptor.model.bind;
      delete tabDescriptor.model.type;

      newTab.model = tabDescriptor.model;

      this.chartService.setReaderDefaults(newTab);
      this.tabsModel.forEach((tab: TabModel) => tab.active = false);
      this.tabsModel.push(newTab);
    });

    this.doDetectChanges();

    electron.ipcRenderer.send('menu', 'charts was opened');
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
    this.dataItemsAvailability();
    this.ref.detectChanges();
  }
}
