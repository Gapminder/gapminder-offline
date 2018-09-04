import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChartService } from '../tabs/chart.service';
import { isEmpty } from 'lodash';
import { TabModel } from '../tabs/tab.model';
import { ElectronService } from '../../providers/electron.service';

const vizabiStateFacade: any = {
  getDim: (currentTabInstance: any) => currentTabInstance.model.state.marker._getFirstDimension(),
  getTime: (currentTabInstance: any) => currentTabInstance.model.state.time.dim,
  getCountries: (currentTabInstance: any, dim: any) =>
    currentTabInstance.model.state.marker.getKeys()
      .slice(0, 5)
      .map((marker: any) => marker[dim]).join(', '),
  getTimePoints: (currentTabInstance: any) => {
    const timeModel = currentTabInstance.model.state.time;

    return timeModel.getAllSteps()
      .slice(0, 3)
      .map((step: string) => timeModel.formatDate(step))
      .join(', ');
  }
};

@Component({
  selector: 'app-csv-config-form',
  templateUrl: './csv-config-form.component.html',
  styleUrls: ['./csv-config-form.component.css']
})
export class CsvConfigFormComponent {
  @Input() addDataMode ? = false;
  @Output() done: EventEmitter<any> = new EventEmitter();

  timeFormats: string[] = ['year', 'month', 'day', 'week', 'quarter'];
  timeFormat: string = this.timeFormats[0];
  timeFormatDescription: any = {
    year: {
      example: '2017',
      state: {}
    },
    month: {
      example: '2017-09',
      state: {
        time: {
          unit: 'month'
        }
      }
    },
    day: {
      example: '20170905',
      state: {
        time: {
          unit: 'day'
        }
      }
    },
    week: {
      example: '2017w37',
      state: {
        time: {
          unit: 'week'
        }
      }
    },
    quarter: {
      example: '2017q4',
      state: {
        time: {
          unit: 'quarter'
        }
      }
    }
  };
  isExampleRows = false;
  isExampleColumns = false;
  useYourDataVisible = false;
  delimiter = 'auto';
  chartType = 'BubbleChart';
  choice = '';
  file = '';
  lastModified = '';
  data = {
    result: ''
  };

  private _currentTab: TabModel;

  constructor(private chartService: ChartService, private es: ElectronService) {
  }

  @Input()
  get currentTab(): TabModel {
    return this._currentTab;
  }

  set currentTab(currentTab: TabModel) {
    this._currentTab = currentTab;

    let newTimeFormat = '';

    if (this._currentTab && this._currentTab.model && this._currentTab.model.state && this._currentTab.model.state.time) {
      newTimeFormat = this._currentTab.model.state.time.unit;
    }

    this.timeFormat = newTimeFormat || this.timeFormats[0];
  }

  ok() {
    const config: any = {
      chartType: this.chartType,
      reader: this.choice === 'columns' ? 'csv-time_in_columns' : 'csv',
      path: this.file,
      delimiter: this.delimiter,
      lastModified: this.chartService.getLastModifiedForFile(this.file)
    };

    if (this.delimiter === 'auto') {
      delete config.delimiter;
    }

    if (!isEmpty(this.timeFormatDescription[this.timeFormat].state)) {
      config.state = this.timeFormatDescription[this.timeFormat].state;
    }

    this.done.emit(config);
    // this.reset();
  }

  close() {
    this.done.emit();
  }

  openURL(url: string) {
    this.es.shell.openExternal(url);
  }

  /*
  private reset() {
    this.choice = '';
    this.isExampleRows = false;
    this.isExampleColumns = false;
    this.file = '';
  }
  */

  getCurrentTabInstance(): boolean {
    return this.chartService.currentTab && this.chartService.currentTab.instance ? this.chartService.currentTab.instance : null;
  }

  getDim(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getDim(currentTabInstance);
    }

    return '';
  }

  getTime(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getTime(currentTabInstance);
    }

    return currentTabInstance ? currentTabInstance.model.state.time.dim : null;
  }

  getCountries(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getCountries(currentTabInstance, this.getDim());
    }

    return '';
  }

  getTimePoints(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getTimePoints(currentTabInstance);
    }

    return '';
  }

  switchExampleRows() {
    this.isExampleRows = !this.isExampleRows;
  }

  switchExampleColumns() {
    this.isExampleColumns = !this.isExampleColumns;
  }

  switchUseYourDataVisible() {
    this.useYourDataVisible = !this.useYourDataVisible;
  }

  onCsvFileChanged(fileDescriptor: any) {
    if (fileDescriptor) {
      this.file = fileDescriptor.file;
      this.lastModified = fileDescriptor.lastModified;
    } else {
      this.file = '';
      this.lastModified = null;
    }
  }

  setChoice(choice: string) {
    this.choice = choice;
  }

  setChartType(chartType: string) {
    this.chartType = chartType;
  }
}
