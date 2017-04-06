import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule, AlertModule, ProgressbarModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { HamburgerMenuComponent } from './components/menu/hamburger-menu.component';
import { ChartService } from './components/tabs/chart.service';
import { MessageService } from './message.service';
import { AdditionalDataComponent } from './components/additional-data/additional-data.component';
import { VersionsFormComponent } from './components/versions-form/versions-form.component';
import { DdfDatasetConfigFormComponent } from './components/ddf-dataset-config-form/ddf-dataset-config-form.component';
import { CsvConfigFormComponent } from './components/csv-config-form/csv-config-form.component';
import { VizabiModule } from 'ng2-vizabi';

import { AutoUpdateComponent } from './components/auto-update/auto-update.component';
import { TabsNewComponent } from './components/tabs-new/tabs.component';
import { TabNewComponent } from './components/tabs-new/tab.component';
import { TabTitleEditComponent } from './components/tabs-new/tab-title-edit.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoUpdateComponent,
    HamburgerMenuComponent,
    AdditionalDataComponent,
    VersionsFormComponent,
    DdfDatasetConfigFormComponent,
    CsvConfigFormComponent,
    TabsNewComponent,
    TabNewComponent,
    TabTitleEditComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    Ng2BootstrapModule,
    ReactiveFormsModule,
    VizabiModule
  ],
  providers: [
    {provide: ChartService, useClass: ChartService},
    {provide: MessageService, useClass: MessageService},
    AutoUpdateComponent,
    HamburgerMenuComponent,
    AdditionalDataComponent,
    VersionsFormComponent,
    DdfDatasetConfigFormComponent,
    CsvConfigFormComponent,
    TabsNewComponent,
    TabNewComponent,
    TabTitleEditComponent,
    TabsComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
