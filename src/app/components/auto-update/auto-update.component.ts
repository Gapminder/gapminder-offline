import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var electron: any;

const ipc = electron.ipcRenderer;

@Component({
  selector: 'ae-auto-update',
  styles: [require('./auto-update.component.css')],
  template: require('./auto-update.component.html')
})
export class AutoUpdateComponent implements OnInit {
  public requestToUpdate: boolean = false;
  public requestToProgress: boolean = false;
  public requestToExitAndFinishUpdate: boolean = false;
  public max: number = 200;
  public progress: number = 0;
  public error: boolean = false;

  @Output() public onAutoUpdateRequested: EventEmitter<any> = new EventEmitter();
  @Output() public onAutoUpdateProgress: EventEmitter<any> = new EventEmitter();
  @Output() public onAutoUpdateCompleted: EventEmitter<any> = new EventEmitter();

  public ngOnInit(): void {
    electron.ipcRenderer.send('check-version');

    ipc.on('request-and-update', (event: any, version: string) => {
      if (version) {
        this.requestToUpdate = true;
        this.processUpdateRequest(version);
      }
    });

    ipc.on('request-to-update', (event: any, version: string) => {
      if (version) {
        this.requestToUpdate = true;
        this.onAutoUpdateRequested.emit();
      }
    });

    ipc.on('download-progress', (event: any, progress: string) => {
      const progressValue = Number(progress);

      if (progressValue > 0) {
        this.progress = progressValue;
        this.onAutoUpdateProgress.emit();
      }
    });

    ipc.on('unpack-progress', (event: any, progress: string) => {
      const progressValue = Number(progress);

      if (progressValue > 0) {
        this.progress = 100 + progressValue;
        this.onAutoUpdateProgress.emit();
      }
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
    electron.ipcRenderer.send('prepare-update', version, 'app');
    this.resetUpdateRequest();

    this.requestToProgress = true;
    this.progress = 0;
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
}
