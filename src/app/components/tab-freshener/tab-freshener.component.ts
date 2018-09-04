import { Component, Input } from '@angular/core';
import { TabModel } from '../tabs/tab.model';

@Component({
  selector: 'app-tab-freshener',
  templateUrl: './tab-freshener.component.html',
  styleUrls: ['./tab-freshener.component.css']
})
export class TabFreshenerComponent {
  @Input() tab: TabModel;

  reload() {
    this.tab.isDataExpired = false;
    this.tab.reloadTime = new Date().getTime();
  }
}
