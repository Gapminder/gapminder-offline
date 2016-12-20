import {Component, OnInit, NgZone} from '@angular/core';

declare var electron: any;

const ipc = electron.ipcRenderer;

@Component({
  selector: 'ae-auto-update',
  styles: [`
  .btn {
      font-size: 9px;
      color: #ffffff;
      background: #f9cc3e;
      padding: 2px 2px 2px 2px;
      text-decoration: none;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0px;
  }
  .progress {
      margin-top: 8px;
  }
  .label {
      font-size: smaller;
  }
`],
  template: `
<div *ngIf="requestToUpdate" style="display: inline;">
    <div class="label">New version is available!</div>
    <span>
      <input type="button" (click)="processUpdateRequest()" value="Update now" class="btn" />
      <input type="button" (click)="resetUpdateRequest()" value="Later" class="btn" />
    </span>
</div>
<div *ngIf="requestToProgress" class="progress">
    <progressbar [max]="max"
                 type="warning"
                 class="progress-striped"
                 [value]="progress"></progressbar>
</div>
<div *ngIf="requestToExitAndFinishUpdate">
    <div class="label">Reopen the app to finish update?</div>
    <span>
      <input type="button" (click)="processExitAndFinishUpdateRequest()" value="Ok" class="btn" />
    </span>
</div>
`
})
export class AutoUpdateComponent implements OnInit {
  public requestToUpdate: boolean = false;
  public requestToProgress: boolean = false;
  public requestToExitAndFinishUpdate: boolean = false;
  public max: number = 200;
  public progress: number = 0;

  constructor(private _ngZone: NgZone) {
  }

  ngOnInit() {
    electron.ipcRenderer.send('check-version');

    ipc.on('request-to-update', (event, version) => {
      this._ngZone.run(() => {
        if (version) {
          this.requestToUpdate = true;
        }
      });
    });

    ipc.on('download-progress', (event: any, progress: string) => {
      const progressValue = Number(progress);

      if (progressValue > 0) {
        this._ngZone.run(() => {
          this.progress = progressValue;
        });
      }
    });

    ipc.on('unpack-progress', (event: any, progress: string) => {
      const progressValue = Number(progress);

      if (progressValue > 0) {
        this._ngZone.run(() => {
          this.progress = 100 + progressValue;
        });
      }
    });

    ipc.on('unpack-complete', (event, error) => {
      if (error) {
        console.log(error);
      }

      this._ngZone.run(() => {
        this.requestToProgress = false;
        this.requestToExitAndFinishUpdate = true;
        electron.ipcRenderer.send('new-version-ready-flag');
      });
    });
  }

  processUpdateRequest() {
    electron.ipcRenderer.send('prepare-update');
    this.resetUpdateRequest();

    this._ngZone.run(() => {
      this.requestToProgress = true;
      this.progress = 0;
    });
  }

  resetUpdateRequest() {
    this.requestToUpdate = false;
  }

  resetExitAndFinishUpdateRequest() {
    this.requestToExitAndFinishUpdate = false;
  }

  processExitAndFinishUpdateRequest() {
    electron.ipcRenderer.send('exit-and-update');
  }
}
