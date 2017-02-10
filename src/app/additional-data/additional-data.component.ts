import {Component, OnInit, Output, EventEmitter, Injectable} from '@angular/core';
import {IAdditionalDataItem} from '../descriptors/additional-data-item.descriptor';

@Injectable()
@Component({
  selector: 'ae-additional-data',
  templateUrl: './additional-data.component.html'
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
