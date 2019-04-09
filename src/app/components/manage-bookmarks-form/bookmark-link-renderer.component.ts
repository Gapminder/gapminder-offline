import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { ElectronService } from '../../providers/electron.service';
import { MessageService } from '../../message.service';

@Component({
  template: `
    <a href="#" (click)="openBookmark()">open &gt;&gt;</a>
  `,
})
export class BookmarkLinkRendererComponent implements ViewCell {
  @Input() value: string | number;
  @Input() rowData: any;

  constructor(private ms: MessageService, private es: ElectronService) {
  }


  openBookmark() {
    this.ms.sendMessage('close-manage-bookmarks');
    this.es.ipcRenderer.send('open-bookmark', this.rowData.bookmark);
  }
}
