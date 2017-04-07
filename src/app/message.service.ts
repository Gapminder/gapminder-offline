import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private subject: Subject<any> = new Subject<any>();

  public sendMessage(message: string, options?: any): void {
    this.subject.next({message, options});
  }

  public clearMessage(): void {
    this.subject.next();
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
