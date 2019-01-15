import { Injectable } from '@angular/core';
import { ILang, langConfigTemplate } from '../../lang-config';

@Injectable()
export class LocalizationService {
  currentLanguage: ILang;
  langConfig = langConfigTemplate;

  constructor() {
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

  getLanguageById(langId: string): ILang {
    for (const currentLang of langConfigTemplate) {
      if (currentLang.id === langId) {
        return currentLang;
      }
    }

    throw new Error(`Language ${langId} is NOT found!`);
  }
}
