import * as path from 'path';
import * as api from 'ddf-validation';
import * as fs from 'fs';
import { Injectable } from '@angular/core';
import { TabModel } from './tab.model';
import { DdfFolderDescriptor } from '../descriptors/ddf-folder.descriptor';
import { TabDataDescriptor } from '../descriptors/tab-data.descriptor';
import { MessageService } from '../../message.service';
import { ABANDON_VALIDATION, MODEL_CHANGED } from '../../constants';

const BarRankChart = require('vizabi-barrankchart');
const BubbleChart = require('vizabi-bubblechart');
const BubbleMap = require('vizabi-bubblemap');
const LineChart = require('vizabi-linechart');
const MountainChart = require('vizabi-mountainchart');
const configSg = {
  BarRankChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BarRankChart.json'),
  BubbleChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BubbleChart.json'),
  BubbleMap: require('../../../../node_modules/vizabi-config-systema_globalis/dist/BubbleMap.json'),
  LineChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/LineChart.json'),
  MountainChart: require('../../../../node_modules/vizabi-config-systema_globalis/dist/MountainChart.json')
};
const ddfCsvReaderLib = require('vizabi-ddfcsv-reader');
const BackendFileReader = ddfCsvReaderLib.BackendFileReader;

@Injectable()
export class ChartService {
  public isDevMode: boolean = false;
  public ddfFolderDescriptor: DdfFolderDescriptor;
  public currentTab: TabModel;
  public messageService: MessageService;

  public static getFirst(arr: any[]): any {
    return arr && arr.length > 0 ? arr[0] : null;
  }

  public constructor(messageService: MessageService) {
    this.messageService = messageService;
    this.ddfFolderDescriptor = new DdfFolderDescriptor();
  }

  public log(message?: any, ...optionalParams: any[]): void {
    if (this.isDevMode) {
      console.log(message, ...optionalParams);
    }
  }

  public initTab(tabsModel: TabModel[], chartType: string = ''): void {
    const newTab = new TabModel(chartType, true);

    tabsModel.forEach((tab: TabModel) => tab.active = false);
    tabsModel.push(newTab);

    this.messageService.sendMessage(MODEL_CHANGED);
  }

  public setReaderDefaults(tab: TabModel | TabDataDescriptor): void {
    tab.readerModuleObject = ddfCsvReaderLib;
    tab.readerGetMethod = 'getDDFCsvReaderObject';
    tab.readerPlugins = this.isDevMode ? [new BackendFileReader(), console] : [new BackendFileReader()];
    tab.readerName = 'ddf1-csv-ext';
  }

  public newChart(tab: TabModel, tabDataDescriptor: TabDataDescriptor, isDefaults: boolean = true): string {
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
      assetsPath: './preview-data/',
      _lastModified: ddfFolderDescriptor.lastModified
    };

    config.locale = {
      id: 'en',
      filePath: './preview-data/translation/'
    };

    config.ui.splash = false;
    tab.model = config;

    this.messageService.sendMessage(MODEL_CHANGED);

    if (this.isDevMode) {
      this.log(JSON.stringify(tab.model));
    }

    return null;
  }

  public newSimpleChart(tabsModel: TabModel[], properties: any, onChartReady ?: Function): void {
    const newTab = new TabModel(properties.chartType, true);

    fs.stat(properties.path, (err: any, stats: any) => {
      newTab.chartType = properties.chartType;
      newTab.model = {
        data: {
          reader: properties.reader,
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

  public getCurrentTab(tabsModel: TabModel[]): TabModel {
    return tabsModel.find((tab: TabModel) => tab.active);
  }

  public areChartsAvailable(tabsModel: TabModel[]): boolean {
    return tabsModel.filter((tab: TabModel) => tab.chartType).length > 0;
  }

  public getLastModifiedForFile(filePath: string): number | null {
    try {
      const stats = fs.statSync(filePath);

      return stats.mtime.valueOf();
    } catch (err) {
      return null;
    }
  }

  private getDdfFolderDescriptor(ddfUrl: string): { error: string; lastModified: string } {
    let error = null;
    let lastModified = null;

    try {
      const folderStats = fs.statSync(ddfUrl);
      const dataPackageFile = path.resolve(ddfUrl, 'datapackage.json');
      const dataPackageStats = fs.statSync(dataPackageFile);

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
