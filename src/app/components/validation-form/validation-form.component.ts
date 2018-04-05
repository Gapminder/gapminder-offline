import { Component, Output, EventEmitter, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import * as path from 'path';
import { ChartService } from '../tabs/chart.service';
import { MessageService } from '../../message.service';
import { CLEAR_VALIDATION_FORM, OPEN_NEW_DDF_TAB_FROM_VALIDATOR, ABANDON_VALIDATION } from '../../constants';
import { Subscription } from 'rxjs/Subscription';

declare var electron: any;

@Component({
  selector: 'ae-validation-form',
  template: require('./validation-form.component.html'),
  styles: [require('./validation-form.component.css')]
})
export class ValidationFormComponent implements OnInit, OnDestroy {
  @Output() public done: EventEmitter<any> = new EventEmitter();

  public USE_CURRENT_DATA_PACKAGE: string = 'useCurrentDataPackage';
  public CREATE_NEW_DATA_PACKAGE: string = 'createNewDataPackage';
  public dataPackageMode: string = this.USE_CURRENT_DATA_PACKAGE;
  public issues: any[] = [];
  public areOptionsVisible: boolean = false;
  public statusLine: string = '';
  public error: string = '';
  public doesValidationRunning: boolean = false;
  public isResultReady: boolean = false;
  public preserveHeaders: boolean = false;

  private ddfFolder: string;
  private ref: ChangeDetectorRef;
  private chartService: ChartService;
  private messageService: MessageService;
  private subscription: Subscription;

  public constructor(ref: ChangeDetectorRef, chartService: ChartService, messageService: MessageService) {
    this.ref = ref;
    this.chartService = chartService;
    this.messageService = messageService;
  }

  public ngOnInit(): void {
    this.subscription = this.messageService.getMessage().subscribe((event: any) => {
      if (event.message === CLEAR_VALIDATION_FORM) {
        this.reset();
      }

      if (event.message === ABANDON_VALIDATION) {
        this.abandon();
      }
    });

    electron.ipcRenderer.on('validation-message', (event: any, message: string) => {
      this.statusLine = message;
      this.ref.detectChanges();
    });

    electron.ipcRenderer.on('validation-error', (event: any, error: any) => {
      this.error = error;
      this.doesValidationRunning = false;
      this.isResultReady = true;
      this.ref.detectChanges();
    });

    electron.ipcRenderer.on('validation-issue', (event: any, issue: any) => {
      this.issues.push({
        desc: issue.type.replace(/\n/g, '<br>'),
        howToFix: issue.howToFix,
        details: JSON.stringify(issue.data, null, 2)
          .replace(/\n/g, '<br>')
          .replace(/ /g, '&nbsp;')
      });
    });

    electron.ipcRenderer.on('validation-completed', (event: any, params: any) => {
      this.doesValidationRunning = params.doesValidationRunning;
      this.isResultReady = params.isResultReady;
      this.ref.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public close(): void {
    this.done.emit();
  }

  public onDirectorySelected(event: any): void {
    this.ddfFolder = event.file;
  }

  public setDataPackageMode(mode: string): void {
    this.dataPackageMode = mode;
  }

  public openNewDdfTab(): void {
    this.chartService.ddfPathFromValidationToOpen = this.ddfFolder;
    this.messageService.sendMessage(OPEN_NEW_DDF_TAB_FROM_VALIDATOR);
    this.reset();
    this.close();
  }

  public openURL(url: string): void {
    electron.shell.openExternal(url);
  }

  public validate(): void {
    if (!this.ddfFolder) {
      return;
    }

    this.doesValidationRunning = true;
    this.isResultReady = false;
    this.issues = [];
    this.error = '';

    electron.ipcRenderer.send('start-validation', {
      createNewDataPackage: this.CREATE_NEW_DATA_PACKAGE,
      dataPackageMode: this.dataPackageMode,
      options: this.getValidatorOptions(),
      ddfFolder: this.ddfFolder
    });
  }

  public abandon(): void {
    if (this.doesValidationRunning) {
      this.statusLine = ' ... abandoning ...';
      electron.ipcRenderer.send('abandon-validation');
    }
  }

  private getValidatorOptions(): any {
    const electronPath = this.chartService.ddfFolderDescriptor.electronPath;
    const validatorPaths = {
      linux: path.resolve(electronPath, 'node_modules', 'ddf-validation', 'lib'),
      darwin: path.resolve(electronPath, 'resources', 'app', 'node_modules', 'ddf-validation', 'lib'),
      win32: path.resolve(electronPath, 'node_modules', 'ddf-validation', 'lib')
    };
    const appPath = validatorPaths[process.platform];
    const options: any = {
      silent: true,
      appPath
    };

    if (this.dataPackageMode === this.CREATE_NEW_DATA_PACKAGE && this.preserveHeaders) {
      options.updateDataPackageContent = true;
      options.updateDataPackageTranslations = true;
    }

    return options;
  }

  private reset(): void {
    this.issues = [];
    this.error = '';
    this.dataPackageMode = this.USE_CURRENT_DATA_PACKAGE;
    this.preserveHeaders = false;
    this.areOptionsVisible = false;
    this.statusLine = '';
    this.doesValidationRunning = false;
    this.isResultReady = false;
    this.ddfFolder = '';
  }
}
