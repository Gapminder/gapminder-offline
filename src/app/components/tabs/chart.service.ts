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
    tab.extResources = {
      host: this.ddfFolderDescriptor.getDefaultUrl(),
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

    // if () {
    const chartType = tab.chartType;
    const config = !this.ddfFolderDescriptor.ddfUrl || this.ddfFolderDescriptor.ddfUrl.includes('systema_globalis') ? configSg[chartType] : {


      "state": {
      "entities": {
        "dim": "geo",
          "show": {
          "is--country": true
        }
      },
      "entities_colorlegend": {
        "dim": "world_4region"
      },
      "entities_tags": {
        "dim": "tag"
      },
      "time": {
        "startOrigin": "1800",
          "endOrigin": "2015",
          "value": "2015",
          "dim": "time"
      },
      "marker": {
        "space": ["entities", "time"],
          "label": {
          "use": "property",
            "which": "name"
        },
        "axis_y": {
          "use": "indicator",
            "which": "life_expectancy_years",
            "zoomedMin": 19,
            "zoomedMax": 86,
            "domainMin": 0,
            "domainMax": 100
        },
        "axis_x": {
          "use": "indicator",
            "scaleType": "log",
            "domainMax": 150000,
            "domainMin": 300,
            "zoomedMax": 150000,
            "zoomedMin": 300,
            "which": "income_per_person_gdppercapita_ppp_inflation_adjusted"
        },
        "size": {
          "use": "indicator",
            "which": "population_total",
            "domainMin": 15,
            "domainMax": 1400000000,
            "scaleType": "linear",
            "allow": {
            "scales": ["linear"]
          }
        },
        "color": {
          "use": "property",
            "which": "world_4region",
            "scaleType": "ordinal",
            "syncModels": ["marker_colorlegend"]
        }
      },
      "marker_colorlegend":{
        "space": ["entities_colorlegend"],
          "opacityRegular": 0.8,
          "opacityHighlightDim": 0.3,
          "label": {
          "use": "property",
            "which": "name"
        },
        "hook_rank": {
          "use": "property",
            "which": "rank"
        },
        "hook_geoshape": {
          "use": "property",
            "which": "shape_lores_svg"
        }
      },
      "marker_tags": {
        "space": ["entities_tags"],
          "label": {
          "use": "property",
            "which": "name"
        },
        "hook_parent": {
          "use": "property",
            "which": "parent"
        }
      }
    },
      "ui": {
      "datawarning": {
        "doubtDomain": [1800, 1950, 2015],
          "doubtRange": [1.0, 0.3, 0.2]
      },
      "splash": true
    }
    };

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

    console.log('!!!!!!!', tab.model);

    if (this.isDevMode) {
      this.log(JSON.stringify(tab.model));
    }

    if (onChartReady) {
      onChartReady(tab);
    }
    // }
  }

  public newSimpleChart(tabsModel: TabModel[], properties: any, onChartReady?: Function): void {
    const newTab = new TabModel(properties.chartType, true);

    newTab.chartType = properties.chartType;
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

  public getCurrentTab(tabsModel: TabModel[]): TabModel {
    return tabsModel.find((tab: TabModel) => tab.active);
  }

  public areChartsAvailable(tabsModel: TabModel[]): boolean {
    return tabsModel.filter((tab: TabModel) => tab.chartType).length > 0;
  }
}
