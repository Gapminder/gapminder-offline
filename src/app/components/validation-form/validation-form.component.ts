import { Component, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as path from 'path';
import * as api from 'ddf-validation';
import { ChartService } from '../tabs/chart.service';
import { MessageService } from '../../message.service';
import { CLEAR_VALIDATION_FORM, OPEN_NEW_DDF_TAB_FROM_VALIDATOR } from '../../constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ae-validation-form',
  template: require('./validation-form.component.html'),
  styles: [require('./validation-form.component.css')]
})
export class ValidationFormComponent implements OnDestroy {
  @Output() public done: EventEmitter<any> = new EventEmitter();

  public USE_CURRENT_DATA_PACKAGE: string = 'useCurrentDataPackage';
  public CREATE_NEW_DATA_PACKAGE: string = 'createNewDataPackage';
  public dataPackageMode: string = this.USE_CURRENT_DATA_PACKAGE;
  public issues: any[] = [];
  public areOptionsVisible: boolean = false;
  public statusLine: string = '';
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
    this.subscription = this.messageService.getMessage().subscribe((event: any) => {
      if (event.message === CLEAR_VALIDATION_FORM) {
        this.reset();
      }
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

  public validate(): void {
    if (!this.ddfFolder) {
      return;
    }

    this.doesValidationRunning = true;
    this.isResultReady = false;

    const {exists} = api.getDataPackageInfo(this.ddfFolder);

    if (!exists || (exists && this.dataPackageMode === this.CREATE_NEW_DATA_PACKAGE)) {
      const externalSettings = this.getValidatorOptions();
      const dataPackageCreationParameters: api.IDataPackageCreationParameters = {
        ddfRootFolder: this.ddfFolder,
        newDataPackagePriority: true,
        externalSettings
      };
      api.createDataPackage(dataPackageCreationParameters, (message: string) => {
        this.statusLine = message;
        this.ref.detectChanges();
      }, (error: any) => {
        if (error) {
          alert(error.message);
          return;
        }

        this.validationProcess();
      }, true);
    } else {
      this.validationProcess();
    }
  }

  public abandon(): void {
    this.chartService.validator.abandon();
  }

  private validationProcess(): void {
    const options = this.getValidatorOptions();
    this.chartService.validator = new api.StreamValidator(this.ddfFolder, options);

    this.chartService.validator.onMessage((message: string) => {
      this.statusLine = message;
      this.ref.detectChanges();
    });

    this.issues = [];

    this.chartService.validator.on('issue', (issue: any) => {
      this.issues.push({
        desc: issue.type.replace(/\n/g, '<br>'),
        howToFix: issue.howToFix,
        details: JSON.stringify(issue.data, null, 2)
          .replace(/\n/g, '<br>')
          .replace(/ /g, '&nbsp;')
      });
    });

    this.chartService.validator.on('finish', (err: any) => {
      if (err) {
        alert(err.message);
      }

      this.doesValidationRunning = false;
      this.isResultReady = !this.chartService.validator.isAbandoned();
    });

    api.validate(this.chartService.validator);
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
      isMultithread: true,
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
    this.dataPackageMode = this.USE_CURRENT_DATA_PACKAGE;
    this.preserveHeaders = false;
    this.areOptionsVisible = false;
    this.statusLine = '';
    this.doesValidationRunning = false;
    this.isResultReady = false;
    this.ddfFolder = '';
  }
}
