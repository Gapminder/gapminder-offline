import {Component, OnInit, Output, Injectable, EventEmitter} from '@angular/core';

declare var electron: any;

@Injectable()
@Component({
  selector: 'ae-versions-form',
  templateUrl: './versions-form.component.html'
})
export class VersionsFormComponent implements OnInit {
  @Output() done: EventEmitter<any> = new EventEmitter();

  private versions: Array<string> = [];
  private latestVersion: string;

  constructor() {
    electron.ipcRenderer.send('get-supported-versions');
  }

  ngOnInit() {
    electron.ipcRenderer.on('got-supported-versions', (event, versions, version) => {
      this.latestVersion = version;
      this.versions = versions;
    });
  }

  update(version: string) {
    this.done.emit(version);
  }

  close() {
    this.done.emit();
  }
}
