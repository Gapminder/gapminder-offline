import { Injectable } from '@angular/core';
import { TabModel } from './tab.model';
import { DdfFolderDescriptor } from '../descriptors/ddf-folder.descriptor';
import { TabDataDescriptor } from '../descriptors/tab-data.descriptor';
import { MessageService } from '../../message.service';
import { MODEL_CHANGED } from '../../constants';
import { ElectronService } from '../../providers/electron.service';

const configSg = {
  BarRank: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BarRank.json'),
  BubbleChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BubbleChart.json'),
  BubbleMap: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BubbleMap.json'),
  LineChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/LineChart.json'),
  MountainChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/MountainChart.json')
};

const chartMarkerName = {
  BarRank: "bar",
  BubbleChart: "bubble",
  BubbleMap: "bubble",
  LineChart: "line",
  MountainChart: "mountain"
}

@Injectable()
export class ChartService {
  isDevMode = false;
  ddfFolderDescriptor: DdfFolderDescriptor;
  currentTab: TabModel;

  private readonly readersDefinitions;
  private registeredReaders = ['ext-csv'];

  static getFirst(arr: any[]): any {
    return arr && arr.length > 0 ? arr[0] : null;
  }

  constructor(private messageService: MessageService, private es: ElectronService) {
    this.ddfFolderDescriptor = new DdfFolderDescriptor();
    this.readersDefinitions = {
      'excel': this.es.ExcelReader.excelReaderObject(this.es.Vizabi.csvReader),
      //'ext-csv': this.es.CsvReader.csvReaderObject
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
      this.es.Vizabi.stores.dataSources.createAndAddType(readerName,  this.readersDefinitions[readerName]);
      this.registeredReaders.push(readerName);
    }
  }

  setReaderDefaults(tab: TabModel | TabDataDescriptor) {
    const BackendFileReader = this.es.ddfCsvReader.BackendFileReader;
    tab.readerModuleObject = this.es.ddfCsvReader;
    tab.readerGetMethod = 'getDDFCsvReaderObject';
    tab.readerPlugins = this.isDevMode ? [new BackendFileReader(), console] : [new BackendFileReader()];
    tab.readerName = 'ddf-csv';
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

    const deepExtend = this.es.VizabiSharedComponents.LegacyUtils.deepExtend;
    const chartType = tab.chartType;
    const config = isDefaults ? {...configSg[chartType]} : {
      model: {
        markers: {
          [chartMarkerName[chartType]]: {
            data: {}
          }
        }
      },
      ui: deepExtend({}, {...configSg[chartType]}.ui)
    };
    const ddfFolderDescriptor = this.getDdfFolderDescriptor(this.ddfFolderDescriptor.ddfUrl);

    if (ddfFolderDescriptor.error) {
      return ddfFolderDescriptor.error;
    }

    if (!isDefaults || (isDefaults && !this.registeredReaders.includes("ddf-csv"))) {
      config.model.dataSources = {
        [this.es.path.basename(this.ddfFolderDescriptor.ddfUrl)]: {
          modelType: 'ddf-csv',
          path: this.ddfFolderDescriptor.ddfUrl,// + this.es.path.sep,
          assetsPath: this.es.path.resolve(this.ddfFolderDescriptor.electronPath, 'preview-data') + this.es.path.sep,
          _lastModified: ddfFolderDescriptor.lastModified  
        }
      }
    };

    const markers = config.model.markers;
    const markerId = ["bubble", "line", "bar", "mountain", "pyramid", "spreadsheet"].find(id => markers[id]);
    const datasourceIDs = Object.keys(config.model.dataSources || {});
    if (!datasourceIDs.includes(config.model.markers[markerId].data.source))
      config.model.markers[markerId].data.source = datasourceIDs[0] || "ddf--gapminder--systema_globalis";

    config.ui.locale = {
      id: 'en',
      path: this.es.isServe ? "assets/translation/" : this.es.path.resolve(this.ddfFolderDescriptor.electronPath, 'preview-data', 'translation') + this.es.path.sep
    };

    //TODO: check splash
    //config.ui.splash = false;
    tab.model = config;

    this.messageService.sendMessage(MODEL_CHANGED);

    if (this.isDevMode) {
      this.log(JSON.stringify(tab.model));
    }

    return null;
  }

  newSimpleChart(tabsModel: TabModel[], properties: any, onChartReady ?: Function) {
    const deepExtend = this.es.VizabiSharedComponents.LegacyUtils.deepExtend;
    const newTab = new TabModel(properties.chartType, true);

    this.es.fs.stat(properties.path, (err: any, stats: any) => {
      newTab.chartType = properties.chartType;
      newTab.model = {
        model: {
          dataSources: {
            [properties.reader]: {
              modelType: properties.modelType,
              isTimeInColumns: properties.isTimeInColumns,
              sheet: properties.sheet,
              noCache: true,
              delimiter: properties.delimiter,
              path: properties.path,
              lastModified: stats.mtime.valueOf(),
              hasNameColumn: properties.hasNameColumn,
              nameColumnPosition: properties.nameColumnPosition,
              dtypes: properties.dtypes
            }
          }
        }
      };

      newTab.model.model.markers = {
        [chartMarkerName[properties.chartType]]: {
          data: {
            source: properties.reader
          }
        }
      };

      if (properties.interval) {
        newTab.model.model.markers[chartMarkerName[properties.chartType]].encoding = {
          frame: {
            interval: properties.interval
          }
        }
      }

      if (this.isDevMode) {
        this.log(JSON.stringify(newTab.model));
      }

      newTab.model.ui = deepExtend({}, {...configSg[properties.chartType]}.ui);
      
      newTab.model.ui.locale = {
        id: 'en',
        path: this.es.isServe ? "assets/translation/" : this.es.path.resolve(this.ddfFolderDescriptor.electronPath, 'preview-data', 'translation') + this.es.path.sep
      };
  
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
