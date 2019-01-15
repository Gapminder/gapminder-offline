import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { AppConfig } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { langConfigTemplate } from '../lang-config';
import { LocalizationService } from './providers/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService, public translate: TranslateService, public ls: LocalizationService) {
    if (!electronService.isElectron()) {
      console.log('AppConfig', AppConfig);
      console.log('Mode web');
    }

    translate.addLangs(langConfigTemplate.map(lang => lang.id));
    translate.setDefaultLang(ls.currentLanguage.id);
  }
}
