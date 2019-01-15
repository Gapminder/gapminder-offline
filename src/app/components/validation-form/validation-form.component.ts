import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChartService } from '../tabs/chart.service';
import { MessageService } from '../../message.service';
import { ABANDON_VALIDATION, CLEAR_VALIDATION_FORM, OPEN_NEW_DDF_TAB_FROM_VALIDATOR } from '../../constants';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';

interface ChartOption {
  label: string;
  type: string;
}

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.css']
})
export class ValidationFormComponent implements OnInit, OnDestroy {
  @Output() done: EventEmitter<any> = new EventEmitter();

  ERRORS_LIMIT = 50;
  USE_CURRENT_DATA_PACKAGE = 'useCurrentDataPackage';
  CREATE_NEW_DATA_PACKAGE = 'createNewDataPackage';
  dataPackageMode: string = this.USE_CURRENT_DATA_PACKAGE;
  issues: any[] = [];
  areOptionsVisible = false;
  statusLine = '';
  error = '';
  doesValidationRunning = false;
  isResultReady = false;
  preserveHeaders = false;
  chartsToOpen: ChartOption[] = [
    {label: 'Bubbles', type: 'BubbleChart'},
    {label: 'Rankings', type: 'BarRankChart'},
    {label: 'Lines', type: 'LineChart'}
  ];
  chartTypeToOpen: string = this.chartsToOpen[0].type;
  isChartOpenSectionVisible = false;
  errorCount = 0;
  issuesCount = 0;

  ddfFolder: string;
  validator;
  subscription: Subscription;

  constructor(
    public translate: TranslateService,
    private ref: ChangeDetectorRef,
    private chartService: ChartService,
    private messageService: MessageService,
    private es: ElectronService) {
  }

  ngOnInit() {
    this.subscription = this.messageService.getMessage().subscribe((event: any) => {
      if (event.message === CLEAR_VALIDATION_FORM) {
        this.reset();
      }

      if (event.message === ABANDON_VALIDATION) {
        this.abandon();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.done.emit();
  }

  onDirectorySelected(event: any) {
    this.ddfFolder = event.file;
  }

  setDataPackageMode(mode: string) {
    this.dataPackageMode = mode;
  }

  openNewDdfTab() {
    this.messageService.sendMessage(
      OPEN_NEW_DDF_TAB_FROM_VALIDATOR,
      {
        ddfPath: this.ddfFolder,
        chartType: this.chartTypeToOpen
      });
    this.reset();
    this.close();
  }

  openURL(url: string) {
    this.es.shell.openExternal(url);
  }

  validate() {
    if (!this.ddfFolder || this.doesValidationRunning) {
      return;
    }

    this.doesValidationRunning = true;
    this.isResultReady = false;
    this.issues = [];
    this.error = '';
    this.isChartOpenSectionVisible = false;
    this.errorCount = 0;
    this.issuesCount = 0;

    const params = {
      createNewDataPackage: this.CREATE_NEW_DATA_PACKAGE,
      dataPackageMode: this.dataPackageMode,
      options: this.getValidatorOptions(),
      ddfFolder: this.ddfFolder
    };
    const {exists} = this.es.ddfValidation.getDataPackageInfo(this.ddfFolder);

    if (!exists || (exists && params.dataPackageMode === params.createNewDataPackage)) {
      const dataPackageCreationParameters = {
        ddfRootFolder: this.ddfFolder,
        newDataPackagePriority: true,
        externalSettings: params.options
      };
      this.es.ddfValidation.createDataPackage(dataPackageCreationParameters, message => {
        this.statusLine = message;
        this.ref.detectChanges();
      }, error => {
        if (error) {
          this.error = error;
          this.doesValidationRunning = false;
          this.isResultReady = true;
          this.ref.detectChanges();

          return;
        }

        this.validationProcess();
      });
    } else {
      this.validationProcess();
    }
  }

  validationProcess() {
    this.validator = new this.es.ddfValidation.StreamValidator(this.ddfFolder, this.getValidatorOptions());

    this.validator.onMessage(message => {
      this.statusLine = message;
      this.ref.detectChanges();
    });

    this.validator.on('issue', issue => {
      if (!issue.isWarning) {
        this.errorCount++;
      }

      this.issuesCount++;

      if (this.issuesCount <= this.ERRORS_LIMIT) {
        this.issues.push({
          desc: issue.type.replace(/\n/g, '<br>'),
          howToFix: issue.howToFix,
          details: JSON.stringify(issue.data, null, 2)
            .replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;')
        });
      }
    });

    this.validator.on('finish', err => {
      if (err) {
        this.error = err;
        this.doesValidationRunning = false;
        this.isResultReady = true;

      } else {
        this.doesValidationRunning = false;
        this.isResultReady = !this.validator.isAbandoned();
      }

      this.ref.detectChanges();
    });

    this.es.ddfValidation.validate(this.validator);
  }

  abandon() {
    if (this.doesValidationRunning) {
      this.statusLine = this.translate.instant(' ... abandoning ...');
      if (this.validator && this.validator.abandon) {
        this.validator.abandon();
      }
    }
  }

  getValidatorOptions(): any {
    const options: any = {
      silent: true
    };

    if (this.dataPackageMode === this.CREATE_NEW_DATA_PACKAGE && this.preserveHeaders) {
      options.updateDataPackageContent = true;
      options.updateDataPackageTranslations = true;
    }

    return options;
  }

  reset() {
    this.issues = [];
    this.error = '';
    this.dataPackageMode = this.USE_CURRENT_DATA_PACKAGE;
    this.isChartOpenSectionVisible = false;
    this.preserveHeaders = false;
    this.areOptionsVisible = false;
    this.statusLine = '';
    this.doesValidationRunning = false;
    this.isResultReady = false;
    this.ddfFolder = '';
  }
}
