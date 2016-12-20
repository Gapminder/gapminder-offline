import {Component, OnInit, Output, Injectable, EventEmitter} from '@angular/core';
import {IAdditionalDataItem} from './additional-data';

@Injectable()
@Component({
  selector: 'ae-additional-data-form',
  template: `
<div class="popup-block">
    <ae-additional-data (additionalData)="additionalDataChanged($event)"></ae-additional-data>
</div>

<div class="popup-footer">
    <input type="button"
           (click)="modifyDdf()"
           value="Add new data to current chart" />
    <input type="button" (click)="close()" value="Close" />
</div>
`
})
export class AdditionalDataFormComponent implements OnInit {
  public additionalData: Array<IAdditionalDataItem> = [];

  @Output() done: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  modifyDdf() {
    this.done.emit(this.additionalData);
  }

  close() {
    this.done.emit({});
  }

  additionalDataChanged(data: Array<IAdditionalDataItem>) {
    this.additionalData = data;
  }
}
