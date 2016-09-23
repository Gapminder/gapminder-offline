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
import {PresetsFormComponent} from './components/presets-form';
import {PresetService} from './components/preset-service';
import {AboutFormComponent} from './components/about-form';

let template = require('./app.html');

declare var electron: any;

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
    DdfFolderFormComponent, PresetsFormComponent, AboutFormComponent, VIZABI_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  template: template
})
export class AppComponent implements OnInit {
  public tabs: Tab[] = [];
  public status: {isMenuOpen: boolean} = {isMenuOpen: false};

  @ViewChild('ddfModal') public ddfModal: ModalDirective;
  @ViewChild('presetsModal') public presetsModal: ModalDirective;
  @ViewChild('aboutModal') public aboutModal: ModalDirective;

  private readerModuleObject: any;
  private readerGetMethod: string;
  private readerParams: Array<any>;
  private readerName: string;
  private extResources: any;

  constructor(private viewContainerRef: ViewContainerRef,
              private ddfFolderForm: DdfFolderFormComponent) {
    electron.ipcRenderer.send('get-app-path');
  }

  ngOnInit() {
    let processed = false;

    electron.ipcRenderer.on('got-app-path', (event, path) => {
      this.ddfFolderForm.electronPath = path;

      if (!processed) {
        this.readerModuleObject = this.ddfFolderForm.getDdfCsvReaderObject();
        this.readerGetMethod = 'getDDFCsvReaderObject';
        this.readerParams = [this.ddfFolderForm.fileReader];
        this.readerName = 'ddf1-csv-ext';
        this.extResources = {
          host: this.ddfFolderForm.ddfUrl,
          preloadPath: 'preview-data/'
        };
        this.newChart();

        processed = true;
      }
    });
  }

  private presetsFormComplete(event) {
    this.presetsModal.hide();
  }

  private ddfFolderFormComplete(event) {
    this.ddfModal.hide();

    if (event.ddfFolderForm) {
      this.newChart(false, event.ddfFolderForm);
    }
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
      tab.translations = ddfFolderForm.translations;

      this.tabs.forEach(tab => tab.active = false);
      this.tabs.push(tab);
    });
  }

  private forceResize() {
    setTimeout(function () {
      var event: any = document.createEvent('HTMLEvents');

      event.initEvent('resize', true, true);
      event.eventName = 'resize';
      window.dispatchEvent(event);
    }, 10);
  }
}

bootstrap(AppComponent, [
  DdfFolderFormComponent,
  PresetsFormComponent,
  PresetService,
  AboutFormComponent
]).catch(err => console.error(err));
