import { HomeComponent } from '../home/home.component';
import { TabModel } from '../tabs/tab.model';
import { ElectronService } from '../../providers/electron.service';

export const getMenuActions = (context: HomeComponent, es: ElectronService) => {
  const globConst = es.remote.getGlobal('globConst');

  // document.addEventListener('cross-frontend-event', this.screenShotListener);

  return {
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
      es.ipcRenderer.send(globConst.DO_OPEN);
    },
    save: () => {
      const currentTab = context.getCurrentTab();
      const isAdditionalDataPresent = currentTab.component && currentTab.component.getModel;
      const model = Object.assign({}, isAdditionalDataPresent ? currentTab.component.getModel() : currentTab.instance.getModel());

      context.isMenuOpened = false;

      es.ipcRenderer.send(globConst.DO_SAVE, {model, chartType: currentTab.chartType, title: currentTab.title});
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

      es.ipcRenderer.send(globConst.DO_SAVE_ALL_TABS, tabsDescriptors);
    },
    openValidationWindow: () => {
      context.validationModal.show();

      context.isMenuOpened = false;
    },
    prepareScreenCapture: () => {
      context.recordingPopup.appear();
      context.isCaptureScreenWidgetOpened = true;
      context.isMenuOpened = false;
    },
    exportForWeb: () => {
      const currentTab = context.getCurrentTab();
      const isAdditionalDataPresent = currentTab.component && currentTab.component.getModel;
      const model = Object.assign({}, isAdditionalDataPresent ? currentTab.component.getModel() : currentTab.instance.getModel());

      context.isMenuOpened = false;

      es.ipcRenderer.send(globConst.DO_EXPORT_FOR_WEB, {model, chartType: currentTab.chartType});
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
      context.es.shell.openExternal('https://vizabi.org/gapminder-offline-version-archive.html');
      context.isMenuOpened = false;
    },
    openDevTools: () => {
      context.isMenuOpened = false;
      es.ipcRenderer.send(globConst.OPEN_DEV_TOOLS);
    },
    reload: () => {
      context.isMenuOpened = false;
      es.ipcRenderer.send(globConst.RELOAD_MAIN_WINDOW);
    },
    setLanguage: (langPar) => {
      context.isMenuOpened = false;

      if (!langPar || !langPar.length) {
        return;
      }

      context.ls.currentLanguage = context.ls.getLanguageById(langPar[0]);
      context.translate.setDefaultLang(context.ls.currentLanguage.id);
    }
  };
};
