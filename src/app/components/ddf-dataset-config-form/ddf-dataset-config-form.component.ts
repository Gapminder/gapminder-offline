import { Component, Output, EventEmitter,ViewChild, ElementRef } from '@angular/core';
import { ChartService } from '../tabs/chart.service';

declare const electron: any;

@Component({
  selector: 'ae-ddf-dataset-config-form',
  template: require('./ddf-dataset-config-form.component.html'),
  styles: [require('./ddf-dataset-config-form.component.css')]
})
export class DdfDatasetConfigFormComponent {
  @Output() public done: EventEmitter<any> = new EventEmitter();
  @ViewChild('uploadBtn') public uploadBtn: ElementRef;

  private chartService: ChartService;
  private parameters: any = {
    selectedFolder: '',
    chartType: 'BubbleChart'
  };

  public constructor(chartService: ChartService) {
    this.chartService = chartService;
  }

  public ok(): void {
    this.done.emit(this.parameters);
    this.reset();
  }

  public close(): void {
    this.done.emit();
  }

  private reset(): void {
    this.uploadBtn.nativeElement.value = '';
    this.parameters.selectedFolder = '';
  }

  private onDdfFolderChanged(event: any): void {
    const selectedFolder = ChartService.getFirst(event.srcElement.files);

    if (selectedFolder) {
      this.parameters.selectedFolder = selectedFolder.path;
    }
  }
}
