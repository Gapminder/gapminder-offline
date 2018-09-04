import * as path from 'path';
import { ElementFinder, browser, element, By, ExpectedConditions as EC } from 'protractor';
import { _$, _$$, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitForSpinner } from '../../helpers/helper';
import { waitUntil } from '../../helpers/waitHelper';
import { CommonChartPage } from '../charts/common-chart.po';

export class Header {
  private isDesktop: boolean = browser.params.desktop;

  public mainMenuBtn: ExtendedElementFinder = _$$('.main-menu-btn').first();
  public mainMenu: ElementFinder = _$$('.menu.show-menu').first();
  public mainMenuItem: ElementFinder = this.mainMenu.$$('.menu-item.submenu').first();
  public newChart: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('.menu-btn', 'New chart')).first());
  public chartFromYourData: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('.menu-btn', 'Your data')).first());
  public csvFile: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('.menu-btn', 'CSV file...')).first());
  public timeGoesDown: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('label', 'Time goes down')).first());
  public timeGoesRight: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('label', 'Time goes right')).first());
  public upload: ExtendedElementFinder = _$$('.file-upload-result').get(1);
  public timeValueSelect: ExtendedElementFinder = _$('select:not(:disabled)');
  public errorMessageIntro: ExtendedElementFinder = _$('.vzb-error-message-intro');

  rootSelector: ExtendedElementFinder = this.isDesktop ? _$('.header') : _$('[class="mobile"]');
  /**
   * Social buttons
   */

  social: ExtendedElementFinder = this.isDesktop ? this.rootSelector._$('.social.desktop') : this.rootSelector._$('.social-list.mobile');
  mailButton: ExtendedElementFinder = this.social._$('.mail.button');
  mailLink: ExtendedElementFinder = this.social._$('app-social-buttons > a');
  twitterSocial: ExtendedElementFinder = this.social._$('.twitter.button');
  facebookSocial: ExtendedElementFinder = this.social._$('.facebook.button');
  icoplaneSocial: ExtendedElementFinder = this.social._$('.button.ico-plane');
  icocodeSocial: ExtendedElementFinder = this.social._$('.button.ico-code');
  shareLabel: ExtendedElementFinder = this.social._$('.share-text-box');
  howToButton: ExtendedElementFinder = this.rootSelector._$('#how-to-button');

  howToModal: ExtendedElementFinder = this.isDesktop ? this.rootSelector._$('.how-to-modal') : this.rootSelector._$('.how-to-content');
  chartSwitcherBtn: ExtendedElementFinder = this.rootSelector._$('.chart-switcher');

  /**
   * language switcher
   */
  menuBtn: ExtendedElementFinder = _$('.menu-icon');
  languageSwitcherBtn: ExtendedElementFinder = this.rootSelector._$('.lang-wrapper');
  currentLanguage: ExtendedElementFinder = this.rootSelector._$('.lang-current');
  englishLanguage: ExtendedElementFinder = this.rootSelector._$$('app-language-switcher .selected li').first();
  rtlLanguage: ExtendedElementFinder = this.rootSelector._$$('app-language-switcher .selected li').get(1);
  vimeoIframe: ExtendedElementFinder = this.howToModal._$$('iframe').first();

  public async uploadCsv(absolutePath: string, importFileName: string): Promise<void> {
    const timeOptions = ['day', 'month', 'year', 'week', 'quarter'];
    let timeValue;

    if (importFileName.match('timeformat')) {
      timeValue = importFileName.replace('.csv', '').split('-')
        .filter(el => timeOptions.indexOf(el) > -1)[0];
    }

    await this.mainMenuBtn.safeClick();
    await this.newChart.safeClick();
    await this.chartFromYourData.safeClick();
    await this.csvFile.safeClick();

    importFileName.match(/^timeright/) ? await this.timeGoesRight.safeClick() : await this.timeGoesDown.safeClick();

    await this.timeValueSelect.safeClick();

    if (timeValue) {
      await _$$(`option[value*="${timeValue}"]`).first().safeClick();
    } else {
      await _$$(`option[value*="year"]`).first().click();
      await _$$(`option[value*="year"]`).first().click();
    }

    const parsedPath = path.parse(absolutePath);
    const fileValue = await this.upload.getAttribute('value');

    if (fileValue) {
      await this.upload.safeClear();
      await this.upload.safeClear();
      await browser.wait(EC.textToBePresentInElementValue(this.upload, ''), 15000);
    }

    await this.upload.safeSendKeys(absolutePath);
    await browser.wait(EC.textToBePresentInElementValue(this.upload, parsedPath.base), 15000);
    await _$$('.ok-btn').first().safeClick();
    await waitForSpinner();
  }

  changeLanguageToRtl(): Promise<void> {
    return this.changeLanguage(true);
  }

  changeLanguageToEng(): Promise<void> {
    return this.changeLanguage();
  }

  async changeLanguage(rtl?: boolean): Promise<void> {
    let language: ExtendedElementFinder;
    rtl ? language = this.rtlLanguage : language = this.englishLanguage;

    await this.openOnMobile();

    await this.languageSwitcherBtn.safeClick();
    await language.safeClick();
    await waitForSpinner();
    await this.closeOnMobile();
  }

  async openHowToUsePopup(): Promise<void> {
    await this.openOnMobile();

    await this.howToButton.safeClick();
    await waitUntil(this.howToModal);
  }

  async refreshMailLink(): Promise<string> {
    await this.openOnMobile();

    await this.shareLabel.safeClick();
    await waitUntil(this.mailButton);

    const mailLink = decodeURIComponent(await this.mailLink.getAttribute('href'));
    await this.closeOnMobile();

    return mailLink;
  }

  async clickOnTwitterIcon() {
    await this.openOnMobile();
    await this.twitterSocial.safeClick();
    await this.closeOnMobile();
  }

  async clickOnFacebookIcon() {
    await this.openOnMobile();
    await this.facebookSocial.safeClick();
    await this.closeOnMobile();
  }

  async openOnMobile(): Promise<void> {
    if (!this.isDesktop) {
      await this.menuBtn.safeClick();
    }
  }

  async closeOnMobile(): Promise<void> {
    if (!this.isDesktop) {
      await this.menuBtn.safeClick();
    }
  }
}
