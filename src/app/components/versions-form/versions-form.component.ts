import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var electron: any;

@Component({
  selector: 'ae-versions-form',
  template: require('./versions-form.component.html')
})
export class VersionsFormComponent implements OnInit {
  @Output() public done: EventEmitter<any> = new EventEmitter();

  private versions: string[] = [];
  private recommendedVersion: string;
  private currentVersion: string;
  private latestVersion: string;

  public constructor() {
    electron.ipcRenderer.send('get-supported-versions');
  }

  public ngOnInit(): void {
    electron.ipcRenderer.on('got-supported-versions',
      (event: any, versions: string[], recommendedVersion: string, currentVersion: string) => {
        this.recommendedVersion = recommendedVersion;
        this.currentVersion = currentVersion;
        this.latestVersion = versions[0];
        this.versions = versions;
      });
  }

  public update(version: string): void {
    this.done.emit(version);
  }

  public close(): void {
    this.done.emit();
  }

  public getVersionLabel(version: string): string {
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
