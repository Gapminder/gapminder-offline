import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartService } from './chart.service';
import { TabModel } from './tab.model';
import { TabDataDescriptor } from '../descriptors/tab-data.descriptor';
import { ITabActionsSynchronizer } from '../tabs-new/tabs.common';
import {
  TABS_LOGO_ACTION,
  TABS_ADD_TAB_ACTION,
  MODEL_CHANGED,
  OPEN_NEW_DDF_TAB_FROM_VALIDATOR,
  SWITCH_BOOKMARKS_PANE,
  BOOKMARKS_PANE_OFF_OUTSIDE, ALERT
} from '../../constants';
import { MessageService } from '../../message.service';
import { FreshenerService } from '../tab-freshener/freshener.service';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import { ElectronService } from '../../providers/electron.service';
import { LocalizationService } from '../../providers/localization.service';

declare const d3: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {
  @Input() tabsModel: TabModel[] = [];
  @Input() disabled: boolean;
  @Output() onTabsInit: EventEmitter<any> = new EventEmitter();
  @Output() onTabRemoved: EventEmitter<any> = new EventEmitter();
  @Output() onTabReady: EventEmitter<any> = new EventEmitter();
  @Output() onTabSetActive: EventEmitter<any> = new EventEmitter();
  @Output() onChartCreated: EventEmitter<any> = new EventEmitter();
  @Output() onChartChanged: EventEmitter<any> = new EventEmitter();
  @Output() onChartClicked: EventEmitter<any> = new EventEmitter();

  tabDataDescriptor: TabDataDescriptor = {};
  savedActiveTab;
  bookmarksVisible = false;

  private globConst;

  constructor(
    public chartService: ChartService,
    public ls: LocalizationService,
    private messageService: MessageService,
    private freshenerService: FreshenerService,
    private es: ElectronService
  ) {
    this.globConst = this.es.remote.getGlobal('globConst');
  }

  @HostListener('window:focus')
  onFocus() {
    this.freshenerService.checkCurrentTabModification(this.getCurrentTab());
  }

  ngOnInit() {
    this.es.ipcRenderer.send(this.globConst.GET_VERSIONS_INFO);
    this.es.ipcRenderer.send(this.globConst.GET_APP_ARGUMENTS);

    this.chartService.ddfFolderDescriptor.electronPath = this.es.appPath;
    this.chartService.isDevMode = this.es.devMode;

    Observable.fromEvent(this.es.ipcRenderer, this.globConst.GOT_APP_FILE_ARGUMENT,
      (event: any, appArguments: string[]) => appArguments).subscribe((fileDesc: any) => {
      if (!fileDesc || !fileDesc.fileName) {
        this.chartService.ddfFolderDescriptor.defaults();
        this.chartService.setReaderDefaults(this.tabDataDescriptor);
        this.chartService.initTab(this.tabsModel);
        this.onTabsInit.emit();
      }

      if (fileDesc.fileName) {
        this.es.ipcRenderer.send(this.globConst.OPEN_FILE_AFTER_START);
      }
    });

    this.messageService.getMessage().subscribe((event: any) => {
      if (event.message === TABS_LOGO_ACTION) {
        this.openGapminder();
      }

      if (event.message === TABS_ADD_TAB_ACTION) {
        this.newTab();
      }

      if (event.message === OPEN_NEW_DDF_TAB_FROM_VALIDATOR) {
        const tabDataDescriptor: TabDataDescriptor = {};

        this.chartService.setReaderDefaults(tabDataDescriptor);
        this.chartService.ddfFolderDescriptor.ddfUrl = event.options.ddfPath;

        const newTab = new TabModel(event.options.chartType, false);

        this.chartService.newChart(newTab, tabDataDescriptor, false);
        this.tabsModel.forEach((tab: TabModel) => tab.active = false);
        this.setTabToActive(newTab);
        this.tabsModel.push(newTab);
      }

      if (event.message === SWITCH_BOOKMARKS_PANE) {
        if (!this.messageService.isLocked()) {
          this.bookmarksVisible = event.options.isBookmarkPaneVisible;

          if (this.bookmarksVisible) {
            this.savedActiveTab = this.getCurrentTab();
            this.tabsModel.forEach((tab: TabModel) => tab.active = false);
          } else if (this.savedActiveTab && event.options.dontRestoreTab !== undefined) {
            this.selectTab(this.savedActiveTab);
            this.savedActiveTab = null;
          }
        }
      }
    });
  }

  getSyncActions(): ITabActionsSynchronizer {
    return {
      onSetTabActive: (index: number) => {
        this.tabsModel.forEach((tab: TabModel, i: number) => {
          const val = i === index;
          if (val) {
            this.setTabToActive(tab);
          } else {
            tab.active = false;
          }
        });
        this.onTabSetActive.emit();
      },
      onTabRemove: (index: number) => {
        this.tabsModel.splice(index, 1);
        this.sendCurrentPathToFreshener();

        let newIndex = -1;

        if (this.tabsModel.length > 0) {
          newIndex = this.getClosestTabIndex(index);
        }

        if (newIndex >= 0) {
          this.tabsModel.forEach((tab: TabModel, i: number) => {
            const val = i === newIndex;
            if (val) {
              this.setTabToActive(tab);
            } else {
              tab.active = false;
            }

          });
          this.onTabRemoved.emit();
        }

        this.messageService.sendMessage(MODEL_CHANGED);
      },
      onTabChanged: (tabDescriptor: any, index: number) => {
        this.tabsModel[index].title = tabDescriptor.title;
      }
    };
  }

  protected getClosestTabIndex(currentIndex: number): number {
    const isIndexExpected = (index: number) => this.tabsModel[index];

    if (this.tabsModel.length <= 0) {
      return -1;
    }

    if (isIndexExpected(currentIndex)) {
      return currentIndex;
    }

    if (isIndexExpected(currentIndex + 1)) {
      return currentIndex + 1;
    }

    if (isIndexExpected(currentIndex - 1)) {
      return currentIndex - 1;
    }

    return -1;
  }

  getCurrentTab(): TabModel {
    return this.tabsModel.find((tab: TabModel) => tab.active);
  }

  newTab() {
    if (!this.disabled) {
      if (this.bookmarksVisible) {
        this.messageService.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false});
        this.messageService.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
      }
      this.savedActiveTab = null;
      this.chartService.initTab(this.tabsModel);
    }
  }

  selectTab(tab: TabModel) {
    if (!this.disabled) {
      this.setTabToActive(tab);
      this.freshenerService.checkCurrentTabModification(tab);
      this.forceResize();
    }
  }

  setTabToActive(tab: TabModel) {
    tab.active = true;
    if (this.bookmarksVisible) {
      this.messageService.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false});
      this.messageService.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
    }
    this.savedActiveTab = null;
  }

  sendCurrentPathToFreshener() {
    const currentTab = this.getCurrentTab();

    if (currentTab && currentTab.chartType) {
      this.freshenerService.checkCurrentTabModification(currentTab);
    }
  }

  deselectTab(tab: TabModel) {
    if (!this.disabled) {
      tab.active = false;
    }
  }

  removeTab(data?: any) {
    if (!this.disabled) {
      this.forceResize();

      setTimeout(() => {
        if (this.tabsModel.length <= 0) {
          if (this.bookmarksVisible) {
            this.messageService.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false});
            this.messageService.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
          }
          this.savedActiveTab = null;
          this.chartService.initTab(this.tabsModel);
          this.onTabsInit.emit();
        }
      }, 300);
    }
  }

  selectChart(chartType: string, isDefault: boolean = true) {
    const tab = this.getCurrentTab();
    tab.chartType = chartType;

    if (isDefault) {
      this.defaultChart();
    }
  }

  openGapminder() {
    this.es.shell.openExternal('http://www.gapminder.org');
  }

  private defaultChart() {
    this.chartService.newChart(this.getCurrentTab(), this.tabDataDescriptor);
    this.es.ipcRenderer.send(this.globConst.NEW_CHART, this.getCurrentTab().chartType);
  }

  private forceResize() {
    setTimeout(() => {
      const event: any = document.createEvent('HTMLEvents');

      event.initEvent('resize', true, true);
      event.eventName = 'resize';
      event.force = true;
      window.dispatchEvent(event);
    }, 10);
  }

  private chartCreated(data: any, tab: TabModel) {
    this.chartService.log('chartCreated', data);
    tab.component = data.model;
    tab.instance = data.component;
    this.sendCurrentPathToFreshener();
    this.onChartCreated.emit();
  }

  private redefineHrefs() {
    d3.selectAll('.vzb-dialogs-dialog, .vzb-data-warning-box, .vzb-tool-datanotes').selectAll('a').each(function () {
      const view = d3.select(this);
      const href = view.attr('_href') || view.attr('href');

      view
        .attr('_href', href)
        .attr('target', null)
        .attr('href', '#')
        .on('click', () => {
          this.es.shell.openExternal(href);
        });
    });
  }

  private ready(data: any, tab: TabModel) {
    this.onTabReady.emit({data, tab});
  }

  private chartChanged(data: any, tab: TabModel) {
    tab.component = data.component;

    this.onChartChanged.emit();
    this.redefineHrefs();
    this.chartService.log('chartChanged', data);
  }

  private clickHandler(event: any) {
    this.chartService.log('chart clickHandler', event);
  }

  private errorHandler(error: Error) {
    console.log(error);
    // this.messageService.sendMessage(ALERT, {message: error, type: 'danger'});
  }
}
