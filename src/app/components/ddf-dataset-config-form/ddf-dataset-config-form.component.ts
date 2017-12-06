import * as fs from 'fs';
import * as path from 'path';
import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ChartService } from '../tabs/chart.service';
import { MessageService } from '../../message.service';
import { OPEN_DDF_FOLDER_ACTION } from '../../constants';

declare const electron: any;

@Component({
  selector: 'ae-ddf-dataset-config-form',
  template: require('./ddf-dataset-config-form.component.html'),
  styles: [require('./ddf-dataset-config-form.component.css')]
})
export class DdfDatasetConfigFormComponent {
  @ViewChild('uploadBtn') public uploadBtn: ElementRef;

  public isDataPackageExists: boolean = false;

  private chartService: ChartService;
  private messageService: MessageService;
  private ref: ChangeDetectorRef;
  private parameters: any = {
    selectedFolder: '',
    chartType: 'BubbleChart'
  };

  public constructor(chartService: ChartService, messageService: MessageService, ref: ChangeDetectorRef) {
    this.chartService = chartService;
    this.messageService = messageService;
    this.ref = ref;
  }

  public ok(): void {
    this.messageService.sendMessage(OPEN_DDF_FOLDER_ACTION, Object.assign({}, this.parameters));
  }

  public close(): void {
    this.messageService.sendMessage(OPEN_DDF_FOLDER_ACTION);
  }

  public openURL(url: string): void {
    electron.shell.openExternal(url);
  }

  private onDdfFolderChanged(event: any): void {
    const selectedFolder = ChartService.getFirst(event.srcElement.files);

    if (selectedFolder) {
      this.isDataPackageExists = false;
      this.parameters.selectedFolder = selectedFolder.path;

      fs.stat(path.resolve(this.parameters.selectedFolder, 'datapackage.json'), (err: any) => {
        this.isDataPackageExists = !err;
        this.ref.detectChanges();
      });
    }
  }
}
