import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule, ProgressbarModule, AlertModule } from 'ngx-bootstrap';

import { HamburgerMenuComponent } from './components/menu/hamburger-menu.component';
import { ChartService } from './components/tabs/chart.service';
import { MessageService } from './message.service';
import { AdditionalDataComponent } from './components/additional-data/additional-data.component';
import { VersionsFormComponent } from './components/versions-form/versions-form.component';
import { ValidationFormComponent } from './components/validation-form/validation-form.component';
import { DdfDatasetConfigFormComponent } from './components/ddf-dataset-config-form/ddf-dataset-config-form.component';
import { CsvConfigFormComponent } from './components/csv-config-form/csv-config-form.component';
import { VizabiModule } from 'ng2-vizabi';

import { AutoUpdateComponent } from './components/auto-update/auto-update.component';
import { TabsNewComponent } from './components/tabs-new/tabs.component';
import { TabNewComponent } from './components/tabs-new/tab.component';
import { TabTitleEditComponent } from './components/tabs-new/tab-title-edit.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SmartPathSelectorComponent } from './components/smart-path-selector/smart-path-selector.component';
import { AppComponent } from './app.component';
import { FreshenerService } from './components/tab-freshener/freshener.service';
import { TabFreshenerComponent } from './components/tab-freshener/tab-freshener.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoUpdateComponent,
    TabFreshenerComponent,
    HamburgerMenuComponent,
    AdditionalDataComponent,
    VersionsFormComponent,
    ValidationFormComponent,
    DdfDatasetConfigFormComponent,
    CsvConfigFormComponent,
    TabsNewComponent,
    TabNewComponent,
    TabTitleEditComponent,
    TabsComponent,
    SmartPathSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    ReactiveFormsModule,
    VizabiModule
  ],
  providers: [
    {provide: ChartService, useClass: ChartService},
    {provide: MessageService, useClass: MessageService},
    {provide: FreshenerService, useClass: FreshenerService}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
