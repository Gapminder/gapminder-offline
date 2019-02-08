import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private subject$ = new Subject();
  private lock$: Subject<void>;

  sendMessage(message: string, options?: any) {
    if (!this.lock$) {
      this.subject$.next({message, options});
    } else {
      this.lock$.asObservable().subscribe(() => {
        this.subject$.next({message, options});
      });
    }
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

  getMessage(): Observable<any> {
    return this.subject$.asObservable();
  }
}
