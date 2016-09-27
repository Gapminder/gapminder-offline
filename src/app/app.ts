import {NgModule, Component, OnInit, ViewChild, ViewContainerRef, ElementRef} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ModalDirective} from 'ng2-bootstrap/components/modal/modal.component';
import {DdfFolderFormComponent} from './components/ddf-folder-form';
import {PresetsFormComponent} from './components/presets-form';
import {PresetService} from './components/preset-service';
import {AboutFormComponent} from './components/about-form';
import {VIZABI_DIRECTIVES} from 'ng2-vizabi/ng2-vizabi';

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
  template: `
<div>
    <div class="header">
        <a class="header-title" href="http://www.gapminder.org">
            GAPMINDER TOOLS
        </a>

        <div class="ddf-menu" style="margin-top: 5px; margin-right: 10px;">
            <div class="btn-group" dropdown [(isOpen)]="status.isMenuOpen">
                <button id="single-button"
                        type="button"
                        class="btn btn-default"
                        dropdownToggle
                        [disabled]="disabled">
                    Choose Option <span class="caret"></span>
                </button>
                <ul dropdownMenu role="menu" aria-labelledby="single-button">
                    <li role="menuitem">
                        <a class="dropdown-item"
                           href="#"
                           (click)="aboutModal.show()">About</a></li>
                    <li class="divider dropdown-divider"></li>
                    <li role="menuitem">
                        <a class="dropdown-item"
                           href="#"
                           (click)="ddfModal.show()">Custom DDF folder
                        </a>
                    </li>
                    <li role="menuitem">
                        <a class="dropdown-item"
                           href="#"
                           (click)="presetsModal.show()">Presets
                        </a>
                    </li>
                    <li role="menuitem">
                        <a class="dropdown-item"
                           href="#"
                           (click)="newChart()">New chart
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <tabset *ngIf="tabs.length > 0">
        <tab *ngFor="let tab of tabs"
             heading="Chart {{tab.order}}"
             [active]="tab.active"
             (select)="tab.active = true; forceResize();"
             (deselect)="tab.active = false"
             [removable]="tab.removable">
            <div style="height: 600px">
                <vizabi style="height: 100%"
                        [readerModuleObject]="readerModuleObject"
                        [readerGetMethod]="readerGetMethod"
                        [readerParams]="readerParams"
                        [readerName]="readerName"
                        [model]="tab.model"
                        [extResources]="extResources"
                        [translations]="tab.translations"
                        [chartType]="tab.chartType"></vizabi>
            </div>
        </tab>
    </tabset>
</div>

<div bsModal
     #ddfModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="DDF folder settings"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="ddfModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">DDF folder settings</h4>
            </div>
            <div class="modal-body">
                <ae-ddf-folder-form (done)="ddfFolderFormComplete($event)"></ae-ddf-folder-form>
            </div>
        </div>
    </div>
</div>

<div bsModal
     #presetsModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="Presets"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="presetsModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Presets</h4>
            </div>
            <div class="modal-body">
                <ae-presets-form (done)="presetsFormComplete($event)"></ae-presets-form>
            </div>
        </div>
    </div>
</div>

<div bsModal
     #aboutModal="bs-modal"
     class="modal fade"
     tabindex="-1"
     role="dialog"
     aria-labelledby="About"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="aboutModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">About</h4>
            </div>
            <div class="modal-body">
                <ae-about-form (done)="aboutFormComplete()"></ae-about-form>
            </div>
        </div>
    </div>
</div>
`
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

  constructor(private viewContainerRef: ViewContainerRef, private ddfFolderForm: DdfFolderFormComponent) {
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

@NgModule({
  declarations: [
    AppComponent,
    DdfFolderFormComponent,
    PresetsFormComponent,
    AboutFormComponent,
    VIZABI_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2BootstrapModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: PresetService, useClass: PresetService},
    DdfFolderFormComponent,
    PresetsFormComponent,
    AboutFormComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
