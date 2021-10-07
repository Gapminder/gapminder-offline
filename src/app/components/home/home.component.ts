import * as waterfall from 'async-waterfall';
import { isEmpty, endsWith } from 'lodash';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewContainerRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap';
import { ChartService } from '../tabs/chart.service';
import { TabModel } from '../tabs/tab.model';
import { MessageService } from '../../message.service';
import {
  CLEAR_EDITABLE_TABS_ACTION,
  OPEN_DDF_FOLDER_ACTION,
  TAB_READY_ACTION,
  SWITCH_MENU_ACTION,
  MODEL_CHANGED,
  CLEAR_VALIDATION_FORM,
  ABANDON_VALIDATION,
  BOOKMARK_TAB,
  SEND_TAB_TO_BOOKMARK,
  ALERT,
  CLEAR_ALERTS,
  BOOKMARKS_PANE_OFF_OUTSIDE, SWITCH_BOOKMARKS_PANE, CLOSE_SCREEN_RECORDER
} from '../../constants';
import { initMenuComponent } from '../menu/system-menu';
import { getMenuActions } from '../menu/menu-actions';
import { ElectronService } from '../../providers/electron.service';
import { TabDataDescriptor } from '../descriptors/tab-data.descriptor';
import { LocalizationService } from '../../providers/localization.service';
import { langConfigTemplate } from '../../../lang-config';
import { ICalculatedDataView } from '../file-select-config-form/calculated-data-view';
import { RecordingPopupComponent } from '../recorder/recording-popup.component';

const vizabiStateFacade: any = {
  getDim: (currentTabInstance: any) => {
    const markerName = currentTabInstance.options.markerName;
    return currentTabInstance.model.markers[markerName].data.space;
  },
  getTime: (currentTabInstance: any) => {
    const markerName = currentTabInstance.options.markerName;
    return currentTabInstance.model.markers[markerName].encoding.frame.data.concept;
  },
  getCountries: (currentTabInstance: any, dim: any) =>
    currentTabInstance.model.state.marker.getKeys()
      .slice(0, 5)
      .map((marker: any) => marker[dim]).join(', '),
  getTimePoints: (currentTabInstance: any) => {
    const timeModel = currentTabInstance.model.state.time;

    return timeModel.getAllSteps()
      .slice(0, 3)
      .map((step: string) => timeModel.formatDate(step))
      .join(', ');
  }
};

function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

interface IAlertActivity {
  label: string;
  event: string;
}

interface ITranslatableAlertData {
  template: string;
  params?;
}

interface IAlert {
  type: string;
  message: string | ITranslatableAlertData;
  activities: IAlertActivity[];
  timeout?: number;
  data?;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tabsModel: TabModel[] = [];
  isMenuOpened = false;
  isCaptureScreenWidgetOpened = false;
  menuComponent;
  menuActions: any = {};
  calculatedDataView: ICalculatedDataView;

  @ViewChild('recordingPopup', {static: true}) recordingPopup: RecordingPopupComponent;
  @ViewChild('ddfModal', {static: true}) ddfModal: ModalDirective;
  @ViewChild('additionalDataModal', {static: true}) additionalDataModal: ModalDirective;
  @ViewChild('presetsModal', {static: true}) presetsModal: ModalDirective;
  @ViewChild('validationModal', {static: true}) validationModal: ModalDirective;
  @ViewChild('ddfDatasetConfigModal', {static: true}) ddfDatasetConfigModal: ModalDirective;
  @ViewChild('csvConfigModal', {static: true}) csvConfigModal: ModalDirective;
  @ViewChild('excelConfigModal', {static: true}) excelConfigModal: ModalDirective;
  @ViewChild('additionalCsvConfigModal', {static: true}) additionalCsvConfigModal: ModalDirective;
  @ViewChild('additionalExcelConfigModal', {static: true}) additionalExcelConfigModal: ModalDirective;
  @ViewChild('addDdfFolder', {static: true}) addDdfFolderInput: ElementRef;
  tabsDisabled = false;
  alerts: IAlert[] = [];
  private globConst;

  constructor(
    public chartService: ChartService,
    public translate: TranslateService,
    public es: ElectronService,
    public ls: LocalizationService,
    private viewContainerRef: ViewContainerRef,
    private messageService: MessageService) {
    this.globConst = this.es.remote.getGlobal('globConst');
    this.menuActions = getMenuActions(this, es);

    document.addEventListener('mousedown', (event: any) => {
      const el = event.srcElement;

      if (!this.messageService.isLocked()) {
        const popover: any = document.querySelector('.popover');

        if (el.className !== 'glyphicon glyphicon-star' && popover.style.display === 'block' && !isDescendant(popover, el)) {
          popover.style.display = 'none';
        }
      }

      if (el && el.tagName === 'A' && el.protocol === 'http:' && el.target === '_blank') {
        event.preventDefault();
        this.es.shell.openExternal(el.href);
      }
    });
  }

  ngOnInit() {
    this.translate.addLangs(langConfigTemplate.map(lang => lang.id));
    initMenuComponent(this, this.es);
    this.dataItemsAvailability();
    this.ls.restoreCurrentLanguage();

    this.translate.onDefaultLangChange.subscribe((langEvent: { lang: string }) => {
      this.ls.settingsOperation(settings => {
        settings.language = langEvent.lang;
        this.es.writeSettings(settings);
      });

      setTimeout(() => {
        initMenuComponent(this, this.es);
        this.doDetectChanges();
      });
    });

    this.messageService.getMessage().subscribe((event: any) => {
      if (event.message === OPEN_DDF_FOLDER_ACTION) {
        this.ddfDatasetConfigModal.hide();

        if (event.options && event.options.selectedFolder && event.options.chartType) {
          const firstFilePath = event.options.selectedFolder;

          if (firstFilePath) {
            const tabDataDescriptor: TabDataDescriptor = {};

            this.chartService.ddfFolderDescriptor.ddfUrl = firstFilePath;
            this.chartService.setReaderDefaults(tabDataDescriptor);

            const newTab = new TabModel(event.options.chartType, false);
            const chartIssue = this.chartService.newChart(newTab, tabDataDescriptor, false);

            this.messageService.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false, dontRestoreTab: true});
            this.messageService.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);

            this.tabsModel.forEach((tab: TabModel) => tab.active = false);

            newTab.active = true;

            this.tabsModel.push(newTab);

            if (chartIssue) {
              this.es.remote.dialog.showErrorBox('Error',
                `Could not open DDF folder ${this.chartService.ddfFolderDescriptor.ddfUrl}, because ${chartIssue}`);
            }

            this.es.ipcRenderer.send(this.globConst.NEW_CHART, this.getCurrentTab().chartType + ' by DDF folder');
            this.doDetectChanges();
          }
        }
      }

      if (event.message === SWITCH_MENU_ACTION) {
        this.switchMenu();
      }

      if (event.message === MODEL_CHANGED) {
        this.dataItemsAvailability();
        this.doDetectChanges();
      }

      if (event.message === BOOKMARK_TAB) {
        const {
          deepExtend
        } = this.es.VizabiSharedComponents.LegacyUtils;

        let model;
        const tab = this.tabsModel[event.options.index];
        // const isAdditionalDataPresent = tab.component && tab.component.getModel;
        // const isModel = tab.instance && tab.instance.getModel();

        // if (!isModel && isAdditionalDataPresent) {
        //   return;
        // }

        // const model = Object.assign({}, isAdditionalDataPresent ? tab.component.getModel() : tab.instance.getModel());
        model = deepExtend({}, tab.component);
        // deepExtend(model.model, tab.model.model, true);
        // deepExtend(model.ui, tab.model.ui, true);
        
        //delete placeholder and translation path
        
        delete model.ui.layout.placeholder;
        delete model.ui.locale.placeholder;
        
        //delete model.ui.locale.path;

        this.messageService.sendMessage(SEND_TAB_TO_BOOKMARK, {chartType: tab.chartType, model, name: event.options.name});
      }

      if (event.message === ALERT) {
        const {message, type, timeout, data, activities} = event.options;
        for (const alert of this.alerts) {
          alert.activities = [];
        }
        this.alerts.unshift({message, type, timeout, data, activities});
      }

      if (event.message === CLEAR_ALERTS) {
        this.alerts = [];
      }

      if (event.message === CLOSE_SCREEN_RECORDER) {
        this.isCaptureScreenWidgetOpened = false;
        this.recordingPopup.disappear();
      }
    });

    this.es.ipcRenderer.on('do-open-completed', (event: any, parameters: any) => {
      this.doOpenCompleted(event, parameters);
    });

    this.es.ipcRenderer.on('do-open-all-completed', (event: any, parameters: any) => {
      this.doOpenAllCompleted(event, parameters);
    });

    this.es.ipcRenderer.on('check-tab-by-default', () => {
      if (this.tabsModel.length <= 0) {
        this.chartService.initTab(this.tabsModel);
        this.doDetectChanges();
      }
    });

    this.es.ipcRenderer.on('do-bookmark-open-completed', (event: any, parameters: any) => {
      this.doOpenCompleted(event, parameters);
    });

    this.es.ipcRenderer.on(this.globConst.BOOKMARKS_REMOVE_RESTORED, (event: any, parameters: any) => {
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    });
  }

  closeScreenRecorder() {
    this.messageService.sendMessage(CLOSE_SCREEN_RECORDER);
  }

  onMenuItemSelected(method: string) {
    if (method.indexOf('@') > 0) {
      const [methodName, paramsStr] = method.split('@');

      try {
        const params = JSON.parse(paramsStr);

        this.menuActions[methodName](params);
      } catch (e) {
        this.menuActions[methodName]();
      }

      return;
    }

    this.menuActions[method]();
  }

  dataItemsAvailability() {
    const currentTab = this.getCurrentTab();
    const isItemEnabled = !!currentTab && !!currentTab.chartType;
    const fileMenu = this.menuComponent.items[0].submenu;
    const menuAddYourData = fileMenu.items[1];
    const csvFileItem = menuAddYourData.submenu.items[0];
    const excelFileItem = menuAddYourData.submenu.items[1];
    const ddfFolderItem = menuAddYourData.submenu.items[2];
    const saveMenu = fileMenu.items[4];
    const saveAllTabs = fileMenu.items[5];
    const exportMenu = fileMenu.items[7];

    csvFileItem.enabled = isItemEnabled;
    excelFileItem.enabled = isItemEnabled;
    ddfFolderItem.enabled = isItemEnabled;
    saveMenu.enabled = isItemEnabled;
    exportMenu.enabled = isItemEnabled;

    saveAllTabs.enabled = this.areChartsAvailable();
  }

  areChartsAvailable(): boolean {
    return this.chartService.areChartsAvailable(this.tabsModel);
  }

  getCurrentTab(): TabModel {
    return this.chartService.getCurrentTab(this.tabsModel);
  }

  appMainClickHandler(event: any) {
    if (this.isMenuOpened) {
      const elementTarget = event.target;
      const elementMenu = document.getElementsByClassName('btn-group')[0];

      if (!elementMenu.contains(elementTarget)) {
        this.isMenuOpened = false;
      }
    }

    this.messageService.sendMessage(CLEAR_EDITABLE_TABS_ACTION, event);
  }

  switchMenu() {
    if (!this.tabsDisabled) {
      this.isMenuOpened = !this.isMenuOpened;
    }
  }

  onValidationModalHide() {
    this.messageService.sendMessage(ABANDON_VALIDATION);
    this.messageService.sendMessage(CLEAR_VALIDATION_FORM);
  }

  validationFormComplete() {
    this.messageService.sendMessage(ABANDON_VALIDATION);
    this.validationModal.hide();
  }

  onChartCreated() {
    this.dataItemsAvailability();
  }

  addData(data: any) {
    const currentTab = this.getCurrentTab();
    const pathDoesNotExist = isEmpty(currentTab.additionalData.filter((item: any) => item.path === data.path));

    let newAdditionalData = [];

    if (pathDoesNotExist) {
      newAdditionalData.push(data);
    } else {
      newAdditionalData = currentTab.additionalData.map((item: any) => item.path === data.path ? data : item);
    }

    currentTab.additionalData = newAdditionalData;

    this.chartService.log('add data', data, currentTab.additionalData);

    this.es.ipcRenderer.send(this.globConst.MODIFY_CHART, `user data was added to ${currentTab.chartType}`);
  }

  onDdfExtFolderChanged({ filePaths }) {
    const firstFilePath = ChartService.getFirst(filePaths);

    if (firstFilePath) {
      this.addData({modelType: 'ddf-csv', path: firstFilePath});
      this.doDetectChanges();
    }
  }

  doOpenCompleted(event: any, parameters: any) {
    this.tabsDisabled = true;

    const subscription: Subscription = this.messageService.getMessage().subscribe((tabEvent: any) => {
      if (tabEvent.message === TAB_READY_ACTION) {
        setTimeout(() => {
          subscription.unsubscribe();

          this.tabsDisabled = false;
          this.doDetectChanges();
        }, 1000);
      }
    });

    const config = parameters.tab;
    const newTab = new TabModel(config.chartType, true, parameters.file);

    delete config.chartType;

    newTab.model = config;

    if (!['excel'].includes((<any>Object.values(config.model.dataSources)[0]).modelType)) {
      this.chartService.setReaderDefaults(newTab);
    } else {
      //this.chartService.registerNewReader('ext-csv');
      this.chartService.registerNewReader('excel');
      newTab.readerName = parameters.tab.data.reader;
    }

    this.registerNewReaders(newTab.model);
    this.tabsModel.forEach((tab: TabModel) => tab.active = false);
    this.tabsModel.push(newTab);
    this.doDetectChanges();

    this.es.ipcRenderer.send('menu', 'new chart was opened');
  }

  doOpenAllCompleted(event: any, tabsDescriptor: any) {
    this.tabsDisabled = true;

    const actions = tabsDescriptor.map((tabDescriptor: any) => (onChartReady: Function) => {
      const subscription: Subscription = this.messageService.getMessage().subscribe((tabEvent: any) => {
        if (tabEvent.message === TAB_READY_ACTION) {
          setTimeout(() => {
            subscription.unsubscribe();
            this.doDetectChanges();

            onChartReady(null);
          }, 1000);
        }
      });

      const newTab = new TabModel(tabDescriptor.type, true, tabDescriptor.title);

      delete tabDescriptor.model.bind;
      delete tabDescriptor.model.type;

      newTab.model = tabDescriptor.model;

      this.chartService.setReaderDefaults(newTab);
      this.registerNewReaders(newTab.model);
      this.tabsModel.forEach((tab: TabModel) => tab.active = false);
      this.tabsModel.push(newTab);

      this.doDetectChanges();
    });

    waterfall(actions, () => {
      this.tabsDisabled = false;

      this.doDetectChanges();

      this.es.ipcRenderer.send('menu', 'charts was opened');
    });
  }

  completeFileConfigForm(event: any) {
    this.csvConfigModal.hide();
    this.excelConfigModal.hide();

    if (event) {
      this.messageService.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false, dontRestoreTab: true});
      this.messageService.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
      this.chartService.newSimpleChart(this.tabsModel, event, () => {
        this.doDetectChanges();
      });

      this.es.ipcRenderer.send(this.globConst.NEW_CHART, 'Simple chart: json based');
    }
  }

  additionalFileConfigFormComplete(data: any) {
    this.additionalCsvConfigModal.hide();
    this.additionalExcelConfigModal.hide();

    if (data) {
      this.addData(data);
    }
  }

  doDetectChanges() {
    this.dataItemsAvailability();
  }

  onTabReady() {
    this.messageService.sendMessage(TAB_READY_ACTION);
  }

  fillCalculatedDataView(firstStep: number, secondStep: number) {
    this.calculatedDataView = {
      firstStep,
      secondStep,
      //countries: this.getCountries(),
      //timePoints: this.getTimePoints(),
      dim: this.getDim(),
      time: this.getTime()
    };
  }

  removeAlert(alert: IAlert) {
    const pos = this.alerts.indexOf(alert);
    if (pos >= 0) {
      this.alerts.splice(pos, 1);
    }
  }

  getPersistentAlerts(): IAlert[] {
    return this.alerts.filter(alert => !alert.timeout);
  }

  getDismissableAlerts(): IAlert[] {
    return this.alerts.filter(alert => alert.timeout > 0);
  }

  shouldAlertBeTranslated(alert: IAlert): boolean {
    return typeof alert.message === 'object' && !!alert.message.template;

  }

  doAlertActivity(alert: IAlert, activity: IAlertActivity) {
    this.es.ipcRenderer.send(activity.event);
    this.removeAlert(alert);
  }

  private getCurrentTabInstance(): boolean {
    return this.chartService.currentTab && this.chartService.currentTab.instance ? this.chartService.currentTab.instance : null;
  }

  private getDim(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      const time = this.getTime();

      return vizabiStateFacade.getDim(currentTabInstance).filter(dim => dim !== time)[0];
    }

    return '';
  }

  private getTime(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getTime(currentTabInstance);
    }

    return null;
  }

  private getCountries(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getCountries(currentTabInstance, this.getDim());
    }

    return '';
  }

  private getTimePoints(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getTimePoints(currentTabInstance);
    }

    return '';
  }

  private registerNewReaders(model) {
    for (const key of Object.keys(model)) {
      if (key.indexOf('data_') === 0 && model[key].reader) {
        this.chartService.registerNewReader(model[key].reader);
      }
    }
  }
}
