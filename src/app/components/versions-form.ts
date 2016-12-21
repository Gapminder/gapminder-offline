import {Component, OnInit, Output, Injectable, EventEmitter} from '@angular/core';

declare var electron: any;

@Injectable()
@Component({
  selector: 'ae-versions-form',
  template: `
<div *ngIf="versions && versions.length >= 0">
  <h4>What version do you need?</h4>
  <div class="popup-block">
    <div *ngFor="let version of versions"><a (click)="update(version)">{{version}}</a></div>
  </div>

  <div class="popup-footer">
      <input type="button" (click)="close()" value="Close" />
  </div>
</div>
`
})
export class VersionsFormComponent implements OnInit {
  @Output() done: EventEmitter<any> = new EventEmitter();

  private versions: Array<string> = [];

  constructor() {
    electron.ipcRenderer.send('get-supported-versions');
  }

  ngOnInit() {
    electron.ipcRenderer.on('got-supported-versions', (event, versions) => {
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
