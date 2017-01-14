import {Component, OnInit, Input, Output, Injectable, EventEmitter} from '@angular/core';

@Injectable()
@Component({
  selector: 'ae-csv-config-form',
  template: `
<style>
  .main-popup {
    width: 100%;
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .step-block {
    margin-bottom: 20px;
  }
  .step-label {
    font-size: large;
  }
  .example-image {
    max-width: 100%;
    height: auto;
    padding-right: 10px;
  }
  .desc {
    font-size: small
  }
  .highl {
    background-color: yellow;
    color: #b81f00;
  }
  label.step-label {
    margin-left: 1px;
  }
</style>
<div class="popup-block main-popup" style="overflow: auto">
    <div class="step-block">
        <h4>Step 1: Choose how your data is arranged:</h4>
        <div *ngIf="addDataMode && parent.getCurrentTab().instance" class="desc">Limitation: entities in the first column should match the ones already used in the chart:
         <span class="highl">{{getCountries()}}</span> and so on... Time points should be expressed like <span class="highl">{{getTimePoints()}}</span>... 
         Observe the restrictions on column headers, as <span class="highl">highlighted</span> below.
         You can find more instructions <a href="https://docs.google.com/document/d/1pfMcCSKhC2wEVJRYa4Ex2TZkGS22du0Kz9NxSAIHjqU" target="_blank">on&nbsp;this&nbsp;web&nbsp;page</a>
        </div>
        <div>
            <label class="step-label"><input type="radio" name="choice" #choiceRows (change)="setChoice('rows')" [checked]="choice === 'rows'"> Time is in rows</label>
            <div *ngIf="!addDataMode" class="desc">Column 1: entities, Column 2: time points, Column 3 and on: indicators (<a href="#" (click)="switchExampleRows()">see example</a>)</div>
            <div *ngIf="addDataMode && parent.getCurrentTab().instance" class="desc">Column 1: <span class="highl">{{getDim()}}</span>, Column 2: <span class="highl">{{getTime()}}</span>, Column 3 and on: indicators (<a href="#" (click)="switchExampleRows()">see example</a>)</div>
        </div>
        <div *ngIf="isExampleRows" style="width: 100%; max-width: 600px"><img src="./public/images/templates/time-as-rows-example.png" class="example-image"></div>
        <div>
            <label class="step-label"><input type="radio" name="choice" #choiceColumns (change)="setChoice('columns')" [checked]="choice === 'columns'"> Time is in columns</label>
            <div *ngIf="!addDataMode" class="desc">Column 1: entities, Column 2: indicators, Column 3 and on: time points (<a href="#" (click)="switchExampleColumns()">see example</a>)</div>
            <div *ngIf="addDataMode && parent.getCurrentTab().instance" class="desc">Column 1: <span class="highl">{{getDim()}}</span>, Column 2: indicators, Column 3 and on: time points (<a href="#" (click)="switchExampleColumns()">see example</a>)</div>
        </div>
        <div *ngIf="isExampleColumns" style="width: 100%; max-width: 600px"><img src="./public/images/templates/time-as-columns-example.png" class="example-image"></div>
    </div>
    
    <div class="step-block">
        <h4 *ngIf="choice">Step 2: Pick a file:</h4>
        <div *ngIf="choice"><input type="file" (change)="onCsvFileChanged($event)" /></div>
    </div>
    
    <div class="step-block">
        <h4 *ngIf="file && choice">Step 3: Additional options:</h4>
        <div *ngIf="file && choice" class="btn-group">Delimiter:</div>
        <div *ngIf="file && choice" class="btn-group">
            <label class="btn btn-default" [(ngModel)]="delimiter" btnRadio="auto"> Auto </label>
            <label class="btn btn-default" [(ngModel)]="delimiter" btnRadio=","> , </label>
            <label class="btn btn-default" [(ngModel)]="delimiter" btnRadio=";"> ; </label>
            <label class="btn btn-default" [(ngModel)]="delimiter" btnRadio="\t"> Tab </label>
        </div>
    </div>
</div>

<div style="border-bottom: 1px solid #e5e5e5; margin: 5px -15px 10px -15px;"></div>

<div class="popup-footer">
    <div class="btn-group" style="width: 100%">
        <div class="row" style="vertical-align: bottom; position: relative;">
            <div class="col-sm-8">
                <div><a href="https://docs.google.com/document/d/1EUY88cgjs4RHlLpFy_9JdyKaPio4gRVVI2L8wpgZe6Y" target="_blank">How to export a file from MS Excel</a></div>
                <div><a href="https://docs.google.com/document/d/1GEgBscyLSbAkiXbrDrixGDrlTG4DekuFETD5AQaRBvs" target="_blank">How to export a file from Google Docs</a></div>
                <div><a href="https://csvlint.io/" target="_blank">Online csv validator (a handy tool)</a></div>
                <div><a href="#" (click)="switchUseYourDataVisible()">How do we use your data?</a><br><span *ngIf="useYourDataVisible">— We don't. Everything stays local on your computer. <a href="https://github.com/VS-work/gapminder-offline" target="_blank">Read more</a></span></div>
           </div>
           <div class="col-sm-4" style="vertical-align: bottom; text-align: right; position: absolute; bottom: 0; right: 0;">
                <input type="button" style="width: 30%; height: 40px;" (click)="close()" value="Cancel" />
                <input type="button" style="width: 40%; height: 40px;" (click)="ok()" [disabled]="!choice || !file || !delimiter" value="OK" />        
           </div>
       </div>
    </div>
</div>
`
})
export class CsvConfigFormComponent implements OnInit {
  @Input() parent?: any;
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
    return this.parent && this.parent.getCurrentTab().instance ? this.parent.getCurrentTab().instance.model.state.marker._getFirstDimension() : null;
  }

  private getTime(): string {
    return this.parent && this.parent.getCurrentTab().instance ? this.parent.getCurrentTab().instance.model.state.time.dim : null;
  }

  private getCountries() {
    const dim = this.getDim();

    return this.parent && this.parent.getCurrentTab().instance ? this.parent.getCurrentTab().instance.model.state.marker.getKeys().slice(0, 5).map(d => d[dim]).join(", ") : null;
  }

  private getTimePoints() {
    if (!this.parent || !this.parent.getCurrentTab().instance) return null;

    let timeMdl = this.parent.getCurrentTab().instance.model.state.time;
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
