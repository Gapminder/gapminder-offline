import { Component, Input, Output, EventEmitter, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab-title-edit',
  template: `
      <input #tabEditInput
             class = "editTabInput"
             (blur) = "doBlur($event)"
             (keyup.enter) = "doEnter()"
             (keyup.esc) = "doEsc()"
             [ngModel] = "title"
             (input) = "update($event.target.value)"/>
  `
})
export class TabTitleEditComponent implements AfterContentInit {
  @Input() public title: string;
  @Output() public titleChange: EventEmitter<string> = new EventEmitter();
  @Output() public blur: EventEmitter<any> = new EventEmitter();
  @Output() public enter: EventEmitter<any> = new EventEmitter();
  @Output() public esc: EventEmitter<any> = new EventEmitter();
  @ViewChild('tabEditInput') public tabEditInput: ElementRef;

  private initTitle: string;
  private escFlag: boolean;

  public ngAfterContentInit(): void {
    this.escFlag = false;
    this.initTitle = this.title;
    this.tabEditInput.nativeElement.focus();
  }

  public doBlur(event: any): void {
    if (event.srcElement && event.srcElement.value && !this.escFlag) {
      this.title = event.srcElement.value;
      this.titleChange.emit(this.title);
    }

    this.blur.emit();
  }

  public doEnter(): void {
    if (this.title) {
      this.enter.emit();
    }
  }

  public doEsc(): void {
    if (this.title) {
      this.escFlag = true;
      this.title = this.initTitle;
      this.esc.emit();
    }
  }

  public update(val: string): void {
    this.title = val;
    this.titleChange.emit(this.title);
  }
}
