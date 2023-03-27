import 'zone.js/mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from './directives/webview.directive';
import { VizabiDirective } from './directives/vizabi';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AutoUpdateComponent } from './components/auto-update/auto-update.component';
import { TabFreshenerComponent } from './components/tab-freshener/tab-freshener.component';
import { HamburgerMenuComponent } from './components/menu/hamburger-menu.component';
import { ValidationFormComponent } from './components/validation-form/validation-form.component';
import { DdfDatasetConfigFormComponent } from './components/ddf-dataset-config-form/ddf-dataset-config-form.component';
import { FileSelectConfigFormComponent } from './components/file-select-config-form/file-select-config-form.component';
import { TabsNewComponent } from './components/tabs-new/tabs.component';
import { TabNewComponent } from './components/tabs-new/tab.component';
import { TabTitleEditComponent } from './components/tabs-new/tab-title-edit.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SmartPathSelectorComponent } from './components/smart-path-selector/smart-path-selector.component';
import { WaitIndicatorComponent } from './components/wait-indicator/wait-indicator.component';
import { ChartService } from './components/tabs/chart.service';
import { MessageService } from './message.service';
import { FreshenerService } from './components/tab-freshener/freshener.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalizationService } from './providers/localization.service';
import { BookmarksPaneComponent } from './components/bookmarks-pane/bookmarks-pane.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { RecorderComponent } from './components/recorder/recorder.component';
import { RecordingPopupComponent } from './components/recorder/recording-popup.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookmarksPaneComponent,
    BookmarkFormComponent,
    AutoUpdateComponent,
    TabFreshenerComponent,
    HamburgerMenuComponent,
    ValidationFormComponent,
    DdfDatasetConfigFormComponent,
    FileSelectConfigFormComponent,
    TabsNewComponent,
    TabNewComponent,
    TabTitleEditComponent,
    TabsComponent,
    SmartPathSelectorComponent,
    WaitIndicatorComponent,
    RecorderComponent,
    RecordingPopupComponent,
    WebviewDirective,
    VizabiDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragulaModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    ChartService,
    MessageService,
    FreshenerService,
    TranslateService,
    LocalizationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
