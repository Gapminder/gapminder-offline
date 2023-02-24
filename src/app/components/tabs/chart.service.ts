import { Injectable } from '@angular/core';
import { TabModel } from './tab.model';
import { DdfFolderDescriptor } from '../descriptors/ddf-folder.descriptor';
import { MessageService } from '../../message.service';
import { MODEL_CHANGED } from '../../constants';
import { ElectronService } from '../../providers/electron.service';

const configDs = require('../../../../datasources.config.json');
const configToolset = require('../../../../toolset.config.json');

const chartConfigs = {
  BarRank: require('../../../../node_modules/@gapminder/tools-page-chart-configs/src/BarRank.js'),
  BubbleChart: require('../../../../node_modules/@gapminder/tools-page-chart-configs/src/BubbleChart.js'),
  BubbleMap: require('../../../../node_modules/@gapminder/tools-page-chart-configs/src/BubbleMap.js'),
  LineChart: require('../../../../node_modules/@gapminder/tools-page-chart-configs/src/LineChart.js'),
  MountainChart: require('../../../../node_modules/@gapminder/tools-page-chart-configs/src/MountainChart.js')
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

  private registeredReaders = ['ext-csv'];

  static getFirst(arr: any[]): any {
    return arr && arr.length > 0 ? arr[0] : null;
  }

  constructor(private messageService: MessageService, private es: ElectronService) {
    this.ddfFolderDescriptor = new DdfFolderDescriptor();
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

  newChart(tab: TabModel, isDefaults: boolean = true): string {
    if (isDefaults) {
      this.ddfFolderDescriptor.defaults();
    }

    tab.additionalData = this.ddfFolderDescriptor.additionalData;

    const deepExtend = this.es.VizabiSharedComponents.LegacyUtils.deepExtend;
    const chartType = tab.chartType;
    const config = isDefaults ? {...chartConfigs[chartType]} : {
      model: {
        markers: {
          [chartMarkerName[chartType]]: {
            data: {},
            encoding: { 
              frame: {}
            }
          }
        }
      },
      ui: deepExtend({}, {...chartConfigs[chartType]}.ui)
    };

    if (!isDefaults) {//|| (isDefaults && !this.registeredReaders.includes("ddf-csv"))) {
      const ddfFolderDescriptor = this.getDdfFolderDescriptor(this.ddfFolderDescriptor.ddfUrl);

      if (ddfFolderDescriptor.error) {
        return ddfFolderDescriptor.error;
      }

      config.model.dataSources = {
        ['ddf-csv_' + this.es.path.basename(this.ddfFolderDescriptor.ddfUrl)]: {
          modelType: 'ddf-csv',
          path: this.ddfFolderDescriptor.ddfUrl,// + this.es.path.sep,
          assetsPath: this.es.path.resolve(DdfFolderDescriptor.electronPath, 'preview-data') + this.es.path.sep,
          _lastModified: ddfFolderDescriptor.lastModified  
        }
      }
    } else {
      const dataSources = configToolset[chartType].dataSources;
      config.model.dataSources = dataSources.reduce((result, ds) => {
        const ddfFolderDescriptor = new DdfFolderDescriptor(configDs[ds].path);
        const {error, lastModified} = this.getDdfFolderDescriptor(ddfFolderDescriptor.ddfUrl);
        if (!error) {
          result[ds] = {
            modelType: 'ddf-csv',
            path: ddfFolderDescriptor.ddfUrl,// + this.es.path.sep,
            assetsPath: this.es.path.resolve(DdfFolderDescriptor.electronPath, 'preview-data') + this.es.path.sep,
            _lastModified: lastModified  
          }
          return result;
        }
      }, {});
    }

    const markers = config.model.markers;
    const markerId = ["bubble", "line", "bar", "mountain", "pyramid", "spreadsheet"].find(id => markers[id]);
    const datasourceIDs = Object.keys(config.model.dataSources || {});
    if (!datasourceIDs.includes(config.model.markers[markerId].data.source))
      config.model.markers[markerId].data.source = datasourceIDs[0] || "ddf--gapminder--systema_globalis";

    config.ui.locale = {
      id: 'en',
      path: this.es.isServe ? "assets/translation/" : this.es.path.resolve(DdfFolderDescriptor.electronPath, 'preview-data', 'translation') + this.es.path.sep
    };

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
      const dsName = `${properties.modelType || "csv"}_${this.es.path.basename(properties.path)}`;
      newTab.chartType = properties.chartType;
      newTab.model = {
        model: {
          dataSources: {
            [dsName]: {
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
            source: dsName
          },
          encoding: { 
            frame: {}
          }
        }
      };

      if (properties.interval) {
        newTab.model.model.markers[chartMarkerName[properties.chartType]].encoding.frame.interval = properties.interval
      }

      if (this.isDevMode) {
        this.log(JSON.stringify(newTab.model));
      }

      newTab.model.ui = deepExtend({}, {...chartConfigs[properties.chartType]}.ui);
      
      newTab.model.ui.locale = {
        id: 'en',
        path: this.es.isServe ? "assets/translation/" : this.es.path.resolve(DdfFolderDescriptor.electronPath, 'preview-data', 'translation') + this.es.path.sep
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
