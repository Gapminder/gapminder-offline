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
import {VIZABI_DIRECTIVES} from 'ng2-vizabi';
import {ModalDirective} from 'ng2-bootstrap/components/modal/modal.component';
import {DdfFolderFormComponent} from './components/ddf-folder-form';
import {AboutFormComponent} from './components/about-form';

let template = require('./app.html');

function forceResize() {
  setTimeout(function () {
    var event: any = document.createEvent('HTMLEvents');

    event.initEvent('resize', true, true);
    event.eventName = 'resize';
    window.dispatchEvent(event);
  }, 10);
}

class Tab {
  public order: number;
  public active: boolean;
  public removable: boolean = true;

  public model: any;
  public metadata: any;
  public translations: any;

  constructor(public chartType: string, order: number, active: boolean = false) {
    this.order = order + 1;
    this.active = active;

    if (order === 0) {
      this.removable = false;
    }
  }
}

@Component({
  selector: 'ae-app',
  directives: [CORE_DIRECTIVES, TAB_DIRECTIVES, DROPDOWN_DIRECTIVES, MODAL_DIRECTIVES,
    DdfFolderFormComponent, AboutFormComponent, VIZABI_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  template: template
})
export class AppComponent implements OnInit {
  public tabs: Tab[] = [];
  public status: {isMenuOpen: boolean} = {isMenuOpen: false};

  @ViewChild('ddfModal') public ddfModal: ModalDirective;
  @ViewChild('aboutModal') public aboutModal: ModalDirective;

  private readerModuleObject: any;
  private readerGetMethod: string;
  private readerParams: Array<any>;
  private readerName: string;

  constructor(private viewContainerRef: ViewContainerRef,
              private ddfFolderForm: DdfFolderFormComponent) {
  }

  ngOnInit() {
    this.readerModuleObject = this.ddfFolderForm.getDdfCsvReaderObject();
    this.readerGetMethod = 'getDDFCsvReaderObject';
    this.readerParams = [this.ddfFolderForm.fileReader];
    this.readerName = 'ddf1-csv-ext';
    this.newChart();
  }

  private ddfFolderFormComplete(event) {
    this.ddfModal.hide();
    this.newChart(false, event.ddfFolderForm);
  }

  private aboutFormComplete() {
    this.aboutModal.hide();
  }

  private newChart(isDefaults = true, ddfFolderForm = this.ddfFolderForm) {
    if (isDefaults) {
      ddfFolderForm.defaults();
    }

    ddfFolderForm.loadMeasures(ddfSettingsError => {
      if (ddfSettingsError) {
        return;
      }

      const tab = new Tab(ddfFolderForm.ddfChartType, this.tabs.length, true);

      tab.model = ddfFolderForm.getQuery();
      tab.metadata = ddfFolderForm.metadataContent;
      tab.translations = ddfFolderForm.translationsContent;

      this.tabs.forEach(tab => tab.active = false);
      this.tabs.push(tab);

      setTimeout(() => {
        forceResize();
      }, 3000);
    });
  }
}

bootstrap(AppComponent, [
  DdfFolderFormComponent,
  AboutFormComponent
]).catch(err => console.error(err));
