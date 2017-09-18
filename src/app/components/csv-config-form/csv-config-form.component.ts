import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from '../tabs/chart.service';
import { isEmpty } from 'lodash';

const fs = require('fs');

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
  selector: 'ae-csv-config-form',
  template: require('./csv-config-form.component.html'),
  styles: [require('./csv-config-form.component.css')]
})
export class CsvConfigFormComponent {
  @Input() public addDataMode?: boolean = false;
  @Output() public done: EventEmitter<any> = new EventEmitter();
  @ViewChild('uploadBtn') public uploadBtn: ElementRef;

  public timeFormats: string[] = ['year', 'month', 'day', 'week', 'quarter'];
  public timeFormat: string = this.timeFormats[0];
  public timeFormatDescription: any = {
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

  private chartService: ChartService;
  private chartType: string = 'BubbleChart';
  private choice: string = '';
  private isExampleRows: boolean = false;
  private isExampleColumns: boolean = false;
  private useYourDataVisible: boolean = false;
  private delimiter: string = 'auto';
  private file: string = '';

  public constructor(chartService: ChartService) {
    this.chartService = chartService;
  }

  public ok(): void {
    fs.stat(this.file, (err: any, stats: any) => {

      const config: any = {
        chartType: this.chartType,
        reader: this.choice === 'columns' ? 'csv-time_in_columns' : 'csv',
        path: this.file,
        delimiter: this.delimiter,
        lastModified: stats.mtime.valueOf()
      };

      if (this.delimiter === 'auto') {
        delete config.delimiter;
      }

      if (!isEmpty(this.timeFormatDescription[this.timeFormat].state)) {
        config.state = this.timeFormatDescription[this.timeFormat].state;
      }

      console.log(config);

      this.done.emit(config);
      this.reset();
    });
  }

  public close(): void {
    this.done.emit();
  }

  private reset(): void {
    this.choice = '';
    this.isExampleRows = false;
    this.isExampleColumns = false;
    this.file = '';
    this.uploadBtn.nativeElement.value = '';
  }

  private getCurrentTabInstance(): boolean {
    return this.chartService.currentTab && this.chartService.currentTab.instance ? this.chartService.currentTab.instance : null;
  }

  private getDim(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getDim(currentTabInstance);
    }

    return '';
  }

  private getTime(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getTime(currentTabInstance);
    }

    return currentTabInstance ? currentTabInstance.model.state.time.dim : null;
  }

  private getCountries(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getCountries(currentTabInstance, this.getDim());
    }

    return '';
  }

  private getTimePoints(): string {
    const currentTabInstance: any = this.getCurrentTabInstance();

    if (currentTabInstance) {
      return vizabiStateFacade.getTimePoints(currentTabInstance);
    }

    return '';
  }

  private switchExampleRows(): void {
    this.isExampleRows = !this.isExampleRows;
  }

  private switchExampleColumns(): void {
    this.isExampleColumns = !this.isExampleColumns;
  }

  private switchUseYourDataVisible(): void {
    this.useYourDataVisible = !this.useYourDataVisible;
  }

  private onCsvFileChanged(event: any): void {
    const selectedFile = ChartService.getFirst(event.srcElement.files);

    if (selectedFile) {
      this.file = selectedFile.path;
    }
  }

  private setChoice(choice: string): void {
    this.choice = choice;
  }

  private setChartType(chartType: string): void {
    this.chartType = chartType;
  }
}
