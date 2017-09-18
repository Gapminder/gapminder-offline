import { Injectable } from '@angular/core';
import { TabModel } from './tab.model';
import { DdfFolderDescriptor } from '../descriptors/ddf-folder.descriptor';
import { TabDataDescriptor } from '../descriptors/tab-data.descriptor';

const fs = require('fs');

// const PopByAge = ;
const BarRankChart = require('vizabi-barrankchart');
const BubbleChart = require('vizabi-bubblechart');
const BubbleMap = require('vizabi-bubblemap');
const LineChart = require('vizabi-linechart');
const MountainChart = require('vizabi-mountainchart');
const configSg = {
  PopByAge: require('../../../../node_modules/vizabi-config-systema_globalis/dist/PopByAge.json'),
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

  public static getFirst(arr: any[]): any {
    return arr && arr.length > 0 ? arr[0] : null;
  }

  public constructor() {
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
  }

  public setReaderDefaults(tab: TabModel | TabDataDescriptor): void {
    tab.readerModuleObject = ddfCsvReaderLib;
    tab.readerGetMethod = 'getDDFCsvReaderObject';
    tab.readerParams = this.isDevMode ? [new BackendFileReader(), console] : [new BackendFileReader()];
    tab.readerName = 'ddf1-csv-ext';
  }

  public newChart(tab: TabModel, tabDataDescriptor: TabDataDescriptor, onChartReady?: Function, isDefaults: boolean = true): void {
    if (isDefaults) {
      this.ddfFolderDescriptor.defaults();
    }

    tab.readerModuleObject = tabDataDescriptor.readerModuleObject;
    tab.readerGetMethod = tabDataDescriptor.readerGetMethod;
    tab.readerParams = tabDataDescriptor.readerParams;
    tab.readerName = tabDataDescriptor.readerName;
    tab.additionalData = this.ddfFolderDescriptor.additionalData;

    const chartType = tab.chartType;
    const config = !this.ddfFolderDescriptor.ddfUrl || this.ddfFolderDescriptor.ddfUrl.includes('systema_globalis') ? configSg[chartType] : {};

    config.data = {
      reader: 'ddf1-csv-ext',
      ddfPath: this.ddfFolderDescriptor.ddfUrl,
      path: this.ddfFolderDescriptor.ddfUrl,
      assetsPath: './preview-data/'
    };
    config.locale = {
      id: 'en',
      filePath: './preview-data/translation/'
    };

    tab.model = config;
    tab.model.ui.splash = false;

    console.log(tab.model);

    if (this.isDevMode) {
      this.log(JSON.stringify(tab.model));
    }

    if (onChartReady) {
      onChartReady(tab);
    }
  }

  public newSimpleChart(tabsModel: TabModel[], properties: any, onChartReady?: Function): void {
    const newTab = new TabModel(properties.chartType, true);
    const _this = this;

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

      if (_this.isDevMode) {
        _this.log(JSON.stringify(newTab.model));
      }

      tabsModel.forEach((tab: TabModel) => tab.active = false);
      tabsModel.push(newTab);

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
}
