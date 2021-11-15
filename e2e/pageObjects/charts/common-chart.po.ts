import { $, $$, browser, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from 'protractor';

import { waitForPageLoaded, waitForSliderToBeReady, waitForSpinner } from '../../helpers/helper';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { promise } from 'selenium-webdriver';
import { waitStaleness, waitUntil } from '../../helpers/waitHelper';
import { protractor } from 'protractor/built/ptor';

export class CommonChartPage {
  static countries = {
    'Russia': 'rus',
    'Nigeria': 'nga',
    'Bangladesh': 'bgd',
    'Australia': 'aus',
    'India': 'ind',
    'China': 'chn',
    'USA': 'usa',
    'United States': 'usa',
    'Brazil': 'bra',
    'Argentina': 'arg',
    'Africa': 'africa'
  };

  static opacity = {
    highlighted: 1,
    regular: 0.8,
    dimmed: 0.3
  };

  public static sideBar: ElementFinder = $('.vzb-tool-sidebar');
  public static buttonPlay: ExtendedElementFinder = _$('.vzb-ts-btn .vzb-icon-play');
  public static buttonPause: ExtendedElementFinder = _$('.vzb-ts-btn .vzb-icon-pause');
  public static mainChart: ElementFinder = $('.vzb-tool');
  public static spinner: ElementFinder = _$$('.vzb-loading-data').first();
  public static errorWindow: ElementFinder = _$$('.vzb-error-message-box').last();
  public static sliderReady: ElementFinder = $('.vzb-animationcontrols .vzb-ts-btn .vzb-icon-play');
  public movingSliderProgress: ElementArrayFinder = $$('.vzb-animationcontrols .vzb-ts-btn .vzb-icon-play');
  public mapsChart: ElementFinder = $('a[href*="map"]');
  public bubblesChart: ElementFinder = $('a[href*="bubbles"]');
  public linesChart: ElementFinder = $('a[href*="linechart"]');
  public mountainsChart: ElementFinder = $('a[href*="mountain"]');
  public rankingsChart: ElementFinder = $('a[href*="barrank"]');
  public pageHeader: ElementFinder = $('.header');
  public axisSearchInput: ExtendedElementFinder = _$('.vzb-treemenu-search');

  yAxisBtn: ExtendedElementFinder = _$('.vzb-bc-axis-y-title');
  xAxisBtn: ExtendedElementFinder = _$('.vzb-bc-axis-x-title');

  chartLink: ExtendedElementFinder;
  selectedCountries: ExtendedArrayFinder;

  public axisYMaxValue: ExtendedElementFinder = _$$('.vzb-bc-axis-y g[class="tick"] text').last();
  public axisXMaxValue: ExtendedElementFinder = _$$('.vzb-bc-axis-x g[class="tick"] text').last();
  asixDropdownOptions: ExtendedArrayFinder = _$$('.vzb-treemenu-list-item-label');

  // tabs
  tabs: ExtendedArrayFinder = _$$('.nav-item');
  addTabBtn: ExtendedElementFinder = _$('.add-tab');
  closeTabBtn: ExtendedArrayFinder = _$$('.glyphicon-remove-circle');

  async waitForToolsPageCompletelyLoaded(): Promise<{}> {
    await waitUntil(CommonChartPage.sideBar);
    await waitUntil(CommonChartPage.buttonPlay);
    await browser.wait(EC.invisibilityOf(this.movingSliderProgress.get(1)), 30000);

    return await waitForSpinner();
  }

  async openChart(): Promise<void> {
    await this.chartLink.safeClick();
    await waitForSpinner();
  }

  getSelectedCountriesNames(): promise.Promise<string> {
    return waitUntil(this.selectedCountries.first())
      .then(() => {
        return this.selectedCountries.getText(); // TODO css animation can fail the test
      });
  }

  async changeYaxisValue(option?: string): Promise<string> {
    return await this.changeAxisValue(this.yAxisBtn, option);
  }

  async changeXaxisValue(option: string) {
    return await this.changeAxisValue(this.xAxisBtn, option);
  }

  async changeAxisValue(axisBtn: ExtendedElementFinder, option?: string): Promise<string> {
    await axisBtn.safeClick();

    if (option) {
      await this.axisSearchInput.typeText(option);
      await browser.sleep(1000); // no idea what to wait here
    }

    const newOption: ExtendedElementFinder = this.asixDropdownOptions.first();

    await waitUntil(newOption);
    const newOptionValue = newOption.getText();
    await newOption.click();

    await waitForSpinner();
    await waitForSliderToBeReady();

    return newOptionValue;
  }

  async addTab(): Promise<void> {
    await waitStaleness($('.modal-backdrop.fade'));
    await this.addTabBtn.safeClick();
  }

  async closeTab(): Promise<void> {
    await waitStaleness($('.modal-backdrop.fade'));
    await this.closeTabBtn.last().safeClick();
  }

  async renameTab(newName: string): Promise<string> {
    await this.tabs.last().safeClick();
    await waitUntil($('.editTabInput'));
    const text = await $('.editTabInput').getAttribute('id');
    //await $('.editTabInput').typeText(newName);
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    return text;
  }

  async getTabName(tab: ExtendedElementFinder): Promise<string> {
    return await tab._$('.doNotEditTabInput').safeGetText();
  }

}
