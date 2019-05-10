import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { LocalizationService } from '../../providers/localization.service';
import { ALERT, BOOKMARKS_PANE_OFF_OUTSIDE, SWITCH_BOOKMARKS_PANE } from '../../constants';
import { MessageService } from '../../message.service';

const BOOKMARKS_THUMBNAILS_FOLDER = 'bookmarks-thumbnails';

@Component({
  selector: 'app-bookmarks-pane',
  templateUrl: './bookmarks-pane.component.html',
  styleUrls: ['./bookmarks-pane.component.css']
})
export class BookmarksPaneComponent implements OnInit, OnDestroy {
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

  constructor(public ls: LocalizationService, public es: ElectronService, private ms: MessageService) {
    this.globConst = this.es.remote.getGlobal('globConst');
  }

  ngOnInit() {
    this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    this.gotBookmarks = this.onGotBookmarks();
    this.bookmarkRemoved = this.onBookmarkRemoved();
    this.bookmarkAdded = this.onBookmarkAdded();
    this.bookmarksFolderCreated = this.onBookmarksFolderCreated();
    this.bookmarkFolderUpdated = this.onBookmarkFolderUpdated();
    this.bookmarkFolderRemoved = this.onBookmarkFolderRemoved();
    this.bookmarkUpdated = this.onBookmarkUpdated();
    this.es.ipcRenderer.on(this.globConst.GOT_BOOKMARKS, this.gotBookmarks);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_REMOVED, this.bookmarkRemoved);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_ADDED, this.bookmarkAdded);
    this.es.ipcRenderer.on(this.globConst.BOOKMARKS_FOLDER_CREATED, this.bookmarksFolderCreated);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_FOLDER_UPDATED, this.bookmarkFolderUpdated);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_FOLDER_REMOVED, this.bookmarkFolderRemoved);
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_UPDATED, this.bookmarkUpdated);
  }

  ngOnDestroy() {
    this.es.ipcRenderer.removeListener(this.globConst.GOT_BOOKMARKS, this.gotBookmarks);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_REMOVED, this.bookmarkRemoved);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_ADDED, this.bookmarkAdded);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARKS_FOLDER_CREATED, this.bookmarksFolderCreated);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_FOLDER_UPDATED, this.bookmarkFolderUpdated);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_FOLDER_REMOVED, this.bookmarkFolderRemoved);
    this.es.ipcRenderer.removeListener(this.globConst.BOOKMARK_UPDATED, this.bookmarkUpdated);
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

  removeFolder(folder) {
    this.es.ipcRenderer.send(this.globConst.REMOVE_BOOKMARKS_FOLDER, {folderName: folder.name});
    this.ms.lock();
  }

  createNewBookmarksFolder() {
    this.es.ipcRenderer.send(this.globConst.CREATE_NEW_BOOKMARKS_FOLDER, {folder: this.newBookmarksFolder});
    this.ms.lock();
  }

  resetFolderForm() {
    this.isNewBookmarksFolderFormVisible = false;
    this.newBookmarksFolder = '';
  }

  switchFolderEditMode(folders, folder) {
    for (const f of folders) {
      f.editMode = false;
    }
    folder.editMode = !folder.editMode;

    if (folder.editMode) {
      folder.tmpName = folder.name;
    }
  }

  saveFolder(folder) {
    this.es.ipcRenderer.send(this.globConst.UPDATE_BOOKMARKS_FOLDER, {oldFolderName: folder.name, newFolderName: folder.tmpName});
    this.ms.lock();
  }

  cancelFolder(folder) {
    folder.editMode = false;
    folder.tmpName = folder.name;
  }

  onBookmarkFolderChange(event, bookmark) {
    bookmark.folder = event.target.value;
  }

  isLocked(): boolean {
    return this.ms.isLocked();
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

  private areBookmarksPresent(): boolean {
    const unCategorizedBookmarksPresent = this.unCategorizedBookmarks.length > 0;
    let bookmarksByFolderPresent = false;

    for (const folder of this.bookmarksFolders) {
      if (this.bookmarksByFolder[folder.name] && this.bookmarksByFolder[folder.name].length > 0) {
        bookmarksByFolderPresent = true;
      }
    }

    return unCategorizedBookmarksPresent || bookmarksByFolderPresent;
  }

  private onGotBookmarks() {
    return (event, result) => {
      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
      }
      this.bookmarksByFolder = {};
      this.unCategorizedBookmarks = [];

      for (const bookmark of result.data.content) {
        bookmark.tmpName = bookmark.name;
        bookmark.image = this.es.path.resolve(this.es.userDataPath, BOOKMARKS_THUMBNAILS_FOLDER, `${bookmark.id}.png`);
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

      this.bookmarksFolders = result.data.folders.map(folderName => ({
        name: folderName,
        tmpName: folderName,
        editMode: false,
        collapsed: false
      }));

      if (this.needToFullnessCheck && !this.areBookmarksPresent()) {
        this.ms.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false, dontRestoreTab: true});
        this.ms.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
      }

      this.needToFullnessCheck = false;
    };
  }

  private onBookmarkRemoved() {
    return (event, result) => {
      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
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

      this.needToFullnessCheck = true;
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkAdded() {
    return (event, result) => {
      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
      }
    };
  }

  private onBookmarksFolderCreated() {
    return (event, result) => {
      if (result.error) {
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
        return;
      }

      this.newBookmarksFolder = '';
      this.isNewBookmarksFolderFormVisible = false;
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkFolderUpdated() {
    return (event, result) => {
      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
        return;
      }

      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkFolderRemoved() {
    return (event, result) => {
      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
        return;
      }

      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }

  private onBookmarkUpdated() {
    return () => {
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    };
  }
}
