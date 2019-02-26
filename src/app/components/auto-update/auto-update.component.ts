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
  updating = false;
  showProgress = false;
  max = 100;
  progress: number = null;
  versionDescriptor;
  error = false;

  constructor(public ls: LocalizationService, private es: ElectronService) {
  }

  ngOnInit() {
    this.es.ipcRenderer.on('update-available', (e, versionDescriptor) => {
      this.versionDescriptor = versionDescriptor;
    });
    this.es.ipcRenderer.on('update-error', (e, err) => {
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
  }

  resetError() {
    this.error = null;
  }

  isActive(): boolean {
    return !!this.versionDescriptor || this.updating || this.showProgress || this.ready;
  }

  openURL(url: string) {
    this.es.shell.openExternal(url);
  }
}
