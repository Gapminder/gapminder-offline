import { Injectable } from '@angular/core';
import { TabModel } from './tab.model';
import { DdfFolderDescriptor } from '../descriptors/ddf-folder.descriptor';
import { TabDataDescriptor } from '../descriptors/tab-data.descriptor';

// const PopByAge = ;
const BarRankChart = require('vizabi-barrankchart');
const BubbleChart = require('vizabi-bubblechart');
const BubbleMap = require('vizabi-bubblemap');
const LineChart = require('vizabi-linechart');
const MountainChart = require('vizabi-mountainchart');
const configSg = {
  PopByAge: require('../../../../node_modules/vizabi-config-systema_globalis/PopByAge.json'),
  BarRankChart: require('../../../../node_modules/vizabi-config-systema_globalis/BarRankChart.json'),
  BubbleChart: require('../../../../node_modules/vizabi-config-systema_globalis/BubbleChart.json'),
  BubbleMap: require('../../../../node_modules/vizabi-config-systema_globalis/BubbleMap.json'),
  LineChart: require('../../../../node_modules/vizabi-config-systema_globalis/LineChart.json'),
  MountainChart: require('../../../../node_modules/vizabi-config-systema_globalis/MountainChart.json')
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
    tab.extResources = {
      host: this.ddfFolderDescriptor.ddfUrl,
      preloadPath: '/../preview-data/'
    };
  }

  public newChart(tab: TabModel, tabDataDescriptor: TabDataDescriptor, onChartReady?: Function, isDefaults: boolean = true): void {
    if (isDefaults) {
      this.ddfFolderDescriptor.defaults();
    }

    tab.readerModuleObject = tabDataDescriptor.readerModuleObject;
    tab.readerGetMethod = tabDataDescriptor.readerGetMethod;
    tab.readerParams = tabDataDescriptor.readerParams;
    tab.readerName = tabDataDescriptor.readerName;
    tab.extResources = tabDataDescriptor.extResources;
    tab.additionalData = this.ddfFolderDescriptor.additionalData;

    if (!this.ddfFolderDescriptor.ddfUrl || this.ddfFolderDescriptor.ddfUrl.includes('systema_globalis')) {
      const chartType = tab.chartType;
      const config = configSg[chartType];

      config.data = {
        reader: 'ddf1-csv-ext',
        ddfPath: this.ddfFolderDescriptor.ddfUrl,
        path: this.ddfFolderDescriptor.ddfUrl
      };
      config.locale = {
        id: 'en',
        filePath: './preview-data/translation/'
      };

      tab.model = config;
      tab.model.ui.splash = false;

      if (this.isDevMode) {
        this.log(JSON.stringify(tab.model));
      }

      if (onChartReady) {
        onChartReady(tab);
      }
    }
  }

  public newSimpleChart(tabsModel: TabModel[], properties: any, onChartReady?: Function): void {
    const newTab = new TabModel(this.ddfFolderDescriptor.chartType, true);

    newTab.chartType = this.ddfFolderDescriptor.chartType;
    newTab.model = {
      data: {
        reader: properties.reader,
        delimiter: properties.delimiter,
        path: properties.path
      }
    };

    if (this.isDevMode) {
      this.log(JSON.stringify(newTab.model));
    }

    tabsModel.forEach((tab: TabModel) => tab.active = false);
    tabsModel.push(newTab);

    if (onChartReady) {
      onChartReady();
    }
  }
}
