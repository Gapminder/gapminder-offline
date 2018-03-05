import { Component, Input } from '@angular/core';
import { TabModel } from '../tabs/tab.model';

@Component({
  selector: 'ae-tab-freshener',
  styles: [require('./tab-freshener.component.css')],
  template: require('./tab-freshener.component.html')
})
export class TabFreshenerComponent {
  @Input() public tab: TabModel;

  public reload(): void {
    this.tab.isDataExpired = false;
    this.tab.reloadTime = new Date().getTime();
  }
}
