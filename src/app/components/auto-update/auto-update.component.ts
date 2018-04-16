import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var electron: any;

const ipc = electron.ipcRenderer;

export interface ProgressDescriptor {
  progress: string | number;
  cacheDir: string;
}

export interface VersionDescriptor {
  actualVersionDsUpdate?: string;
  actualVersionGenericUpdate?: string;
  os: string;
  arch: string;
}

@Component({
  selector: 'ae-auto-update',
  styles: [require('./auto-update.component.css')],
  template: require('./auto-update.component.html')
})
export class AutoUpdateComponent implements OnInit {
  @Output() public onAutoUpdateRequested: EventEmitter<any> = new EventEmitter();
  @Output() public onAutoUpdateProgress: EventEmitter<any> = new EventEmitter();
  @Output() public onAutoUpdateCompleted: EventEmitter<any> = new EventEmitter();

  public requestToUpdate: boolean = false;
  public requestToDatasetUpdate: boolean = false;
  public requestToProgress: boolean = false;
  public requestToExitAndFinishUpdate: boolean = false;
  public max: number = 200;
  public progress: number = 0;
  public error: boolean = false;
  public versionDescriptor: VersionDescriptor;
  /* todo: try to use it later */
  public downloadLinks: any = {
    linux: 'https://s3-eu-west-1.amazonaws.com/gapminder-offline/Gapminder%20Offline-linux.zip',
    darwin: 'https://s3-eu-west-1.amazonaws.com/gapminder-offline/Install%20Gapminder%20Offline.dmg',
    win32x64: 'https://s3-eu-west-1.amazonaws.com/gapminder-offline/Install%20Gapminder%20Offline-64.exe',
    win32ia32: 'https://s3-eu-west-1.amazonaws.com/gapminder-offline/Install%20Gapminder%20Offline-32.exe'
  };

  private progressMap: Map<string, ProgressDescriptor> = new Map<string, ProgressDescriptor>();

  public ngOnInit(): void {
    electron.ipcRenderer.send('check-version');

    ipc.on('request-and-update', (event: any, versionDescriptor: VersionDescriptor) => {
      this.versionDescriptor = versionDescriptor;

      if (versionDescriptor.actualVersionGenericUpdate) {
        this.requestToUpdate = true;
        this.processUpdateRequest(versionDescriptor.actualVersionGenericUpdate);
      }
    });

    ipc.on('request-to-update', (event: any, versionDescriptor: VersionDescriptor) => {
      this.versionDescriptor = versionDescriptor;

      if (versionDescriptor.actualVersionDsUpdate || versionDescriptor.actualVersionGenericUpdate) {
        this.max = versionDescriptor.actualVersionDsUpdate && versionDescriptor.actualVersionGenericUpdate ? 400 : 200;
        this.requestToDatasetUpdate = versionDescriptor.actualVersionDsUpdate && !versionDescriptor.actualVersionGenericUpdate;
        this.requestToUpdate = true;
        this.onAutoUpdateRequested.emit();
      }
    });

    /*ipc.on('request-to-ds-update', (event: any, version: string) => {
      if (version) {
        this.requestToDatasetUpdate = true;
        this.onAutoUpdateRequested.emit();
      }
    });*/

    ipc.on('download-progress', (event: any, progressDescriptor: ProgressDescriptor) => {
      progressDescriptor.progress = Number(progressDescriptor.progress);

      this.progressMap.set(progressDescriptor.cacheDir, progressDescriptor);
      this.progress = this.getTotalProgress();
      this.onAutoUpdateProgress.emit();
    });

    ipc.on('unpack-progress', (event: any, progressDescriptor: ProgressDescriptor) => {
      progressDescriptor.progress = Number(progressDescriptor.progress) + 100;

      this.progressMap.set(progressDescriptor.cacheDir, progressDescriptor);
      this.progress = this.getTotalProgress();
      this.onAutoUpdateProgress.emit();
    });

    ipc.on('unpack-complete', (event: any, error: string) => {
      if (error) {
        console.log(error);
      }

      this.requestToProgress = false;
      this.requestToExitAndFinishUpdate = true;
      this.onAutoUpdateCompleted.emit();
    });

    ipc.on('auto-update-error', () => {
      this.error = true;
      this.requestToProgress = false;
      this.onAutoUpdateRequested.emit();
    });
  }

  public processUpdateRequest(version?: string): void {
    electron.ipcRenderer.send('prepare-update', version);
    this.resetUpdateRequest();

    this.requestToProgress = true;
    this.progressMap.clear();
    this.onAutoUpdateRequested.emit();
  }

  public resetUpdateRequest(): void {
    this.requestToUpdate = false;
  }

  public processExitAndFinishUpdateRequest(): void {
    electron.ipcRenderer.send('exit-and-update');
  }

  public resetError(): void {
    this.error = false;
  }

  public openURL(url: string): void {
    electron.shell.openItem(url);
  }

  public cancel(): void {
    this.requestToUpdate = false;
    this.requestToDatasetUpdate = false;
  }

  private getTotalProgress(): number {
    const progressMapValues = Array.from(this.progressMap.values());

    return progressMapValues.reduce((currentProgress: number, progressDescriptor: ProgressDescriptor) =>
      currentProgress + (progressDescriptor.progress as number), 0);
  }
}
