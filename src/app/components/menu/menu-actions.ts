import { HomeComponent } from '../home/home.component';
import { TabModel } from '../tabs/tab.model';
import { ElectronService } from '../../providers/electron.service';

export const getMenuActions = (context: HomeComponent, es: ElectronService) => ({
  gapminderChart: () => {
    context.isMenuOpened = false;
    context.chartService.initTab(context.tabsModel);
  },
  openDdfFolder: () => {
    context.ddfDatasetConfigModal.show();
    context.isMenuOpened = false;
  },
  openCsvFile: () => {
    context.fillCalculatedDataView(2, 3);
    context.csvConfigModal.show();
    context.isMenuOpened = false;
    context.doDetectChanges();
  },
  openExcelFile: () => {
    context.fillCalculatedDataView(2, 3);
    context.excelConfigModal.show();
    context.isMenuOpened = false;
    context.doDetectChanges();
  },
  ddfFolderClick: (event: any, onFolderClickProcessed: Function) => {
    const dialog = es.remote.dialog;
    const currentWindow = es.remote.getCurrentWindow();

    event.preventDefault();
    event.stopImmediatePropagation();
    context.isMenuOpened = false;
    dialog.showOpenDialog(currentWindow, {properties: ['openDirectory']}, onFolderClickProcessed.bind(context));
  },
  addCsvFile: () => {
    context.chartService.currentTab = context.getCurrentTab();
    context.fillCalculatedDataView(1, 2);
    context.additionalCsvConfigModal.show();
    context.isMenuOpened = false;
    context.doDetectChanges();
  },
  addExcelFile: () => {
    context.chartService.currentTab = context.getCurrentTab();
    context.fillCalculatedDataView(1, 2);
    context.additionalExcelConfigModal.show();
    context.isMenuOpened = false;
    context.doDetectChanges();
  },
  addDdfFolder: () => {
    context.isMenuOpened = false;
    context.addDdfFolderInput.nativeElement.click();
  },
  open: () => {
    context.isMenuOpened = false;
    es.ipcRenderer.send('do-open');
  },
  save: () => {
    const currentTab = context.getCurrentTab();
    const isAdditionalDataPresent = currentTab.component && currentTab.component.getModel;
    const model = Object.assign({}, isAdditionalDataPresent ? currentTab.component.getModel() : currentTab.instance.getModel());

    context.isMenuOpened = false;

    es.ipcRenderer.send('do-save', {model, chartType: currentTab.chartType, title: currentTab.title});
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

    es.ipcRenderer.send('do-save-all-tabs', tabsDescriptors);
  },
  openValidationWindow: () => {
    context.validationModal.show();

    context.isMenuOpened = false;
  },
  exportForWeb: () => {
    const currentTab = context.getCurrentTab();
    const isAdditionalDataPresent = currentTab.component && currentTab.component.getModel;
    const model = Object.assign({}, isAdditionalDataPresent ? currentTab.component.getModel() : currentTab.instance.getModel());

    context.isMenuOpened = false;

    es.ipcRenderer.send('do-export-for-web', {model, chartType: currentTab.chartType});
  },
  exportToSvg: () => {
    context.isMenuOpened = false;

    const ee = document.getElementById('svg-crowbar');

    if (ee) {
      ee.remove();
    }

    const e = document.createElement('script');

    e.setAttribute('src', './lib/svg-crowbar.js');
    e.setAttribute('id', 'svg-crowbar');
    e.setAttribute('class', 'svg-crowbar');
    e.setAttribute('data-svg-select', 'div[class="tab-pane"][style*="display: block"] div>svg.vzb-export');
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

    e.setAttribute('src', './lib/svg-crowbar.js');
    e.setAttribute('id', 'svg-crowbar');
    e.setAttribute('class', 'svg-crowbar');
    e.setAttribute('transform', 'png');
    e.setAttribute('data-svg-select', 'div[class="tab-pane"][style*="display: block"] div>svg.vzb-export');
    e.setAttribute('data-exclude-element-select', '.vzb-noexport');
    document.body.appendChild(e);
  },
  checkForUpdates: () => {
    context.versionsModal.show();
    context.isMenuOpened = false;
  },
  openDevTools: () => {
    context.isMenuOpened = false;
    es.ipcRenderer.send('open-dev-tools');
  },
  reload: () => {
    context.isMenuOpened = false;
    es.ipcRenderer.send('reload-main-window');
  },
  setLanguage: (langPar) => {
    context.isMenuOpened = false;

    if (!langPar || !langPar.length) {
      return;
    }

    context.ls.currentLanguage = context.ls.getLanguageById(langPar[0]);
    context.translate.setDefaultLang(context.ls.currentLanguage.id);
  },
  addToBookmarks: () => {
    context.bookmarkModal.show();
    context.isMenuOpened = false;
  },
  openManageBookmarks: () => {
    context.manageBookmarksModal.show();
    context.isMenuOpened = false;
  },
  openBookmark: (bookmark) => {
    context.isMenuOpened = false;
    es.ipcRenderer.send('open-bookmark', bookmark);
  }
});
