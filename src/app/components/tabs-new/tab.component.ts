import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-tab-new',
  template: `
    <div [style.display]="getDisplayStyle()" class="tab-pane" style="height: 100%;">
      <ng-content></ng-content>
    </div>

  `
})
export class TabNewComponent {
  @Input() title: string;
  @Input() active = false;
  @Input() disabled = false;
  @Input() removable = false;

  @Output() select: EventEmitter<TabNewComponent> = new EventEmitter();
  @Output() deselect: EventEmitter<TabNewComponent> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  private messageService: MessageService;
  private _editMode: boolean = false;
  private titleCopy: string;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  getDisplayStyle(): string {
    return this.active ? 'block' : 'none';
  }

  get editMode(): boolean {
    return this._editMode;
  }

  set editMode(_editMode: boolean) {
    this._editMode = _editMode;
    this.titleCopy = this.title;
  }

  dismissEditedTitle() {
    this.title = this.titleCopy;
    this.editMode = false;
  }

  applyEditedTitle() {
    this.editMode = false;
  }
}
