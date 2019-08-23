import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { MessageService } from '../../message.service';

declare var html2canvas;
declare var Whammy;
declare var canvg;

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit, OnDestroy {
  url: string;

  private serviceElementDesc = [
    {src: './lib/html2canvas.js', id: 'c-html2canvas'},
    {src: './lib/whammy.js', id: 'c-whammy'},
    {src: './lib/canvg.js', id: 'canvg'}
  ];
  private video;
  private recordingInt;
  private working = false;
  private q: number;

  constructor(private es: ElectronService, private ms: MessageService) {
  }

  ngOnInit() {
    for (const desc of this.serviceElementDesc) {
      const el = document.createElement('script');
      el.setAttribute('src', desc.src);
      el.setAttribute('id', desc.id);
      document.body.appendChild(el);
    }
  }

  ngOnDestroy() {
    for (const desc of this.serviceElementDesc) {
      const el = document.getElementById(desc.id);

      if (el) {
        el.remove();
      }
    }
  }

  start() {
    this.working = true;
    this.video = new Whammy.Video(1);
    this.q = 0;
    this.recordingInt = setInterval(() => {
      if (!this.working) {
        clearInterval(this.recordingInt);
        return;
      }

      const el: any = document.querySelector('.vzb-placeholder');
      const canv = document.createElement('canvas');
      canv.style.backgroundColor = '#ffffff';

      html2canvas(el, {allowTaint: true, canvas: canv}).then(canvas => {
        const ctx = canvas.getContext('2d');
        this.video.add(ctx);
        if (!this.working) {
          const output = this.video.compile();
          const fs = require('fs');

          const reader = new FileReader();

          reader.onload = function (e) {
            fs.writeFileSync('/home/vs/foo.webm', reader.result, 'binary');
          };

          reader.readAsBinaryString(output);
          clearInterval(this.recordingInt);
          el.remove();
        }
      });
    }, 1000);
  }

  stop() {
    this.working = false;
  }
}
