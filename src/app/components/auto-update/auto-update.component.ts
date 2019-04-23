import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { LocalizationService } from '../../providers/localization.service';
import { ALERT } from '../../constants';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-auto-update',
  templateUrl: './auto-update.component.html',
  styleUrls: ['./auto-update.component.css']
})
export class AutoUpdateComponent implements OnInit {
  ready = false;
  datasetReady = false;
  updating = false;
  showProgress = false;
  max = 100;
  progress: number = null;
  versionDescriptor;
  error;
  datasetError;
  newDataset: string;
  private globConst;

  constructor(public ls: LocalizationService, private es: ElectronService, private ms: MessageService) {
    this.globConst = this.es.remote.getGlobal('globConst');
  }

  ngOnInit() {
    this.es.ipcRenderer.on('update-available', (e, versionDescriptor) => {
      this.versionDescriptor = versionDescriptor;
    });
    this.es.ipcRenderer.on('dataset-update-available', (e, datasetTag) => {
      this.versionDescriptor = {actualVersionDsUpdate: datasetTag};
      this.newDataset = datasetTag;
    });
    this.es.ipcRenderer.on('update-error', (e, err) => {
      this.updating = false;
      this.error = err;
    });
    this.es.ipcRenderer.on('download-progress', (e, progressDescriptor) => {
      this.progress = progressDescriptor.percent;

      if (this.progress > 0) {
        this.showProgress = true;
      } else if (this.progress >= 100) {
        this.showProgress = false;
      }
    });
    this.es.ipcRenderer.on('update-downloaded', () => {
      this.versionDescriptor = null;
      this.updating = false;
      this.ready = true;
    });
    this.es.ipcRenderer.on(this.globConst.DATASET_UPDATED, () => {
      this.updating = false;
      this.datasetReady = true;
    });
    this.es.ipcRenderer.on(this.globConst.DATASET_NOT_UPDATED, (e, err) => {
      this.updating = false;
      this.datasetError = err;
      console.log(this.datasetError);
      this.ms.sendMessage(ALERT, {message: this.datasetError, type: 'danger'});
    });
  }

  updateDataset() {
    this.es.ipcRenderer.send(this.globConst.START_DATASET_UPDATE, this.newDataset);
    this.updating = true;
    this.newDataset = '';
  }

  reload() {
    this.datasetReady = false;
    this.es.ipcRenderer.send(this.globConst.DATASET_RELOAD);
  }

  download() {
    this.es.ipcRenderer.send(this.globConst.START_DOWNLOAD);
    this.updating = true;
    this.versionDescriptor = null;
  }

  update() {
    this.es.ipcRenderer.send(this.globConst.START_UPDATE);
  }

  cancel() {
    this.versionDescriptor = null;
    this.newDataset = null;
  }

  resetError() {
    this.error = null;
    this.datasetError = null;
  }

  isActive(): boolean {
    return !!this.versionDescriptor || this.updating || this.showProgress || this.ready || !!this.newDataset || this.datasetReady ||
      !!this.error || !!this.datasetError;
  }

  openURL(url: string) {
    this.es.shell.openExternal(url);
  }
}
