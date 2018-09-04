import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-versions-form',
  templateUrl: './versions-form.component.html'
})
export class VersionsFormComponent implements OnInit {
  @Output() done: EventEmitter<any> = new EventEmitter();

  versions: string[] = [];
  recommendedVersion: string;
  currentVersion: string;
  latestVersion: string;

  constructor(private es: ElectronService) {
    this.es.ipcRenderer.send('get-supported-versions');
  }

  ngOnInit() {
    this.es.ipcRenderer.on('got-supported-versions',
      (event: any, versions: string[], recommendedVersion: string, currentVersion: string) => {
        this.recommendedVersion = recommendedVersion;
        this.currentVersion = currentVersion;
        this.latestVersion = versions[0];
        this.versions = versions;
      });
  }

  update(version: string) {
    this.done.emit(version);
  }

  close() {
    this.done.emit();
  }

  getVersionLabel(version: string) {
    if (version === this.currentVersion && version === this.recommendedVersion) {
      return '(you have the recommended version)';
    }

    if (version === this.currentVersion && version === this.latestVersion) {
      return '(you have the latest version)';
    }

    if (version === this.recommendedVersion) {
      return '(recommended)';
    }

    if (version === this.latestVersion) {
      return '(latest)';
    }

    return '';
  }
}
