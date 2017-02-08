import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TabModel } from '../tabs/tab.model';

@Component({
  selector: 'ae-hamburger-menu',
  template: require('./hamburger-menu.component.html')
})
export class HamburgerMenuComponent {
  @Input() public isMenuOpened: boolean = false;
  @Input() public currentTab: TabModel;
  @Output() public onMenuItemSelected: EventEmitter<any> = new EventEmitter();

  public execute(methodName: string): void {
    this.onMenuItemSelected.emit(methodName);
  }
}
