import {NgZone, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ChartService} from './chart-service';
import {TabModel} from './tab-model';
import {TabDataDescriptor} from './descriptors/tab-data-descriptor';

declare var electron: any;

const ddfCsvReaderLib = require('vizabi-ddfcsv-reader');
const BackendFileReader = ddfCsvReaderLib.BackendFileReader;

@Component({
  selector: 'ae-tabs',
  template: `
<tabset *ngIf="tabsModel && tabsModel.length > 0" style="height: 100%">
    <tab *ngFor="let tab of tabsModel"
         [heading]="tab.title"
         style="height: 100%"
         [active]="tab.active"
         (select)="tab.active = true; forceResize();"
         (deselect)="tab.active = false"
         [removable]="tab.removable">
        <div *ngIf="!tab.chartType">
          <div class="tab-chart-choice">Choose Chart Type</div>
          <ul class="tab-chart-list">
            <li (click)="selectChart('BubbleChart')"><div><img src="./public/images/tools/bubblechart.png"><span>Bubble Chart</span></div></li>
            <li (click)="selectChart('BubbleMap')"><div><img src="./public/images/tools/bubblemap.png"><span>Bubble Map</span></div></li>
            <li (click)="selectChart('MountainChart')"><div><img src="./public/images/tools/mountainchart.png"><span>Mountain Chart</span></div></li>
          </ul>
        </div>
        <div *ngIf="tab.chartType" style="height: 100%;">
          <vizabi style="height: 100%;"
                  (onCreated)="chartCreated($event)"
                  (onChanged)="chartChanged($event)"
                  (onClick)="clickHandler()"
                  [order]="tab.getOrder()"
                  [readerModuleObject]="tab.readerModuleObject"
                  [readerGetMethod]="tab.readerGetMethod"
                  [readerParams]="tab.readerParams"
                  [readerName]="tab.readerName"
                  [model]="tab.model"
                  [extResources]="tab.extResources"
                  [additionalItems]="tab.additionalData"
                  [chartType]="tab.chartType"></vizabi>
        </div>
    </tab>
</tabset>
`
})
export class TabsComponent implements OnInit {
  @Input() tabsModel: TabModel[] = [];
  @Output() onChartCreated: EventEmitter<any> = new EventEmitter();
  @Output() onChartChanged: EventEmitter<any> = new EventEmitter();
  @Output() onChartClicked: EventEmitter<any> = new EventEmitter();

  public tabDataDescriptor: TabDataDescriptor = {};

  constructor(private _ngZone: NgZone, private chartService: ChartService) {
    electron.ipcRenderer.send('get-app-path');
  }

  ngOnInit() {
    const that = this;

    let processed = false;

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

  public selectChart(chartType, isDefault = true) {
    const tab = this.getCurrentTab();
    tab.chartType = chartType;

    if (isDefault) {
      this.defaultChart();
    }
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
