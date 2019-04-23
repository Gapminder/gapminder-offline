import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';

interface IVersion {
  win32: string;
  win64: string;
  win32Port: string;
  win64Port: string;
  lin: string;
  mac: string;
  version: string;
}

@Component({
  selector: 'app-versions-form',
  templateUrl: './versions-form.component.html',
  styleUrls: ['./versions-form.component.css']
})
export class VersionsFormComponent implements OnInit {
  @Output() done: EventEmitter<any> = new EventEmitter();

  versions: IVersion[] = [];
  recommendedVersion: string;
  currentVersion: string;
  latestVersion: string;
  private globConst;

  constructor(public translate: TranslateService, private es: ElectronService) {
    this.globConst = this.es.remote.getGlobal('globConst');
    this.es.ipcRenderer.send(this.globConst.GET_SUPPORTED_VERSIONS);
  }

  ngOnInit() {
    this.es.ipcRenderer.on(this.globConst.GOT_SUPPORTED_VERSIONS,
      (event: any, versions: IVersion[], recommendedVersion: string, currentVersion: string) => {
        this.recommendedVersion = recommendedVersion;
        this.currentVersion = currentVersion;
        this.latestVersion = versions[0].version;
        this.versions = versions;
      });
  }

  openURL(url: string) {
    this.es.shell.openExternal(url);
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
