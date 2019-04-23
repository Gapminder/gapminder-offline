import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ElectronService } from './providers/electron.service';

@Injectable()
export class MessageService {
  private subject$ = new Subject();
  private lock$: Subject<void>;
  private globConst;

  constructor(private es: ElectronService) {
    this.globConst = es.remote.getGlobal('globConst');
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_ADDED, () => this.unlock());
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_REMOVED, () => this.unlock());
    this.es.ipcRenderer.on(this.globConst.BOOKMARKS_FOLDER_CREATED, () => this.unlock());
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_FOLDER_UPDATED, () => this.unlock());
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_FOLDER_REMOVED, () => this.unlock());
    this.es.ipcRenderer.on(this.globConst.BOOKMARK_UPDATED, () => this.unlock());
  }

  sendMessage(message: string, options?: any) {
    // if (!this.lock$) {
    this.subject$.next({message, options});
    /*} else {
      this.lock$.asObservable().subscribe(() => {
        this.subject$.next({message, options});
      });
    }*/
  }

  clearMessage() {
    this.subject$.next();
  }

  lock() {
    if (!this.lock$) {
      this.lock$ = new Subject();
    }
  }

  unlock() {
    if (this.lock$) {
      this.lock$.next();
      this.lock$.complete();
      this.lock$ = null;
    }
  }

  isLocked(): boolean {
    return !!this.lock$;

  }

  getMessage(): Observable<any> {
    return this.subject$.asObservable();
  }
}
