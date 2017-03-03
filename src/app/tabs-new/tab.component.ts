import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ae-tab-new',
  template: `
      <div [style.display]="getDisplayStyle()" class = "tab-pane" style = "height: 100%;">
          <ng-content></ng-content>
      </div>

  `
})
export class TabNewComponent {
  @Input() title: string;
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;
  @Input() removable: boolean = false;

  @Output() public select: EventEmitter<TabNewComponent> = new EventEmitter();
  @Output() public deselect: EventEmitter<TabNewComponent> = new EventEmitter();
  @Output() public remove: EventEmitter<any> = new EventEmitter();

  getDisplayStyle(): string {
    return this.active ? 'block' : 'none';
  }
}
