import { Component } from '@angular/core';

declare const electron: any;

@Component({
  selector: 'ae-auto-update',
  styles: [require('./auto-update.component.css')],
  template: require('./auto-update.component.html')
})
export class AutoUpdateComponent {
  public isPopupVisible: boolean = true;

  public openURL(url: string): void {
    electron.shell.openExternal(url);
  }

  public cancel(): void {
    this.isPopupVisible = false;
  }
}
