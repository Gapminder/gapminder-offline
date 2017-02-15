import {Injectable} from '@angular/core';
import {TabModel} from './tab.model';
import {DdfFolderDescriptor} from '../descriptors/ddf-folder.descriptor';
import {TabDataDescriptor} from '../descriptors/tab-data.descriptor';

const AgePyramid = require('../vizabi-config/AgePyramid.json');
const BarRankChart = require('../vizabi-config/BarRankChart.json');
const BubbleChart = require('../vizabi-config/BubbleChart.json');
const BubbleMap = require('../vizabi-config/BubbleMap.json');
const LineChart = require('../vizabi-config/LineChart.json');
const MountainChart = require('../vizabi-config/MountainChart.json');
const configSg = {AgePyramid, BarRankChart, BubbleChart, BubbleMap, LineChart, MountainChart};

@Injectable()
export class ChartService {
  public ddfFolderDescriptor: DdfFolderDescriptor;

  constructor() {
    this.ddfFolderDescriptor = new DdfFolderDescriptor();
  }

  public initTab(tabsModel: TabModel[], chartType = '') {
    const tab = new TabModel(chartType, true);

    tabsModel.forEach(tab => tab.active = false);
    tabsModel.push(tab);
  }

  public newChart(tab: TabModel, tabDataDescriptor: TabDataDescriptor, onChartReady, isDefaults = true) {
    if (isDefaults) {
      this.ddfFolderDescriptor.defaults();
    }

    tab.readerModuleObject = tabDataDescriptor.readerModuleObject;
    tab.readerGetMethod = tabDataDescriptor.readerGetMethod;
    tab.readerParams = tabDataDescriptor.readerParams;
    tab.readerName = tabDataDescriptor.readerName;
    tab.extResources = tabDataDescriptor.extResources;

    tab.additionalData = this.ddfFolderDescriptor.additionalData;

    if (!this.ddfFolderDescriptor.ddfUrl || this.ddfFolderDescriptor.ddfUrl.indexOf('systema_globalis') > 0) {
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

      console.log(JSON.stringify(tab.model));

      if (onChartReady) {
        onChartReady(tab);
      }
    }
  }

  public newSimpleChart(tabsModel: TabModel[], properties, onChartReady) {
    const tab = new TabModel(this.ddfFolderDescriptor.chartType, true);

    tab.chartType = this.ddfFolderDescriptor.chartType;
    tab.model = {
      data: {
        reader: properties.reader,
        delimiter: properties.delimiter,
        path: properties.path
      }
    };

    console.log(JSON.stringify(tab.model));

    tabsModel.forEach(tab => tab.active = false);
    tabsModel.push(tab);

    if (onChartReady) {
      onChartReady();
    }
  }
}
