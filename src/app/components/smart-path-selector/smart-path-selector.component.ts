import {
  AfterContentChecked,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { ChartService } from '../tabs/chart.service';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-smart-path-selector',
  templateUrl: './smart-path-selector.component.html',
  styleUrls: ['./smart-path-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmartPathSelectorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SmartPathSelectorComponent),
      multi: true
    }]
})
export class SmartPathSelectorComponent implements ControlValueAccessor, Validator, AfterContentChecked {
  @Input() isDirectory: boolean;
  @Input() title = 'Choose CSV file';
  @Input() accept = '.csv';
  @Input() clearValueAfterHide: boolean;
  @Output() done: EventEmitter<any> = new EventEmitter();
  @ViewChild('uploadBtn', {static: true}) uploadBtn: ElementRef;
  @ViewChild('uploadFileInput', {static: true}) uploadFileInput: ElementRef;
  directory = '';
  file = '';
  fileDoesNotExistsError: boolean;
  data: any;

  private filePath = '';
  private lastModified: number;

  constructor(private es: ElectronService) {
  }

  ngAfterContentChecked() {
    if (!this.clearValueAfterHide) {
      return;
    }

    if (this.uploadFileInput && this.uploadFileInput.nativeElement && !this.uploadFileInput.nativeElement.offsetParent) {
      this.uploadFileInput.nativeElement.value = '';
      this.directory = '';
      this.file = '';
      this.fileDoesNotExistsError = false;
    }
  }

  writeValue(obj: any) {
    if (obj) {
      this.data = obj;
      this.prepareResultIfOk(this.data);
    }
  }

  registerOnChange(fn: any) {
  }

  validate(c: FormControl): any {
    return (!this.fileDoesNotExistsError) ? null : {
      fileExistsError: {
        valid: false
      }
    };
  }

  registerOnTouched() {
  }

  onChange(event: any) {
    const newValue = this.filePath ? this.es.path.resolve(this.filePath, event.target.value) : event.target.value;

    try {
      const stats = this.es.fs.statSync(newValue);

      this.data = newValue;
      this.lastModified = stats.mtime.valueOf();
      this.fileDoesNotExistsError = this.isDirectory ? !stats.isDirectory() : !stats.isFile();
    } catch (err) {
      this.fileDoesNotExistsError = true;
    }

    this.prepareResultIfOk(newValue);
  }

  public onCsvFileChanged(event: any) {
    const selectedFile = ChartService.getFirst(event.srcElement.files);

    if (selectedFile) {
      this.uploadFileInput.nativeElement.value = selectedFile.path;
      this.uploadFileInput.nativeElement.dispatchEvent(new Event('input'));
      this.onChange({target: {value: selectedFile.path}});
      this.uploadBtn.nativeElement.value = '';
    }
  }

  private prepareResultIfOk(fileOrDirectory: string) {
    if (!this.fileDoesNotExistsError) {
      if (this.isDirectory) {
        this.directory = fileOrDirectory;
        this.done.emit({file: fileOrDirectory, lastModified: this.lastModified});
      } else {
        const fileDescriptor = this.es.path.parse(fileOrDirectory);
        this.file = fileDescriptor.base;
        this.filePath = fileDescriptor.dir;
        this.done.emit({file: fileOrDirectory, lastModified: this.lastModified});
      }
    } else {
      this.file = fileOrDirectory;
      this.filePath = '';
      this.done.emit();
    }
  }
}
