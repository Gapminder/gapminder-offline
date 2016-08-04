import {enableProdMode, OnInit, ViewChild} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, ViewContainerRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {
  TAB_DIRECTIVES,
  DROPDOWN_DIRECTIVES,
  MODAL_DIRECTIVES,
  BS_VIEW_PROVIDERS
} from 'ng2-bootstrap/ng2-bootstrap';
import {ModalDirective} from 'ng2-bootstrap/components/modal/modal.component';
import {DdfFolderFormComponent} from './components/ddf-folder-form';
import {AboutFormComponent} from './components/about-form';

let template = require('./app.html');

class Tab {
  public content: string;
  public order: number;
  public active: boolean;
  public removable: boolean = true;

  constructor(private query: any, order: number, active: boolean = false) {
    this.order = order + 1;
    this.active = active;

    if (order === 0) {
      this.removable = false;
    }

    this.content = JSON.stringify(query);
  }
}

@Component({
  selector: 'ae-app',
  directives: [CORE_DIRECTIVES, TAB_DIRECTIVES, DROPDOWN_DIRECTIVES, MODAL_DIRECTIVES,
    DdfFolderFormComponent, AboutFormComponent],
  viewProviders: [BS_VIEW_PROVIDERS],
  template: template
})
export class AppComponent implements OnInit {
  public tabs: Tab[] = [];
  public status: {isMenuOpen: boolean} = {isMenuOpen: false};

  @ViewChild('ddfModal') public ddfModal: ModalDirective;
  @ViewChild('aboutModal') public aboutModal: ModalDirective;

  private viewContainerRef: ViewContainerRef;

  constructor(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
  }

  ddfFolderFormComplete(eventData) {
    this.ddfModal.hide();

    if (eventData.query) {
      this.tabs.forEach(tab => tab.active = false);
      this.tabs.push(new Tab(eventData.query, this.tabs.length, true));
    }
  }

  aboutFormComplete() {
    this.aboutModal.hide();
  }
}

bootstrap(AppComponent, [
  DdfFolderFormComponent,
  AboutFormComponent
]).catch(err => console.error(err));
