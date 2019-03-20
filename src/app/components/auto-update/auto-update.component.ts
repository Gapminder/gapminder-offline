import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { LocalizationService } from '../../providers/localization.service';

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

  constructor(public ls: LocalizationService, private es: ElectronService) {
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
    this.es.ipcRenderer.on('dataset-updated', () => {
      this.updating = false;
      this.datasetReady = true;
    });
    this.es.ipcRenderer.on('dataset-not-updated', (e, err) => {
      this.updating = false;
      this.datasetError = err;
      console.log(this.datasetError);
    });
  }

  updateDataset() {
    this.es.ipcRenderer.send('start-dataset-update', this.newDataset);
    this.updating = true;
    this.newDataset = '';
  }

  reload() {
    this.datasetReady = false;
    this.es.ipcRenderer.send('dataset-reload');
  }

  download() {
    this.es.ipcRenderer.send('start-download');
    this.updating = true;
    this.versionDescriptor = null;
  }

  update() {
    this.es.ipcRenderer.send('start-update');
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
