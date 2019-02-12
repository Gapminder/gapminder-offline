import { Injectable } from '@angular/core';
import { ILang, langConfigTemplate } from '../../lang-config';
import { ElectronService } from './electron.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LocalizationService {
  currentLanguage: ILang;
  langConfig = langConfigTemplate;

  constructor(private es: ElectronService, private translate: TranslateService) {
    this.currentLanguage = this.getDefaultLanguage();
  }

  isRtl(): boolean {
    return !!this.currentLanguage.rtl;
  }

  isLanguageValid(lang: string): boolean {
    for (const currentLang of langConfigTemplate) {
      if (currentLang.id === lang) {
        return true;
      }
    }

    return false;
  }

  getDefaultLanguage(): ILang {
    for (const currentLang of langConfigTemplate) {
      if (currentLang.default) {
        return currentLang;
      }
    }

    throw new Error('Default language is missing');
  }

  getLanguagePrefix() {
    return this.currentLanguage.id.split('-')[0];
  }

  getLanguageById(langId: string): ILang {
    for (const currentLang of langConfigTemplate) {
      if (currentLang.id === langId) {
        return currentLang;
      }
    }

    throw new Error(`Language ${langId} is NOT found!`);
  }

  setLanguage(lang: ILang) {
    this.currentLanguage = lang;
    this.translate.setDefaultLang(this.currentLanguage.id);
  }

  restoreCurrentLanguage() {
    this.settingsOperation(settings => {
      if (settings.language && !this.isLanguageValid(settings.language)) {
        alert(`Wrong or unsupported language ${settings.language}! Please correct or remove "${this.es.SETTINGS_FILE}"`);
      }

      if (!settings.language || !this.isLanguageValid(settings.language)) {
        settings.language = this.getDefaultLanguage().id;
      }

      this.setLanguage(this.getLanguageById(settings.language));
    });
  }

  settingsOperation(whatShouldIDo: Function) {
    try {
      whatShouldIDo(this.es.readSettings());
    } catch (e) {
      alert(`Error in settings! Please correct or remove "${this.es.SETTINGS_FILE}"`);
    }
  }
}
