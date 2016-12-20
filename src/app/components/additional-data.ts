import {Component, OnInit, Output, EventEmitter, Injectable} from '@angular/core';

export interface IAdditionalDataItem {
  reader: string;
  path: string;
}

@Injectable()
@Component({
  selector: 'ae-additional-data',
  template: `
<div class="panel panel-default">
  <h3 class="panel-title">Additional data</h3>
  
  <div class="panel-body">
  
    <div *ngFor="let item of data" class="panel panel-default">
       {{item.path}} via <b>{{item.reader}}</b> reader <button (click)="deleteAdditionalItem(item)">Delete</button>
    </div>
    
    <div class="panel panel-default">
      <div class="form-group">
        <label for="readerToAdd">Reader:</label>
        <select (change)="onReaderSelect($event.target.value)" id="readerToAdd">
          <option value="csv">csv</option>
          <option value="ddfcsv">ddfcsv</option>
        </select>
      </div>
   
      <div class="form-group">
        <label for="fileToAdd">File to add:</label>
        <input type="file" class="pathToAdd" (change)="onFileChanged($event)" id="fileToAdd" />
      </div>
    </div>

  </div>
</div>
`
})
export class AdditionalDataComponent implements OnInit {
  @Output() additionalData: EventEmitter<any> = new EventEmitter();

  private data: Array<IAdditionalDataItem> = [];
  private pathToAdd: string;
  private readerToAdd: string;

  ngOnInit() {
    this.resetDataToAdd();
  }

  private onReaderSelect(value) {
    this.readerToAdd = value;
  }

  private resetDataToAdd() {
    this.readerToAdd = 'csv';
    this.pathToAdd = '';
  }

  private addNewItem() {
    if (this.pathToAdd) {
      this.data.push({reader: this.readerToAdd, path: this.pathToAdd});
      this.additionalData.emit(this.data);

      this.resetDataToAdd();
    }
  }

  private onFileChanged(event: any) {
    if (event.srcElement.files && event.srcElement.files.length > 0) {
      this.pathToAdd = event.srcElement.files[0].path;

      this.addNewItem();
    }
  }

  private deleteAdditionalItem(itemToDelete: IAdditionalDataItem) {
    const index = this.data.indexOf(itemToDelete);

    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }
}
