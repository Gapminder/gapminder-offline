declare const electron: any;

import { AppComponent } from '../../app.component';
import { TabModel } from '../tabs/tab.model';

export const getMenuActions = (context: AppComponent) => ({
  gapminderChart: () => {
    context.isMenuOpened = false;
    context.chartService.initTab(context.tabsModel);
  },
  openDdfFolder: () => {
    context.ddfDatasetConfigModal.show();
    context.isMenuOpened = false;
  },
  openCsvFile: () => {
    context.csvConfigModal.show();
    context.isMenuOpened = false;
  },
  ddfFolderClick: (event: any, onFolderClickProcessed: Function) => {
    const dialog = electron.remote.dialog;
    const currentWindow = electron.remote.getCurrentWindow();

    event.preventDefault();
    event.stopImmediatePropagation();
    context.isMenuOpened = false;
    dialog.showOpenDialog(currentWindow, {properties: ['openDirectory']}, onFolderClickProcessed.bind(context));
  },
  addCsvFile: () => {
    context.additionalCsvConfigModal.show();
    context.isMenuOpened = false;
  },
  addDdfFolder: () => {
    context.isMenuOpened = false;
    context.addDdfFolderInput.nativeElement.click();
  },
  open: () => {
    context.isMenuOpened = false;
    electron.ipcRenderer.send('do-open');
  },
  save: () => {
    const currentTab = context.getCurrentTab();
    const isAdditionalDataPresent = currentTab.component && currentTab.component.getModel;
    const model = Object.assign({}, isAdditionalDataPresent ? currentTab.component.getModel() : currentTab.instance.getModel());

    context.isMenuOpened = false;

    electron.ipcRenderer.send('do-save', {model, chartType: currentTab.chartType, title: currentTab.title});
  },
  saveAllTabs: () => {
    context.isMenuOpened = false;

    const tabsDescriptors = [];

    context.tabsModel.forEach((tab: TabModel) => {
      if (tab.chartType) {
        const isAdditionalDataPresent = tab.component && tab.component.getModel;

        tabsDescriptors.push({
          title: tab.title,
          type: tab.chartType,
          model: Object.assign({}, isAdditionalDataPresent ? tab.component.getModel() : tab.instance.getModel())
        });
      }
    });

    electron.ipcRenderer.send('do-save-all-tabs', tabsDescriptors);
  },
  exportForWeb: () => {
    const currentTab = context.getCurrentTab();
    const isAdditionalDataPresent = currentTab.component && currentTab.component.getModel;
    const model = Object.assign({}, isAdditionalDataPresent ? currentTab.component.getModel() : currentTab.instance.getModel());

    context.isMenuOpened = false;

    electron.ipcRenderer.send('do-export-for-web', {model, chartType: currentTab.chartType});
  },
  exportToSvg: () => {
    context.isMenuOpened = false;

    const ee = document.getElementById('svg-crowbar');

    if (ee) {
      ee.remove();
    }

    const e = document.createElement('script');

    e.setAttribute('src', '../../resources/app/svg-crowbar.js');
    e.setAttribute('id', 'svg-crowbar');
    e.setAttribute('class', 'svg-crowbar');
    e.setAttribute('data-svg-select', 'div>svg.vzb-export');
    e.setAttribute('data-exclude-element-select', '.vzb-noexport');
    document.body.appendChild(e);
  },
  exportToPng: () => {
    context.isMenuOpened = false;

    const ee = document.getElementById('svg-crowbar');

    if (ee) {
      ee.remove();
    }

    const e = document.createElement('script');

    e.setAttribute('src', '../../resources/app/svg-crowbar.js');
    e.setAttribute('id', 'svg-crowbar');
    e.setAttribute('class', 'svg-crowbar');
    e.setAttribute('transform', 'png');
    e.setAttribute('data-svg-select', 'div>svg.vzb-export');
    e.setAttribute('data-exclude-element-select', '.vzb-noexport');
    document.body.appendChild(e);
  },
  checkForUpdates: () => {
    context.versionsModal.show();
    context.isMenuOpened = false;
  },
  openDevTools: () => {
    context.isMenuOpened = false;
    electron.ipcRenderer.send('open-dev-tools');
  }
});
