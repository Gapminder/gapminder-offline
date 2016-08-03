import {Component, Inject, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ae-home',
  template: `
    <div>
       <h1>{{name}}</h1>
       <div><button (click)='goBack()'>back</button></div>
    </div>
    `
})
export class HomeComponent implements OnInit {
  name: string;

  constructor(private _router: Router, private _ngZone: NgZone, @Inject('AppStore') private appStore) {
    let state = this.appStore.getState();

    this.name = state.username;
  }

  goBack() {
    this._ngZone.run(() => {
      this._router.navigate(['/']);
    });
  }

  ngOnInit() {
    // Our API
  }
}
