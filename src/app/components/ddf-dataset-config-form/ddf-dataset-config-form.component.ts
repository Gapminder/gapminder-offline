import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ChartService } from '../tabs/chart.service';
import { MessageService } from '../../message.service';
import { OPEN_DDF_FOLDER_ACTION } from '../../constants';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-ddf-dataset-config-form',
  templateUrl: './ddf-dataset-config-form.component.html',
  styleUrls: ['./ddf-dataset-config-form.component.css']
})
export class DdfDatasetConfigFormComponent {
  @ViewChild('uploadBtn', {static: true}) uploadBtn: ElementRef;

  isDataPackageExists = false;

  parameters: any = {
    selectedFolder: '',
    chartType: 'BubbleChart'
  };

  constructor(
    private chartService: ChartService,
    private messageService: MessageService,
    private ref: ChangeDetectorRef,
    private es: ElectronService) {
  }

  ok() {
    this.messageService.sendMessage(OPEN_DDF_FOLDER_ACTION, Object.assign({}, this.parameters));
  }

  close() {
    this.messageService.sendMessage(OPEN_DDF_FOLDER_ACTION);
  }

  openURL(url: string) {
    this.es.shell.openExternal(url);
  }

  onDdfFolderChanged(event: any) {
    const selectedFolder = ChartService.getFirst(event.srcElement.files);

    if (selectedFolder) {
      this.isDataPackageExists = false;
      this.parameters.selectedFolder = selectedFolder.path;

      this.es.fs.stat(this.es.path.resolve(this.parameters.selectedFolder, 'datapackage.json'), (err: any) => {
        this.isDataPackageExists = !err;
        // this.ref.detectChanges();
      });
    }
  }
}
