import { Component, Input, Output, EventEmitter, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ae-tab-title-edit',
  template: `
      <input #tabEditInput
             class = "editTabInput"
             (blur) = "doBlur()"
             (keyup.enter) = "doEnter()"
             (keyup.esc) = "doEsc()"
             [ngModel] = "title"
             (keypress) = "update($event.target.value)"/>
  `
})
export class TabTitleEditComponent implements AfterContentInit {
  @Input() public title: string;
  @Output() public titleChange: EventEmitter<string> = new EventEmitter();
  @Output() public blur: EventEmitter<any> = new EventEmitter();
  @Output() public enter: EventEmitter<any> = new EventEmitter();
  @Output() public esc: EventEmitter<any> = new EventEmitter();
  @ViewChild('tabEditInput') public tabEditInput: ElementRef;

  public ngAfterContentInit(): void {
    this.tabEditInput.nativeElement.focus();
  }

  public doBlur(): void {
    this.blur.emit();
  }

  public doEnter(): void {
    if (this.title) {
      this.enter.emit();
    }
  }

  public doEsc(): void {
    if (this.title) {
      this.esc.emit();
    }
  }

  public update(val: string): void {
    this.title = val;
    this.titleChange.emit(this.title);
  }
}
