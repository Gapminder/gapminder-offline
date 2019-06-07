import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ChartService } from '../tabs/chart.service';
import { isEmpty } from 'lodash';
import { TabModel } from '../tabs/tab.model';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { ICalculatedDataView } from './calculated-data-view';
import { LocalizationService } from '../../providers/localization.service';

interface IBadFormatHeader {
  expectedHeaderKey: string;
  existingHeaderKey: string;
  expectedHeaderTime: string;
  existingHeaderTime: string;
}

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
  badFormatHeader: IBadFormatHeader;
  header: string[];
  dataError = false;

  private _nameColumnPosition = 0;
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

  get nameColumnPosition() {
    return this._nameColumnPosition;
  }

  set nameColumnPosition(value: number) {
    this._nameColumnPosition = value;
    this.nameColumnPositionChanged();
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

  async onFileChanged(fileDescriptor: any) {
    if (fileDescriptor) {
      this.file = fileDescriptor.file;
      this.lastModified = fileDescriptor.lastModified;
      this.dataError = false;
      try {
        if (this.format === 'excel') {
          this.loadingSheetsTitle = this.ts.instant('Reading Excel sheets');
          const VizabiExcelReader = this.es.vizabi.Reader.extend(this.es.ExcelReader.excelReaderObject);
          const readerObject = new VizabiExcelReader({
            path: this.file,
            lastModified: new Date().getTime()
          });

          this.worksheets = await readerObject.getWorksheets();

          this.sheet = this.worksheets[0];
          this.loadingSheetsTitle = '';
          await this.checkExcelHeader();
        } else {
          const VizabiCsvReader = this.es.vizabi.Reader.extend(this.es.CsvReader.csvReaderObject);
          const readerObject = new VizabiCsvReader({
            path: this.file,
            lastModified: new Date().getTime()
          });
          const data = await readerObject.load();
          this.header = data.columns;
          this.badFormatHeader = this.getBadFormatHeader();
        }
      } catch (e) {
        console.log(e);
        this.header = null;
        this.badFormatHeader = null;
        this.dataError = true;
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

  async checkExcelHeader() {
    try {
      this.dataError = false;
      const VizabiExcelReader = this.es.vizabi.Reader.extend(this.es.ExcelReader.excelReaderObject);
      const readerObject = new VizabiExcelReader({
        path: this.file,
        sheet: this.sheet,
        lastModified: new Date().getTime()
      });
      this.loadingSheetsTitle = this.ts.instant('Reading Excel sheets');
      const data = await readerObject.load();
      this.header = data.columns;
      this.loadingSheetsTitle = '';
      this.badFormatHeader = this.getBadFormatHeader();
    } catch (e) {
      console.log(e);
      this.header = null;
      this.badFormatHeader = null;
      this.dataError = true;
    }
  }

  setChoice(choice: string) {
    this.choice = choice;
  }

  setChartType(chartType: string) {
    this.chartType = chartType;
  }

  getTranslationKeyForBadFormatHeader(): string {
    if (this.badFormatHeader.expectedHeaderKey && this.badFormatHeader.existingHeaderKey &&
      this.badFormatHeader.expectedHeaderTime && this.badFormatHeader.existingHeaderTime) {
      return 'bad-header-format-all';
    } else if (this.badFormatHeader.expectedHeaderKey && this.badFormatHeader.existingHeaderKey) {
      return 'bad-header-format-key';
    } else if (this.badFormatHeader.expectedHeaderTime && this.badFormatHeader.existingHeaderTime) {
      return 'bad-header-format-time';
    }

    return null;
  }

  nameColumnPositionChanged() {
    this.badFormatHeader = this.getBadFormatHeader();
  }

  private getBadFormatHeader(): IBadFormatHeader {
    if (this.header) {
      let keyOffset = 0;
      let timeOffset = 1;

      if (this.hasNameColumn) {
        if (this.nameColumnPosition === 0) {
          keyOffset = 1;
          timeOffset = 2;
        } else if (this.nameColumnPosition === 1) {
          timeOffset = 2;
        }
      }

      if (this.addDataMode && (this.header[keyOffset] !== this.calculatedDataView.dim ||
        this.header[timeOffset] !== this.calculatedDataView.time)) {
        return {
          expectedHeaderKey: this.header[keyOffset] !== this.calculatedDataView.dim ? this.calculatedDataView.dim : null,
          existingHeaderKey: this.header[keyOffset] !== this.calculatedDataView.dim ? this.header[keyOffset] || ' ' : null,
          expectedHeaderTime: this.header[timeOffset] !== this.calculatedDataView.time ? this.calculatedDataView.time : null,
          existingHeaderTime: this.header[timeOffset] !== this.calculatedDataView.time ? this.header[timeOffset] || ' ' : null
        };
      }
    }

    return null;
  }
}
