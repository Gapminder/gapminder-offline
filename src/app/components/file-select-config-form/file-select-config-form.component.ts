import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ChartService } from '../tabs/chart.service';
import { isEmpty } from 'lodash';
import { TabModel } from '../tabs/tab.model';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { ICalculatedDataView } from './calculated-data-view';
import { LocalizationService } from '../../providers/localization.service';

@Component({
  selector: 'app-file-select-config-form',
  templateUrl: './file-select-config-form.component.html',
  styleUrls: ['./file-select-config-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileSelectConfigFormComponent {
  @Input() format ? = 'csv';
  @Input() addDataMode ? = false;
  @Input() calculatedDataView: ICalculatedDataView;
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
  worksheets: string[] = [];
  sheet = '';
  loadingSheetsTitle = '';
  hasNameColumn = false;
  nameColumnPosition = 0;

  private _currentTab: TabModel;

  constructor(public ts: TranslateService,
              public ls: LocalizationService,
              private chartService: ChartService,
              private es: ElectronService) {
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
    let reader = 'ext-csv';
    let timeInColumns = false;

    if (this.choice === 'columns') {
      timeInColumns = true;
    }

    if (this.format === 'excel') {
      reader = 'excel';
    }

    const config: any = {
      chartType: this.chartType,
      reader,
      timeInColumns,
      format: this.format,
      sheet: this.sheet,
      path: this.file,
      delimiter: this.delimiter,
      lastModified: this.chartService.getLastModifiedForFile(this.file),
      hasNameColumn: this.hasNameColumn,
      nameColumnPosition: this.nameColumnPosition
    };

    this.chartService.registerNewReader(reader);

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

  switchExampleRows() {
    this.isExampleRows = !this.isExampleRows;
  }

  switchExampleColumns() {
    this.isExampleColumns = !this.isExampleColumns;
  }

  switchUseYourDataVisible() {
    this.useYourDataVisible = !this.useYourDataVisible;
  }

  onFileChanged(fileDescriptor: any) {
    if (fileDescriptor) {
      this.file = fileDescriptor.file;
      this.lastModified = fileDescriptor.lastModified;

      if (this.format === 'excel') {
        this.loadingSheetsTitle = this.ts.instant('Reading Excel sheets');

        const VizabiExcelReader = this.es.vizabi.Reader.extend(this.es.ExcelReader.excelReaderObject);

        setTimeout(() => {
          const readerObject = new VizabiExcelReader({
            path: this.file,
            lastModified: new Date().getTime()
          });

          readerObject.getWorksheets().then(worksheets => {
            this.worksheets = worksheets;
            this.sheet = this.worksheets[0];
            this.loadingSheetsTitle = '';
          });
        }, 500);
      }
    } else {
      this.file = '';
      this.lastModified = null;
      this.worksheets = [];
      this.sheet = '';
      this.hasNameColumn = false;
      this.nameColumnPosition = 0;
    }
  }

  setChoice(choice: string) {
    this.choice = choice;
  }

  setChartType(chartType: string) {
    this.chartType = chartType;
  }
}
