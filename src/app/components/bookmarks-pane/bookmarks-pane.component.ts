import { Component, OnInit } from '@angular/core';
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
export class BookmarksPaneComponent implements OnInit {
  bookmarksByFolder;
  unCategorizedBookmarks;
  bookmarksFolders;
  isNewBookmarksFolderFormVisible = false;
  newBookmarksFolder = '';
  newFolderName = '';
  folderCreationInProgress = false;
  folderEditRequest = false;
  private globConst;
  private needToFullnessCheck = false;

  constructor(public ls: LocalizationService, public es: ElectronService, private ms: MessageService) {
    this.globConst = this.es.remote.getGlobal('globConst');
  }

  ngOnInit() {
    this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);

    this.es.ipcRenderer.on(this.globConst.GOT_BOOKMARKS, (event, result) => {
      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
      }
      this.bookmarksByFolder = {};
      this.unCategorizedBookmarks = [];

      for (const bookmark of result.data.content) {
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
        editMode: false,
        collapsed: false
      }));

      if (this.needToFullnessCheck && !this.areBookmarksPresent()) {
        this.ms.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false, dontRestoreTab: true});
        this.ms.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
      }

      this.needToFullnessCheck = false;
    });

    this.es.ipcRenderer.on(this.globConst.BOOKMARK_REMOVED, (event, result) => {
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
    });

    this.es.ipcRenderer.on(this.globConst.BOOKMARK_ADDED, (event, result) => {
      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
      }
    });

    this.es.ipcRenderer.on(this.globConst.BOOKMARKS_FOLDER_CREATED, (event, result) => {
      this.folderCreationInProgress = false;

      if (result.error) {
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
        return;
      }

      this.newBookmarksFolder = '';
      this.isNewBookmarksFolderFormVisible = false;
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    });

    this.es.ipcRenderer.on(this.globConst.BOOKMARK_FOLDER_UPDATED, (event, result) => {
      this.folderEditRequest = false;

      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
        return;
      }

      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    });

    this.es.ipcRenderer.on(this.globConst.BOOKMARK_FOLDER_REMOVED, (event, result) => {
      this.folderEditRequest = false;

      if (result.error) {
        console.log(result.error);
        this.ms.sendMessage(ALERT, {message: result.error, type: 'danger'});
        return;
      }

      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    });

    this.es.ipcRenderer.on(this.globConst.BOOKMARK_UPDATED, () => {
      this.es.ipcRenderer.send(this.globConst.GET_BOOKMARKS);
    });
  }

  open(event, bookmark) {
    event.preventDefault();
    event.stopPropagation();
    this.ms.sendMessage(SWITCH_BOOKMARKS_PANE, {isBookmarkPaneVisible: false, dontRestoreTab: true});
    this.ms.sendMessage(BOOKMARKS_PANE_OFF_OUTSIDE);
    this.es.ipcRenderer.send(this.globConst.OPEN_BOOKMARK, bookmark);
  }

  remove(event, bookmark) {
    event.preventDefault();
    event.stopPropagation();
    this.es.ipcRenderer.send(this.globConst.REMOVE_BOOKMARK, {bookmark});
    this.ms.lock();
    bookmark.removeRequest = true;
  }

  edit(event, bookmark) {
    event.preventDefault();
    event.stopPropagation();
    bookmark.editMode = !bookmark.editMode;
  }

  save(event, bookmark) {
    event.preventDefault();
    event.stopPropagation();
    this.es.ipcRenderer.send(this.globConst.UPDATE_BOOKMARK, {bookmark});
    this.ms.lock();
    bookmark.editMode = false;
  }

  cancel(event, bookmark) {
    event.preventDefault();
    event.stopPropagation();
    bookmark.editMode = false;
  }

  removeFolder(event, folder) {
    event.preventDefault();
    event.stopPropagation();
    this.folderEditRequest = true;
    this.es.ipcRenderer.send(this.globConst.REMOVE_BOOKMARKS_FOLDER, {folderName: folder.name});
    this.ms.lock();
  }

  createNewBookmarksFolder() {
    this.es.ipcRenderer.send(this.globConst.CREATE_NEW_BOOKMARKS_FOLDER, {folder: this.newBookmarksFolder});
    this.ms.lock();
    this.folderCreationInProgress = true;
  }

  resetFolderForm() {
    this.isNewBookmarksFolderFormVisible = false;
    this.newBookmarksFolder = '';
  }

  switchFolderEditMode(folder) {
    folder.editMode = !folder.editMode;

    if (folder.editMode) {
      this.newFolderName = folder.name;
    }
  }

  saveFolder(event, folder) {
    event.preventDefault();
    event.stopPropagation();
    this.folderEditRequest = true;
    this.es.ipcRenderer.send(this.globConst.UPDATE_BOOKMARKS_FOLDER, {oldFolderName: folder.name, newFolderName: this.newFolderName});
    this.ms.lock();
  }

  onBookmarkFolderChange(event, bookmark) {
    bookmark.folder = event.target.value;
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
}
