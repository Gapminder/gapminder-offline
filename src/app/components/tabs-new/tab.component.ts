import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'ae-tab-new',
  template: `
      <div [style.display] = "getDisplayStyle()" class = "tab-pane" style = "height: 100%;">
          <ng-content></ng-content>
      </div>

  `
})
export class TabNewComponent {
  @Input() public title: string;
  @Input() public active: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public removable: boolean = false;

  @Output() public select: EventEmitter<TabNewComponent> = new EventEmitter();
  @Output() public deselect: EventEmitter<TabNewComponent> = new EventEmitter();
  @Output() public remove: EventEmitter<any> = new EventEmitter();

  private messageService: MessageService;
  private _editMode: boolean = false;
  private titleCopy: string;

  public constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  public getDisplayStyle(): string {
    return this.active ? 'block' : 'none';
  }

  public get editMode(): boolean {
    return this._editMode;
  }

  public set editMode(_editMode: boolean) {
    this._editMode = _editMode;
    this.titleCopy = this.title;
  }

  public dismissEditedTitle(): void {
    this.title = this.titleCopy;
    this.editMode = false;
  }

  public applyEditedTitle(): void {
    this.editMode = false;
  }
}
