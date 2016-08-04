import {Component, OnInit, Injectable, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';

@Injectable()
@Component({
  selector: 'ae-about-form',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  events: ['done'],
  template: `
  <h2>Gapminder Offline 0.15.1-0</h2>
  <div class="popup-footer">
    <input type="button" (click)="ok()" value="Ok" />
  </div>
  `
})
export class AboutFormComponent implements OnInit {

  private done: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ok() {
    this.done.emit({});
  }
}
