import * as path from 'path';
import * as fs from 'fs';
import { Component, ElementRef, EventEmitter, forwardRef, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { ChartService } from '../tabs/chart.service';

@Component({
  selector: 'smart-file-selector',
  template: require('./smart-file-selector.component.html'),
  styles: [require('./smart-file-selector.component.css')],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmartFileSelectorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SmartFileSelectorComponent),
      multi: true
    }]
})
export class SmartFileSelectorComponent implements ControlValueAccessor, Validator {
  @Output() public done: EventEmitter<any> = new EventEmitter();
  @ViewChild('uploadBtn') public uploadBtn: ElementRef;
  @ViewChild('uploadFileInput') public uploadFileInput: ElementRef;
  public file: string = '';
  public fileDoesNotExistsError: boolean;
  public data: any;

  private filePath: string = '';
  private lastModified: number;

  public writeValue(obj: any): void {
    if (obj) {
      this.data = obj;
      this.extractFilenameIfOk(this.data);
    }
  }

  public registerOnChange(fn: any): void {
  }

  public validate(c: FormControl): any {
    return (!this.fileDoesNotExistsError) ? null : {
      fileExistsError: {
        valid: false
      }
    };
  }

  public registerOnTouched(): void {
  }

  public onChange(event: any): void {
    const newValue = this.filePath ? path.resolve(this.filePath, event.target.value) : event.target.value;

    try {
      const stats = fs.statSync(newValue);

      this.data = newValue;
      this.lastModified = stats.mtime.valueOf();
      this.fileDoesNotExistsError = !stats.isFile();
    } catch (err) {
      this.fileDoesNotExistsError = true;
    }

    this.extractFilenameIfOk(newValue);
  }

  public onCsvFileChanged(event: any): void {
    const selectedFile = ChartService.getFirst(event.srcElement.files);

    if (selectedFile) {
      this.uploadFileInput.nativeElement.value = selectedFile.path;
      this.uploadFileInput.nativeElement.dispatchEvent(new Event('input'));
      this.onChange({target: {value: selectedFile.path}});
      this.uploadBtn.nativeElement.value = '';
    }
  }

  private extractFilenameIfOk(file: string): void {
    if (!this.fileDoesNotExistsError) {
      const fileDescriptor = path.parse(file);
      this.file = fileDescriptor.base;
      this.filePath = fileDescriptor.dir;
      this.done.emit({file, lastModified: this.lastModified});
    } else {
      this.file = file;
      this.filePath = '';
      this.done.emit();
    }
  }
}
