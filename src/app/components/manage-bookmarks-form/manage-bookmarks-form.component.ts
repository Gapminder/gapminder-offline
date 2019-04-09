import { pick } from 'lodash';
import { Component, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MessageService } from '../../message.service';
import { SEND_BOOKMARKS } from '../../constants';
import { Subscription } from 'rxjs';
import { BookmarkLinkRendererComponent } from './bookmark-link-renderer.component';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-manage-bookmarks-form',
  templateUrl: './manage-bookmarks-form.component.html',
  styleUrls: ['./manage-bookmarks-form.component.css']
})
export class ManageBookmarksFormComponent implements OnInit, OnDestroy {
  @Output() done: EventEmitter<any> = new EventEmitter();
  @ViewChild('manageBookmarksComponent') manageBookmarksComponent;
  subscription: Subscription;
  settings;
  data = [];
  errorDesc;

  constructor(private ms: MessageService, private es: ElectronService) {
  }

  ngOnInit() {
    this.settings = {
      columns: {
        chartType: {
          editable: false
        },
        name: {},
        open: {
          type: 'custom',
          renderComponent: BookmarkLinkRendererComponent,
          editable: false
        }
      },
      hideHeader: true,
      hideSubHeader: true,
      actions: {
        position: 'right',
        add: false
      },
      sort: false,
      edit: {
        editButtonContent: ' Edit ',
        saveButtonContent: ' Save ',
        cancelButtonContent: ' Cancel ',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: ' Delete ',
        confirmDelete: true
      },
      pager: {
        display: false
      }
    };
    this.subscription = this.ms.getMessage().subscribe((event: any) => {
      if (event.message === SEND_BOOKMARKS) {
        if (event.options.bookmarks) {
          this.data = event.options.bookmarks.map(record => ({
            chartType: record.content.chartType,
            name: record.name,
            open: '',
            content: record.content
          }));
        }
      }
    });
    this.es.ipcRenderer.on('bookmarks-not-saved', (event: any, result: any) => {
      this.errorDesc = result;
    });
    this.errorDesc = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.settings = null;
    this.data = [];
    this.manageBookmarksComponent.destroy();
  }

  onEditConfirm(event) {
    event.confirm.resolve(event.newData);
    setImmediate(() => {
      this.es.ipcRenderer.send('save-bookmarks', {bookmarks: this.getBookmarksByData()});
    });
  }

  onDeleteConfirm(event) {
    event.confirm.resolve();

    // !!!!!!!
    // check state and redraw menu after that
    console.log(event.source.data);

    setImmediate(() => {
      this.es.ipcRenderer.send('save-bookmarks', {bookmarks: this.getBookmarksByData()});
    });
  }

  close() {
    this.done.emit();
  }

  private getBookmarksByData(): any[] {
    return this.data.map(r => pick(r, ['name', 'content']));
  }
}
