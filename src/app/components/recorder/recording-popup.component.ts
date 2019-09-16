import { Component, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { LocalizationService } from '../../providers/localization.service';

/*
full solution here: https://embed.plnkr.co/plunk/AoaK7z
 */

@Component({
  selector: 'app-recording-popup',
  templateUrl: './recording-popup.component.html',
  styleUrls: ['./recording-popup.component.css']
})
export class RecordingPopupComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();
  mousemoveEvent;
  mouseupEvent;

  firstPopupX = 700;
  firstPopupY = 0;
  firstPopupZ = 9999;
  curX: number;
  curY: number;
  curZIndex: number;
  xStartElementPoint: number;
  yStartElementPoint: number;
  xStartMousePoint: number;
  yStartMousePoint: number;
  mouseup;
  dragging;
  show = false;

  constructor(public ls: LocalizationService,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
    this.mouseup = this.unboundMouseup.bind(this);
    this.dragging = this.unboundDragging.bind(this);
  }

  appear() {
    if (!this.show) {
      this.firstPopupX = this.ls.isRtl() ? 150 : 700;
      document.getSelection().removeAllRanges();
      this.setPos();
      this.show = true;
    }
  }

  disappear() {
    if (this.show) {
      this.show = false;
      this.close.emit();
    }
  }

  setPos() {
    this.curX = this.firstPopupX;
    this.curY = this.firstPopupY;
    this.curZIndex = this.firstPopupZ;
  }

  unboundMouseup(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.mousemoveEvent();
    this.mouseupEvent();
  }

  mousedown(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.button === 0/*only left mouse click*/) {
      this.xStartElementPoint = this.curX;
      this.yStartElementPoint = this.curY;
      this.xStartMousePoint = event.pageX;
      this.yStartMousePoint = event.pageY;

      if (this.mousemoveEvent) {
        this.mousemoveEvent();
      }

      if (this.mouseupEvent) {
        this.mouseupEvent();
      }

      this.mousemoveEvent = this.renderer.listen('document', 'mousemove', this.dragging);
      this.mouseupEvent = this.renderer.listen('document', 'mouseup', this.mouseup);
    }
  }

  unboundDragging(event: any) {
    const x = this.xStartElementPoint + (event.pageX - this.xStartMousePoint);
    const y = this.yStartElementPoint + (event.pageY - this.yStartMousePoint);

    if (x + 50 < window.innerWidth && x > 0 && y + 20 < window.innerHeight && y > 0) {
      this.curX = x;
      this.curY = y;
    }
  }
}
