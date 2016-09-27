import {Component, OnInit, Output, Injectable, EventEmitter} from '@angular/core';

@Injectable()
@Component({
  selector: 'ae-about-form',
  template: `
  <h2>Gapminder Offline 0.15.1-0</h2>
  <div class="popup-footer">
    <input type="button" (click)="ok()" value="Ok" />
  </div>
  `
})
export class AboutFormComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ok() {
    this.done.emit({});
  }
}
