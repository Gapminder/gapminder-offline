import {Component, OnInit, Input, Output, Injectable, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {TabModel} from '../tabs/tab.model';

@Injectable()
@Component({
  selector: 'ae-csv-config-form',
  templateUrl: './csv-config-form/csv-config-form.component.html',
  styleUrls: ['./csv-config-form/csv-config-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsvConfigFormComponent implements OnInit {
  @Input() currentTab?: TabModel;
  @Input() addDataMode?: boolean = false;
  @Output() done: EventEmitter<any> = new EventEmitter();

  private choice: string = '';
  private isExampleRows: boolean = false;
  private isExampleColumns: boolean = false;
  private useYourDataVisible: boolean = false;
  private delimiter: string = 'auto';
  private file: string = '';

  ngOnInit() {
  }

  ok() {
    const config = {
      reader: this.choice === 'columns' ? 'csv-time_in_columns' : 'csv',
      path: this.file,
      delimiter: this.delimiter
    };

    if (this.delimiter === 'auto') {
      delete config.delimiter;
    }

    this.done.emit(config);
    this.reset();
  }

  close() {
    this.done.emit(null);
  }

  private reset() {
    this.choice = '';
    this.isExampleRows = false;
    this.isExampleColumns = false;
    this.file = '';
  }

  private getDim(): string {
    return this.currentTab.instance ? this.currentTab.instance.model.state.marker._getFirstDimension() : null;
  }

  private getTime(): string {
    return this.currentTab.instance ? this.currentTab.instance.model.state.time.dim : null;
  }

  private getCountries() {
    const dim = this.getDim();

    return this.currentTab.instance ? this.currentTab.instance.model.state.marker.getKeys().slice(0, 5).map(d => d[dim]).join(", ") : null;
  }

  private getTimePoints() {
    if (!this.currentTab.instance) return null;

    let timeMdl = this.currentTab.instance.model.state.time;
    return timeMdl.getAllSteps().slice(0, 3).map(m => timeMdl.formatDate(m)).join(", ");
  }

  private switchExampleRows() {
    this.isExampleRows = !this.isExampleRows;
  }

  private switchExampleColumns() {
    this.isExampleColumns = !this.isExampleColumns;
  }

  private switchUseYourDataVisible() {
    this.useYourDataVisible = !this.useYourDataVisible;
  }

  private onCsvFileChanged(event) {
    if (event.srcElement.files && event.srcElement.files.length > 0) {
      this.file = event.srcElement.files[0].path;
    }
  }

  private setChoice(choice) {
    this.choice = choice;
  }
}
