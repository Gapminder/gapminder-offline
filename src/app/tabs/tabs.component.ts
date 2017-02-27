import {NgZone, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ChartService} from './chart.service';
import {TabModel} from './tab.model';
import {TabDataDescriptor} from '../descriptors/tab-data.descriptor';

declare var electron: any;

const ddfCsvReaderLib = require('vizabi-ddfcsv-reader');
const BackendFileReader = ddfCsvReaderLib.BackendFileReader;

@Component({
  selector: 'ae-tabs',
  template: require('./tabs.component.html')
})
export class TabsComponent implements OnInit {
  @Input() tabsModel: TabModel[] = [];
  @Output() onChartCreated: EventEmitter<any> = new EventEmitter();
  @Output() onChartChanged: EventEmitter<any> = new EventEmitter();
  @Output() onChartClicked: EventEmitter<any> = new EventEmitter();

  public tabDataDescriptor: TabDataDescriptor = {};

  constructor(private _ngZone: NgZone, public chartService: ChartService) {
    electron.ipcRenderer.send('get-app-path');
    electron.ipcRenderer.send('get-versions-info');
  }

  ngOnInit() {
    const that = this;

    let processed = false;

    electron.ipcRenderer.on('got-versions-info', (event, versionsDescriptor) => {
      document.title = `Gapminder offline tool v.${versionsDescriptor.app} (dataset v.${versionsDescriptor.dataset})`;
    });

    electron.ipcRenderer.on('got-app-path', (event, path) => {
      this.chartService.ddfFolderDescriptor.electronPath = path;
      this.chartService.ddfFolderDescriptor.defaults();

      if (!processed) {
        this.tabDataDescriptor.readerModuleObject = ddfCsvReaderLib;
        this.tabDataDescriptor.readerGetMethod = 'getDDFCsvReaderObject';
        this.tabDataDescriptor.readerParams = [new BackendFileReader(), console];
        this.tabDataDescriptor.readerName = 'ddf1-csv-ext';
        this.tabDataDescriptor.extResources = {
          host: this.chartService.ddfFolderDescriptor.ddfUrl,
          preloadPath: '/../preview-data/'
        };

        that.chartService.initTab(that.tabsModel);
        that._ngZone.run(() => {
        });

        processed = true;
      }
    });
  }

  public getCurrentTab(): TabModel {
    return this.tabsModel.find(tab => tab.active);
  }

  public removeTab(data: any) {
    this.forceResize();

    setTimeout(() => {
      if (this.tabsModel.length <= 0) {
        this.chartService.initTab(this.tabsModel);
      }
    }, 300);
  }

  public selectChart(chartType, isDefault = true) {
    const tab = this.getCurrentTab();
    tab.chartType = chartType;

    if (isDefault) {
      this.defaultChart();
    }
  }

  public openGapminder() {
    electron.shell.openExternal('http://www.gapminder.org');
  }

  private defaultChart() {
    this.chartService.newChart(this.getCurrentTab(), this.tabDataDescriptor, () => {
      this._ngZone.run(() => {
      });
    });
  }

  private forceResize() {
    setTimeout(function () {
      const event: any = document.createEvent('HTMLEvents');

      event.initEvent('resize', true, true);
      event.eventName = 'resize';
      window.dispatchEvent(event);
    }, 10);
  }

  private chartCreated(data) {
    console.log('chartCreated', data);

    this.getCurrentTab().component = data.model;
    this.getCurrentTab().instance = data.component;
    this.onChartCreated.emit();
  }

  private chartChanged(data) {
    console.log('chartChanged', data);

    const currentTab = this.getCurrentTab();

    currentTab.component = data.component;
    this.onChartChanged.emit();
  }

  private clickHandler() {
    this.onChartClicked.emit();
  }
}
