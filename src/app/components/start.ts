import {Component, Inject, NgZone, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ae-starter',
  template: `
    <div>
        <button (click)='goHome()'>Go home</button>
    </div>
    `
})
export class StartComponent implements OnDestroy {
  constructor(private _router: Router, private _ngZone: NgZone, @Inject('AppStore') private appStore) {
  }

  goHome() {
    let state = this.appStore.getState();

    state.username = 'user!';

    // Because the BrowserWindow runs outside angular for some reason we need to call Zone.run()
    this._ngZone.run(() => {
      if (state.username != '') {
        this._router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
  }
}
