import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public translate: TranslateService, private es: ElectronService) {
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
      return this.translate.instant('(you have the recommended version)');
    }

    if (version === this.currentVersion && version === this.latestVersion) {
      return this.translate.instant('(you have the latest version)');
    }

    if (version === this.recommendedVersion) {
      return this.translate.instant('(recommended)');
    }

    if (version === this.latestVersion) {
      return this.translate.instant('(latest)');
    }

    return '';
  }
}
