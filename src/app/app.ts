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

  private ddfFolderFormComplete(eventData) {
    this.ddfModal.hide();

    if (eventData.query) {
      this.tabs.forEach(tab => tab.active = false);
      this.tabs.push(new Tab(eventData.query, this.tabs.length, true));
    }
  }

  private aboutFormComplete() {
    this.aboutModal.hide();
  }

  private newChart() {
    this.ddfFolderForm.defaults();
    this.ddfFolderForm.loadMeasures(ddfSettingsError => {
      if (ddfSettingsError) {
        return;
      }

      const tab = new Tab(this.ddfFolderForm.ddfChartType, this.tabs.length, true);

      tab.model = this.ddfFolderForm.getQuery();
      tab.metadata = this.ddfFolderForm.metadataContent;
      tab.translations = this.ddfFolderForm.translationsContent;

      this.tabs.forEach(tab => tab.active = false);
      this.tabs.push(tab);
    });
  }
}

bootstrap(AppComponent, [
  DdfFolderFormComponent,
  AboutFormComponent
]).catch(err => console.error(err));
