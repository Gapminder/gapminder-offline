import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TabModel} from '../tabs/tab.model';

@Component({
  selector: 'ae-hamburger-menu',
  templateUrl: './menu/hamburger-menu.component.html'
})
export class HamburgerMenuComponent {
  @Input() isMenuOpen: boolean = false;
  @Input() currentTab: TabModel;
  @Output() onMenuItemSelected: EventEmitter<any> = new EventEmitter();

  execute(methodName: string) {
    this.onMenuItemSelected.emit(methodName);
  }
}
