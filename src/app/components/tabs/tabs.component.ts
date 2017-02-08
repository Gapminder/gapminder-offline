import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartService } from './chart.service';
import { TabModel } from './tab.model';
import { TabDataDescriptor } from '../descriptors/tab-data.descriptor';
import { ITabActionsSynchronizer } from '../tabs-new/tabs.common';

declare const electron: any;

@Component({
  selector: 'ae-tabs',
  template: require('./tabs.component.html')
})
export class TabsComponent implements OnInit {
  @Input() public tabsModel: TabModel[] = [];
  @Output() public onTabsInit: EventEmitter<any> = new EventEmitter();
  @Output() public onTabRemoved: EventEmitter<any> = new EventEmitter();
  @Output() public onTabSetActive: EventEmitter<any> = new EventEmitter();
  @Output() public onChartCreated: EventEmitter<any> = new EventEmitter();
  @Output() public onChartChanged: EventEmitter<any> = new EventEmitter();
  @Output() public onChartClicked: EventEmitter<any> = new EventEmitter();

  public tabDataDescriptor: TabDataDescriptor = {};
  private chartService: ChartService;

  public constructor(chartService: ChartService) {
    this.chartService = chartService;

    electron.ipcRenderer.send('get-app-path');
    electron.ipcRenderer.send('get-versions-info');
  }

  public ngOnInit(): void {
    electron.ipcRenderer.send('get-dev-mode');
    electron.ipcRenderer.on('got-versions-info', (event: any, versionsDescriptor: any) => {
      document.title = `Gapminder offline tool v.${versionsDescriptor.app} (dataset v.${versionsDescriptor.dataset})`;
    });

    const gotAppPathStream = Observable
      .fromEvent(electron.ipcRenderer, 'got-app-path', (event: any, path: string) => path);
    const devModeStream = Observable
      .fromEvent(electron.ipcRenderer, 'got-dev-mode', (event: any, isDevMode: boolean) => isDevMode);

    Observable.combineLatest(
      gotAppPathStream,
      devModeStream
    ).take(1).subscribe((result: (string | boolean)[]) => {
      result.forEach((resultRecord: (string | boolean)) => {
        if (typeof resultRecord === 'string') {
          this.chartService.ddfFolderDescriptor.electronPath = resultRecord;
        }

        if (typeof resultRecord === 'boolean') {
          this.chartService.isDevMode = resultRecord;
        }
      });

      this.chartService.ddfFolderDescriptor.defaults();
      this.chartService.setReaderDefaults(this.tabDataDescriptor);
      this.chartService.initTab(this.tabsModel);
      this.onTabsInit.emit(null);
    });
  }

  public getSyncActions(): ITabActionsSynchronizer {
    return {
      onSetTabActive: (index: number) => {
        this.tabsModel.forEach((tab: TabModel) => tab.active = false);
        this.tabsModel[index].active = true;
        this.onTabSetActive.emit(null);
      },
      onTabRemove: (index: number) => {
        this.tabsModel.splice(index, 1);
        this.onTabRemoved.emit(null);
      }
    };
  }

  public getCurrentTab(): TabModel {
    return this.tabsModel.find((tab: TabModel) => tab.active);
  }

  public removeTab(data?: any): void {
    this.forceResize();

    setTimeout(() => {
      if (this.tabsModel.length <= 0) {
        this.chartService.initTab(this.tabsModel);
      }
    }, 300);
  }

  public selectChart(chartType: string, isDefault: boolean = true): void {
    const tab = this.getCurrentTab();
    tab.chartType = chartType;

    if (isDefault) {
      this.defaultChart();
    }
  }

  public openGapminder(): void {
    electron.shell.openExternal('http://www.gapminder.org');
  }

  private defaultChart(): void {
    this.chartService.newChart(this.getCurrentTab(), this.tabDataDescriptor);
  }

  private forceResize(): void {
    setTimeout(() => {
      const event: any = document.createEvent('HTMLEvents');

      event.initEvent('resize', true, true);
      event.eventName = 'resize';
      event.force = true;
      window.dispatchEvent(event);
    }, 10);
  }

  private chartCreated(data: any): void {
    this.chartService.log('chartCreated', data);
    this.getCurrentTab().component = data.model;
    this.getCurrentTab().instance = data.component;
    this.onChartCreated.emit();
  }

  private chartChanged(data: any): void {
    const currentTab = this.getCurrentTab();

    currentTab.component = data.component;

    this.onChartChanged.emit();
    this.chartService.log('chartChanged', data);
  }

  private clickHandler(event: any): void {
    this.chartService.log('chart clickHandler', event);
  }
}
