import { Component, Input, ChangeDetectorRef } from '@angular/core';
// import { isEmpty } from 'lodash';

@Component({
  selector: 'app-wait-indicator',
  templateUrl: './wait-indicator.component.html',
  styleUrls: ['./wait-indicator.component.css']
})
export class WaitIndicatorComponent {
  @Input() title = '';

  constructor(private ref: ChangeDetectorRef) {
  }
}
