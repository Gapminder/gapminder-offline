import { Injectable } from '@angular/core';
import { TabModel } from './tab.model';
import { DdfFolderDescriptor } from '../descriptors/ddf-folder.descriptor';
import { TabDataDescriptor } from '../descriptors/tab-data.descriptor';
import { MessageService } from '../../message.service';
import { MODEL_CHANGED } from '../../constants';
import { ElectronService } from '../../providers/electron.service';

const configSg = {
  BarRankChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BarRankChart.json'),
  BubbleChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BubbleChart.json'),
  BubbleMap: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BubbleMap.json'),
  LineChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/LineChart.json'),
  MountainChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/MountainChart.json')
};

@Injectable()
export class ChartService {
  isDevMode = false;
  ddfFolderDescriptor: DdfFolderDescriptor;
  currentTab: TabModel;

  private readonly readersDefinitions;
  private registeredReaders = ['csv', 'csv-time_in_columns'];

  static getFirst(arr: any[]): any {
    return arr && arr.length > 0 ? arr[0] : null;
  }

  constructor(private messageService: MessageService, private es: ElectronService) {
    this.ddfFolderDescriptor = new DdfFolderDescriptor();
    this.readersDefinitions = {
      'excel': this.es.ExcelReader.excelReaderObject,
      'ext-csv': this.es.CsvReader.csvReaderObject
    };
  }

  log(message?: any, ...optionalParams: any[]) {
    if (this.isDevMode) {
      console.log(message, ...optionalParams);
    }
  }

  initTab(tabsModel: TabModel[], chartType: string = '') {
    const newTab = new TabModel(chartType, true);

    tabsModel.forEach((tab: TabModel) => tab.active = false);
    tabsModel.push(newTab);

    this.messageService.sendMessage(MODEL_CHANGED);
  }

  registerNewReader(readerName: string) {
    if (this.registeredReaders.indexOf(readerName) < 0 && this.readersDefinitions[readerName]) {
      this.es.vizabi.Reader.extend(readerName, this.readersDefinitions[readerName]);
      this.registeredReaders.push(readerName);
    }
  }

  setReaderDefaults(tab: TabModel | TabDataDescriptor) {
    const BackendFileReader = this.es.ddfCsvReader.BackendFileReader;
    tab.readerModuleObject = this.es.ddfCsvReader;
    tab.readerGetMethod = 'getDDFCsvReaderObject';
    tab.readerPlugins = this.isDevMode ? [new BackendFileReader(), console] : [new BackendFileReader()];
    tab.readerName = 'ddf1-csv-ext';
  }

  newChart(tab: TabModel, tabDataDescriptor: TabDataDescriptor, isDefaults: boolean = true): string {
    if (isDefaults) {
      this.ddfFolderDescriptor.defaults();
    }

    tab.readerModuleObject = tabDataDescriptor.readerModuleObject;
    tab.readerGetMethod = tabDataDescriptor.readerGetMethod;
    tab.readerPlugins = tabDataDescriptor.readerPlugins;
    tab.readerName = tabDataDescriptor.readerName;
    tab.additionalData = this.ddfFolderDescriptor.additionalData;

    const chartType = tab.chartType;
    const config = isDefaults ? {...configSg[chartType]} : {ui: {}};
    const ddfFolderDescriptor = this.getDdfFolderDescriptor(this.ddfFolderDescriptor.ddfUrl);

    if (ddfFolderDescriptor.error) {
      return ddfFolderDescriptor.error;
    }

    config.data = {
      reader: 'ddf1-csv-ext',
      ddfPath: this.ddfFolderDescriptor.ddfUrl,
      path: this.ddfFolderDescriptor.ddfUrl,
      assetsPath: `${this.ddfFolderDescriptor.electronPath}/preview-data/`,
      _lastModified: ddfFolderDescriptor.lastModified
    };

    config.locale = {
      id: 'en',
      filePath: `${this.ddfFolderDescriptor.electronPath}/preview-data/translation/`
    };

    config.ui.splash = false;
    tab.model = config;

    this.messageService.sendMessage(MODEL_CHANGED);

    if (this.isDevMode) {
      this.log(JSON.stringify(tab.model));
    }

    return null;
  }

  newSimpleChart(tabsModel: TabModel[], properties: any, onChartReady ?: Function) {
    const newTab = new TabModel(properties.chartType, true);

    this.es.fs.stat(properties.path, (err: any, stats: any) => {
      newTab.chartType = properties.chartType;
      newTab.model = {
        data: {
          reader: properties.reader,
          timeInColumns: properties.timeInColumns,
          sheet: properties.sheet,
          noCache: true,
          delimiter: properties.delimiter,
          path: properties.path,
          lastModified: stats.mtime.valueOf()
        }
      };

      if (properties.state) {
        newTab.model.state = properties.state;
      }

      if (this.isDevMode) {
        this.log(JSON.stringify(newTab.model));
      }

      tabsModel.forEach((tab: TabModel) => tab.active = false);
      tabsModel.push(newTab);

      this.messageService.sendMessage(MODEL_CHANGED);

      if (onChartReady) {
        onChartReady();
      }

    });
  }

  getCurrentTab(tabsModel: TabModel[]): TabModel {
    return tabsModel.find((tab: TabModel) => tab.active);
  }

  areChartsAvailable(tabsModel: TabModel[]): boolean {
    return tabsModel.filter((tab: TabModel) => tab.chartType).length > 0;
  }

  getLastModifiedForFile(filePath: string): number | null {
    try {
      const stats = this.es.fs.statSync(filePath);

      return stats.mtime.valueOf();
    } catch (err) {
      return null;
    }
  }

  private getDdfFolderDescriptor(ddfUrl: string): { error: string; lastModified: string } {
    let error = null;
    let lastModified = null;

    try {
      const folderStats = this.es.fs.statSync(ddfUrl);
      const dataPackageFile = this.es.path.resolve(ddfUrl, 'datapackage.json');
      const dataPackageStats = this.es.fs.statSync(dataPackageFile);

      lastModified = folderStats.isDirectory() && dataPackageStats.isFile() ? folderStats.mtime.toISOString() : null;
    } catch (_error) {
      error = _error.message;
    }

    if (!error && !lastModified) {
      error = 'wrong path type';
    }

    return {error, lastModified};
  }
}
