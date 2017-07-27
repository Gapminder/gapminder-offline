import { Component, ViewChild, ElementRef } from '@angular/core';
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

  private chartService: ChartService;
  private messageService: MessageService;
  private parameters: any = {
    selectedFolder: '',
    chartType: 'BubbleChart'
  };

  public constructor(chartService: ChartService, messageService: MessageService) {
    this.chartService = chartService;
    this.messageService = messageService;
  }

  public ok(): void {
    this.messageService.sendMessage(OPEN_DDF_FOLDER_ACTION, Object.assign({}, this.parameters));
  }

  public close(): void {
    this.messageService.sendMessage(OPEN_DDF_FOLDER_ACTION);
  }

  private onDdfFolderChanged(event: any): void {
    const selectedFolder = ChartService.getFirst(event.srcElement.files);

    if (selectedFolder) {
      this.parameters.selectedFolder = selectedFolder.path;
    }
  }
}
