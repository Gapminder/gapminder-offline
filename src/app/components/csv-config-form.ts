import {Component, OnInit, Output, Injectable, EventEmitter} from '@angular/core';

@Injectable()
@Component({
  selector: 'ae-csv-config-form',
  template: `

<div class="popup-block" style="width: 100%; height: 300px; overflow: auto;">
    <h4>Step 1: Choose how your data is arranged:</h4>
    
    <div>
        <label [class.selected]="choiceRows.checked" style="font-size: large"><input type="radio" name="choice" #choiceRows (change)="setChoice('rows')"> Time is in rows</label>
        <div style="font-size: small">Column 1: entities, Column 2: time points, Column 3 and on: indicators (<a href="#" (click)="switchExampleRows()">see example</a>)</div>
    </div>
    
    <div *ngIf="isExampleRows"><img src="./public/images/templates/time-as-rows-example.png" width="600"></div>
    
    <div>
        <label [class.selected]="choiceColumns.checked" style="font-size: large;"><input type="radio" name="choice" #choiceColumns (change)="setChoice('columns')"> Time is in columns</label>
        <div style="font-size: small">Column 1: entities, Column 2: indicators, Column 3 and on: time points (<a href="#" (click)="switchExampleColumns()">see example</a>)</div>
    </div>
    
    <div *ngIf="isExampleColumns"><img src="./public/images/templates/time-as-columns-example.png" width="600"></div>
    
    <h4 *ngIf="choice">Step 2: Pick a file:</h4>
    
    <div *ngIf="choice">
        <input type="file" (change)="onCsvFileChanged($event)" />
    </div>
</div>

<div style="border-bottom: 1px solid #e5e5e5; margin: 30px -15px 30px -15px;"></div>

<div class="popup-footer">
    <div class="btn-group" style="width: 100%">
        <div class="row" style="vertical-align: bottom; position: relative; ">
            <div class="col-sm-4">
                <div><a href="#">How to export a file from MS Excel</a></div>
                <div><a href="#">How to export a file from Google Docs</a></div>
                <div><a href="#">Online csv validator (a handy tool)</a></div>
                <div><a href="#">How do we use your data?</a></div>
           </div>
           <div class="col-sm-8" style="vertical-align: bottom; text-align: right; position: absolute; bottom: 0; right: 0;">
                <input type="button" (click)="close()" value="Cancel" />
                <input type="button" (click)="ok()" value="Ok" />        
           </div>
       </div>
    </div>
</div>
`
})
export class CsvConfigFormComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter();

  private choice: string = '';
  private isExampleRows: boolean = false;
  private isExampleColumns: boolean = false;
  private file: string = '';

  ngOnInit() {
  }

  ok() {
    this.done.emit({reader: this.choice === 'columns' ? 'csv-time_in_columns' : 'csv', path: this.file});
  }

  close() {
    this.done.emit(null);
  }

  private switchExampleRows() {
    this.isExampleRows = !this.isExampleRows;
  }

  private switchExampleColumns() {
    this.isExampleColumns = !this.isExampleColumns;
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
