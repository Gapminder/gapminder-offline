import {Component, OnInit, NgZone} from '@angular/core';

declare var electron: any;

const ipc = electron.ipcRenderer;

@Component({
  selector: 'ae-auto-update',
  styleUrls: ['./auto-update/auto-update.component.css'],
  templateUrl: './auto-update/auto-update.component.html'
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

    ipc.on('request-and-update', (event, version) => {
      this._ngZone.run(() => {
        if (version) {
          this.requestToUpdate = true;
          this.processUpdateRequest(version);
        }
      });
    });

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
      });
    });
  }

  processUpdateRequest(version?: string) {
    electron.ipcRenderer.send('prepare-update', version, 'app');
    this.resetUpdateRequest();

    this._ngZone.run(() => {
      this.requestToProgress = true;
      this.progress = 0;
    });
  }

  resetUpdateRequest() {
    this.requestToUpdate = false;
  }

  processExitAndFinishUpdateRequest() {
    electron.ipcRenderer.send('exit-and-update');
  }
}
