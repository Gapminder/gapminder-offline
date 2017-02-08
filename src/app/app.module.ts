import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule, ProgressbarModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { HamburgerMenuComponent } from './components/menu/hamburger-menu.component';
import { ChartService } from './components/tabs/chart.service';
import { AdditionalDataComponent } from './components/additional-data/additional-data.component';
import { VersionsFormComponent } from './components/versions-form/versions-form.component';
import { CsvConfigFormComponent } from './components/csv-config-form/csv-config-form.component';
import { VizabiModule } from 'ng2-vizabi';

import { AutoUpdateComponent } from './components/auto-update/auto-update.component';
import { TabsNewComponent } from './components/tabs-new/tabs.component';
import { TabNewComponent } from './components/tabs-new/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoUpdateComponent,
    HamburgerMenuComponent,
    AdditionalDataComponent,
    VersionsFormComponent,
    CsvConfigFormComponent,
    TabsNewComponent,
    TabNewComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    Ng2BootstrapModule,
    ReactiveFormsModule,
    VizabiModule
  ],
  providers: [
    {provide: ChartService, useClass: ChartService},
    AutoUpdateComponent,
    HamburgerMenuComponent,
    AdditionalDataComponent,
    VersionsFormComponent,
    CsvConfigFormComponent,
    TabsNewComponent,
    TabNewComponent,
    TabsComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
