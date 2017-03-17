import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { IAdditionalDataItem } from '../descriptors/additional-data-item.descriptor';
import { ChartService } from '../tabs/chart.service';

@Component({
  selector: 'ae-additional-data',
  template: require('./additional-data.component.html')
})
export class AdditionalDataComponent implements OnInit {
  @Output() public additionalData: EventEmitter<any> = new EventEmitter();

  private data: IAdditionalDataItem[] = [];
  private pathToAdd: string;
  private readerToAdd: string;

  public ngOnInit(): void {
    this.resetDataToAdd();
  }

  private onReaderSelect(value: string): void {
    this.readerToAdd = value;
  }

  private resetDataToAdd(): void {
    this.readerToAdd = 'csv';
    this.pathToAdd = '';
  }

  private addNewItem(): void {
    if (this.pathToAdd) {
      this.data.push({reader: this.readerToAdd, path: this.pathToAdd});
      this.additionalData.emit(this.data);

      this.resetDataToAdd();
    }
  }

  private onFileChanged(event: any): void {
    const selectedFile = ChartService.getFirst(event.srcElement.files);

    if (selectedFile) {
      this.pathToAdd = selectedFile.path;

      this.addNewItem();
    }
  }

  private deleteAdditionalItem(itemToDelete: IAdditionalDataItem): void {
    const index = this.data.indexOf(itemToDelete);

    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }
}
