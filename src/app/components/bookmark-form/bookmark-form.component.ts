import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MessageService } from '../../message.service';
import { SEND_ACTIVE_TAB } from '../../constants';
import { ElectronService } from '../../providers/electron.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css']
})
export class BookmarkFormComponent implements OnDestroy {
  @Output() done: EventEmitter<any> = new EventEmitter();
  bookmark = {
    name: '',
    content: {
      chartType: '',
      model: null
    }
  };
  errorDesc: { error, bookmarkFile: string } = null;
  subscription: Subscription;

  constructor(private ms: MessageService, private es: ElectronService) {
    this.subscription = this.ms.getMessage().subscribe((event: any) => {
      if (event.message === SEND_ACTIVE_TAB) {
        this.errorDesc = null;
        this.bookmark.content.model = event.options.model;
        this.bookmark.content.chartType = event.options.chartType;
        this.bookmark.name = this.getInitialName(this.bookmark.content.chartType, this.bookmark.content.model);
      }
    });
    this.es.ipcRenderer.on('bookmark-added', () => {
      this.close();
    });
    this.es.ipcRenderer.on('bookmark-not-added', (event, result) => {
      this.errorDesc = result;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.done.emit();
  }

  ok() {
    this.es.ipcRenderer.send('add-bookmark', {bookmark: this.bookmark});
  }

  private getInitialName(chartType: string, model): string {
    let name = `${chartType}-x_${model.state.marker.axis_x.which}-y_${model.state.marker.axis_y.which}`;


    if (model.state.marker.select && model.state.marker.select.length > 0) {
      name = name + '-' + model.state.marker.select.map(item => `${Object.values(item).join('_')}`).join('-');
    }

    return name;
  }
}
