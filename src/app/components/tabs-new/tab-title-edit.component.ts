import { Component, Input, Output, EventEmitter, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ae-tab-title-edit',
  template: `
      <input #tabEditInput
             type = "text"
             class = "editTabInput"
             (blur) = "doBlur()"
             (keyup.enter) = "doEnter()"
             (keyup.esc) = "doEsc()"
             [value] = "title"
             (input) = "update($event.target.value)"/>
  `
})
export class TabTitleEditComponent implements AfterContentInit {
  @Input() protected title: string;
  @Output() protected titleChange: EventEmitter<string> = new EventEmitter();
  @Output() protected blur: EventEmitter<any> = new EventEmitter();
  @Output() protected enter: EventEmitter<any> = new EventEmitter();
  @Output() protected esc: EventEmitter<any> = new EventEmitter();
  @ViewChild('tabEditInput') protected tabEditInput: ElementRef;

  public ngAfterContentInit(): void {
    this.tabEditInput.nativeElement.focus();
  }

  protected doBlur(): void {
    this.blur.emit();
  }

  protected doEnter(): void {
    if (this.title) {
      this.enter.emit();
    }
  }

  protected doEsc(): void {
    if (this.title) {
      this.esc.emit();
    }
  }

  protected update(val: string): void {
    this.title = val;
    this.titleChange.emit(this.title);
  }
}
