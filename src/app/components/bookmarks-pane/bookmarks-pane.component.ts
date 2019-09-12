import { Component, OnDestroy, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ElectronService } from '../../providers/electron.service';
import { LocalizationService } from '../../providers/localization.service';
import { ALERT, BOOKMARKS_PANE_OFF_OUTSIDE, SWITCH_BOOKMARKS_PANE } from '../../constants';
import { MessageService } from '../../message.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty, defaultsDeep } from 'lodash';
import { ChartService } from '../tabs/chart.service';

const BOOKMARKS_THUMBNAILS_FOLDER = 'bookmarks-thumbnails';

enum ScrollMove {
  SCROLL_UP, SCROLL_DN, NO_SCROLL
}

interface IFolder {
  name: string;
  tmpName?: string;
  editMode: boolean;
  collapsed: boolean;
}

@Component({
  selector: 'app-bookmarks-pane',
  templateUrl: './bookmarks-pane.component.html',
  styleUrls: ['./bookmarks-pane.component.css']
})
export class BookmarksPaneComponent implements OnInit, OnDestroy {
  @ViewChild('inputNewFolder', {static: false}) inputNewFolder: ElementRef;
  bookmarksByFolder;
  unCategorizedBookmarks;
  bookmarksFolders;
  isNewBookmarksFolderFormVisible = false;
  newBookmarksFolder = '';
  private globConst;
  private needToFullnessCheck = false;
  private gotBookmarks;
  private bookmarkRemoved;
  private bookmarkAdded;
  private bookmarksFolderCreated;
  private bookmarkFolderUpdated;
  private bookmarkFolderRemoved;
  private bookmarkUpdated;
  private bookmarkMoved;
  private dragulaSubs: Subscription;
  private scrollTimer;
  private scrollDirection = ScrollMove.NO_SCROLL;
  private lastY = null;

  constructor(public ls: LocalizationService,
              public es: ElectronService,
              public ts: TranslateService,
              public sanitizer: DomSanitizer,
              private chartService: ChartService,
              private ms: MessageService,
              private dragulaService: DragulaService) {
    this.globConst = this.es.remote.getGlobal('globConst');
  }

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
  }

  ngOnInit() {
    const container: any = document.querySelector('.wrapper');
    this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    this.gotBookmarks = this.onGotBookmarks();
    this.bookmarkRemoved = this.onBookmarkRemoved();
    this.bookmarkAdded = this.onBookmarkAdded();
    this.bookmarksFolderCreated = this.onBookmarksFolderCreated();
    this.bookmarkFolderUpdated = this.onBookmarkFolderUpdated();
    this.bookmarkFolderRemoved = this.onBookmarkFolderRemoved();
    this.bookmarkUpdated = this.onBookmarkUpdated();
    this.bookmarkMoved = this.onBookmarkMoved();
    this.es.ipcRenderer.on(this.globConst.GOT_BOOKMARKS, this.gotBookmarks);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_REMOVED, this.bookmarkRemoved);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_ADDED, this.bookmarkAdded);
    this.es.ipcRenderer.on(this.globConst.BOOKMARKS_FOLDER_CREATED, this.bookmarksFolderCreated);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_FOLDER_UPDATED, this.bookmarkFolderUpdated);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_FOLDER_REMOVED, this.bookmarkFolderRemoved);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_UPDATED, this.bookmarkUpdated);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_MOVED, this.bookmarkMoved);

    this.dragulaService.drag('bm').subscribe(value => {
      document.onmousemove = e => {
        const event = e || window.event;
        const mouseY = event['pageY'] - container.offsetTop;
        const elementHeight = value.el.getBoundingClientRect().height;
        const midPoint = container.offsetHeight / 2;
        const luft = elementHeight / 2;
        const initUp = () => {
          this.scrollTimer = setInterval(() => {
            container.scrollBy(0, -15);
          }, 30);
          this.scrollDirection = ScrollMove.SCROLL_UP;
        };
        const initDn = () => {
          this.scrollTimer = setInterval(() => {
            container.scrollBy(0, 15);
          }, 30);
          this.scrollDirection = ScrollMove.SCROLL_DN;
        };
        const isTopPoint = () => mouseY < midPoint - luft;
        const isBottomPoint = () => mouseY > midPoint + luft;
        const direction = this.lastY === null ? null : e.pageY < this.lastY ? 1 : 0;

        if ((isTopPoint() || isBottomPoint()) && direction === 1) {
          if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
            this.scrollTimer = null;
          }
          initUp();
        } else if ((isTopPoint() || isBottomPoint()) && direction === 0) {
          if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
            this.scrollTimer = null;
          }
          initDn();
        } else if (!isTopPoint() && !isBottomPoint()) {
          clearInterval(this.scrollTimer);
          this.scrollTimer = null;
        }

        this.lastY = e.pageY;
      };
    });

    this.dragulaService.dragend('bm').subscribe(() => {
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer);
        this.scrollTimer = null;
      }
      document.onmousemove = null;
    });

    this.dragulaSubs = this.dragulaService.dropModel('bm').subscribe(args => {
      if (!args.item || !args.target) {
        return;
      }

      const elId = args.item.id;
      const targetFolder = args.target.id;
      let leftId = null;
      let rightId = null;

      for (let i = 0; i < args.targetModel.length; i++) {
        if (args.targetModel[i].id === elId) {
          if (i > 0) {
            leftId = args.targetModel[i - 1].id;
          }
          if (i < args.targetModel.length - 1) {
            rightId = args.targetModel[i + 1].id;
          }
          break;
        }
      }

      this.es.ipcRenderer.send(this.globConst.MOVE_BOOKMARK, {elId, leftId, rightId, targetFolder});
      this.ms.lock();
    });
  }

  ngOnDestroy() {
    if (this.scrollTimer) {
      clearInterval(this.scrollTimer);
      this.scrollTimer = null;
    }
    this.dragulaSubs.unsubscribe();
    this.es.ipcRenderer.removeListener(this.globConst.GOT_BOOKMARKS, this.gotBookmarks);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_REMOVED, this.bookmarkRemoved);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_ADDED, this.bookmarkAdded);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARKS_FOLDER_CREATED, this.bookmarksFolderCreated);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_FOLDER_UPDATED, this.bookmarkFolderUpdated);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_FOLDER_REMOVED, this.bookmarkFolderRemoved);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_UPDATED, this.bookmarkUpdated);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_MOVED, this.bookmarkMoved);
  }

  open(bookmark) {
    this.ms.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false, dontRestoreTab: true});
    this.ms.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
    this.es.ipcRenderer.send(this.globConst.OPEN_BOOKMARK, bookmark);
  }

  remove(bookmark) {
    this.es.ipcRenderer.send(this.globConst.REMOVE_BOOKMARK, {bookmark});
    this.ms.lock();
    bookmark.removeRequest = true;
  }

  edit(bookmarks, bookmark) {
    for (const bm of bookmarks) {
      bm.editMode = false;
    }
    bookmark.editMode = !bookmark.editMode;
  }

  save(bookmark) {
    bookmark.name = bookmark.tmpName;
    this.es.ipcRenderer.send(this.globConst.UPDATE_BOOKMARK, {bookmark});
    this.ms.lock();
    bookmark.editMode = false;
  }

  cancel(bookmark) {
    bookmark.editMode = false;
    bookmark.tmpName = bookmark.name;
  }

  removeFolder(folder: IFolder) {
    this.es.ipcRenderer.send(this.globConst.REMOVE_BOOKMARKS_FOLDER, {folderName: folder.name});
    this.ms.lock();
  }

  createNewBookmarksFolder() {
    if (this.newBookmarksFolder !== '') {
      this.es.ipcRenderer.send(this.globConst.CREATE_NEW_BOOKMARKS_FOLDER, {folder: this.newBookmarksFolder});
      this.ms.lock();
    }
  }

  resetFolderForm() {
    this.isNewBookmarksFolderFormVisible = false;
    this.newBookmarksFolder = '';
  }

  switchFolderEditMode(folders: IFolder[], folder: IFolder) {
    for (const f of folders) {
      f.editMode = false;
    }
    folder.editMode = !folder.editMode;

    if (folder.editMode) {
      folder.tmpName = folder.name;
    }
  }

  saveFolder(folder: IFolder) {
    this.es.ipcRenderer.send(this.globConst.UPDATE_BOOKMARKS_FOLDER, {oldFolderName: folder.name, newFolderName: folder.tmpName});
    this.ms.lock();
  }

  cancelFolder(folder: IFolder) {
    folder.editMode = false;
    folder.tmpName = folder.name;
  }

  onBookmarkFolderChange(event, bookmark) {
    bookmark.folder = event.target.value;
  }

  isLocked(): boolean {
    return this.ms.isLocked();
  }

  areUncategorizedBookmarksPresent(): boolean {
    return !isEmpty(this.unCategorizedBookmarks);
  }

  areBookmarksPresentInFolder(folder: string): boolean {
    return !isEmpty(this.bookmarksByFolder[folder]);
  }

  areBookmarksFoldersEmpty(): boolean {
    return isEmpty(this.bookmarksFolders);
  }

  areBookmarksPresent(): boolean {
    const unCategorizedBookmarksPresent = this.areUncategorizedBookmarksPresent();
    let bookmarksByFolderPresent = false;

    if (!this.areBookmarksFoldersEmpty()) {
      for (const folder of this.bookmarksFolders) {
        if (this.areBookmarksPresentInFolder(folder.name)) {
          bookmarksByFolderPresent = true;
        }
      }
    }

    return unCategorizedBookmarksPresent || bookmarksByFolderPresent;
  }

  switchNewFolderControl() {
    this.isNewBookmarksFolderFormVisible = !this.isNewBookmarksFolderFormVisible;
    if (this.isNewBookmarksFolderFormVisible) {
      setTimeout(() => {
        this.inputNewFolder.nativeElement.focus();
      }, 0);
    }
  }

  switchFolderContentVisibility(folder: IFolder) {
    folder.collapsed = !folder.collapsed;
    this.es.ipcRenderer.send(this.globConst.BOOKMARKS_FOLDER_VISIBILITY_SWITCH, {folder});
  }

  private removeBookmarkIn(bookmarks, bookmarkId: string): boolean {
    if (!bookmarks || !bookmarks.findIndex) {
      return false;
    }

    const index = bookmarks.findIndex(bookmark => bookmark.id === bookmarkId);
    if (index >= 0) {
      bookmarks.splice(index, 1);
      return true;
    }

    return false;
  }

  private onGotBookmarks() {
    return (event, result) => {
      if (this.processError(result)) {
        return;
      }
      this.bookmarksByFolder = {};
      this.unCategorizedBookmarks = [];

      for (const bookmark of result.data.content) {
        bookmark.tmpName = bookmark.name;
        bookmark.image = 'file:' + this.es.path.resolve(this.es.userDataPath, BOOKMARKS_THUMBNAILS_FOLDER, `${bookmark.id}.png`);
        bookmark.editMode = false;
        bookmark.removeRequest = false;

        if (bookmark.folder) {
          if (!this.bookmarksByFolder[bookmark.folder]) {
            this.bookmarksByFolder[bookmark.folder] = [];
          }

          this.bookmarksByFolder[bookmark.folder].push(bookmark);
        } else {
          this.unCategorizedBookmarks.push(bookmark);
        }
      }

      for (const folder of result.data.folders) {
        if (!this.bookmarksByFolder[folder]) {
          this.bookmarksByFolder[folder] = [];
        }
      }

      const settings = defaultsDeep(result.data.settings, {folders: {}});

      this.bookmarksFolders = result.data.folders.map(folderName => {
        const collapsed = (settings.folders[folderName] && settings.folders[folderName].collapsed) || false;
        return {
          name: folderName,
          tmpName: folderName,
          editMode: false,
          collapsed
        };
      });

      /* if (this.needToFullnessCheck && !this.areBookmarksPresent()) {
        this.ms.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false, dontRestoreTab: true});
        this.ms.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
      } */

      this.needToFullnessCheck = false;
    };
  }

  private onBookmarkRemoved() {
    return (event, result) => {
      if (this.processError(result)) {
        return;
      }

      let found = this.removeBookmarkIn(this.unCategorizedBookmarks, result.bookmark.id);

      if (!found) {
        for (const folder of this.bookmarksFolders) {
          found = this.removeBookmarkIn(this.bookmarksByFolder[folder], result.bookmark.id);
          if (found) {
            break;
          }
        }
      }

      this.ms.sendMessage(ALERT, {
        message: {
          template: 'Bookmark just removed',
          params: result.bookmark
        },
        type: 'info',
        timeout: 5000,
        activities: [{label: 'Undo', event: this.globConst.BOOKMARKS_REMOVE_RESTORE}]
      });
      this.needToFullnessCheck = true;
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkAdded() {
    return (event, result) => {
      this.processError(result);
    };
  }

  private onBookmarksFolderCreated() {
    return (event, result) => {
      if (this.processError(result)) {
        return;
      }

      this.newBookmarksFolder = '';
      this.isNewBookmarksFolderFormVisible = false;
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkFolderUpdated() {
    return (event, result) => {
      if (this.processError(result)) {
        return;
      }

      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkFolderRemoved() {
    return (event, result) => {
      if (this.processError(result)) {
        return;
      }

      this.ms.sendMessage(ALERT, {
        message: {
          template: 'Folder just removed',
          params: result.params

        },
        type: 'info',
        timeout: 5000,
        activities: [{label: 'Undo', event: this.globConst.BOOKMARKS_REMOVE_RESTORE}]
      });
      this.needToFullnessCheck = true;
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkUpdated() {
    return () => {
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkMoved() {
    return (event, result) => {
      let el = this.unCategorizedBookmarks.filter(record => +record.id === +result.params.elId);

      if (el.length <= 0) {
        for (const folder of Object.keys(this.bookmarksByFolder)) {
          el = this.bookmarksByFolder[folder].filter(record => +record.id === +result.params.elId);

          if (el.length === 1) {
            el = el[0];
            break;
          }
        }
      } else {
        el = el[0];
      }

      el.folder = result.params.targetFolder;

      this.ms.unlock();

      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, timeout: 5000, type: 'danger'});
        return;
      }
    };
  }

  private processError(result): boolean {
    if (result.error && typeof result.error !== 'boolean') {
      console.log(result.error);
      this.ms.sendMessage(ALERT, {message: result.error, timeout: 5000, type: 'danger'});
      return true;
    }

    if (result.error && typeof result.error === 'boolean' && result.transData) {
      console.log(result.error);
      this.ms.sendMessage(ALERT, {message: result.transData, timeout: 5000, type: 'danger'});
      return true;
    }

    return false;
  }
}
