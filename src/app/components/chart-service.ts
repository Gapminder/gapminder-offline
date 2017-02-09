import {Injectable} from '@angular/core';
import {configSg} from './config-sg';
import {TabModel} from './tab-model';
import {DdfFolderDescriptor} from './descriptors/ddf-folder-descriptor';
import {TabDataDescriptor} from './descriptors/tab-data-descriptor';

@Injectable()
export class ChartService {
  public ddfFolderDescriptor: DdfFolderDescriptor;

  constructor() {
    this.ddfFolderDescriptor = new DdfFolderDescriptor();
  }

  public initTab(tabsModel: TabModel[], ddfChartType = '') {
    const tab = new TabModel(ddfChartType, tabsModel.length, true);

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
      const chartType = tab.ddfChartType;
      const config = configSg[chartType];

      config.data.ddfPath = this.ddfFolderDescriptor.ddfUrl;
      config.data.path = this.ddfFolderDescriptor.ddfUrl;

      tab.model = config;

      console.log(JSON.stringify(tab.model));

      if (onChartReady) {
        onChartReady(tab);
      }
    }
  }

  public newSimpleChart(tabsModel: TabModel[], properties, onChartReady) {
    const tab = new TabModel(this.ddfFolderDescriptor.ddfChartType, tabsModel.length, true);

    tab.ddfChartType = this.ddfFolderDescriptor.ddfChartType;
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
