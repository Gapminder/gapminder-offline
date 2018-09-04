import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from 'protractor';

import {
  disableAnimations,
  safeDragAndDrop,
  waitForSpinner,
} from '../../helpers/helper';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';

export class Sidebar {
  /**
   * Note that sidebar could include specific elements in different charts
   * The elements could be added in constructor
   */
  chartType;

  /**
   *  Common elements
   *  change it carefully becaues it can affect all charts
   */
  rootElement: ElementFinder = $('.vzb-tool-sidebar');
  sidebar = {
    colorsSection: $('[data-dlg="colors"]'),
    miniMap: $('.vzb-cl-minimap'),
    searchSection: $('.vzb-find-filter'),
    countriesList: $('.vzb-find-list'),
    advancedButtons: $('.vzb-tool-buttonlist')
  };
  yearAtTop: ExtendedElementFinder = _$('.vzb-timedisplay');

  /**
   * Color section
   */
  colorDropDown: ExtendedElementFinder = _$$('span[class="vzb-ip-select"]').first();
  colorSearch: ExtendedElementFinder = _$('#vzb-treemenu-search');
  colorSearchResults: ExtendedArrayFinder = _$$('.vzb-treemenu-list-item-label');
  colorIndicatorDropdown: ExtendedElementFinder = _$$('span[class="vzb-ip-holder"] > span').get(8); // TODO
  colorListItems: ExtendedArrayFinder = _$$('span[class="vzb-treemenu-list-item-label"]');
  color = {
    childMortalityRate: this.colorListItems.get(3), // TODO add test class to vizabi
    incomePerPerson: this.colorListItems.get(4), // TODO add test class to vizabi
    mainReligion: element(by.cssContainingText('.vzb-treemenu-list-item-label', 'Main religion')),
    firstColor: $$('.vzb-cl-color-sample').first()
  };
  minimapAsiaRegion = this.sidebar.miniMap.$$('path').first();
  minimapDropdown: ExtendedElementFinder = _$('[class=vzb-cl-select-dialog]'); // will find any active(mobile or desktop)

  /**
   * Search select
   */
  searchInputField: ExtendedElementFinder;
  searchResult: ExtendedArrayFinder;
  countriesList: ElementArrayFinder = $$('.vzb-find-list > div'); // TODO

  /**
   * Advanced buttons section
   */
  advancedSection: ExtendedArrayFinder = _$$('.vzb-tool-buttonlist');

  /**
   * Options
   */
  optionsButton: ExtendedElementFinder = _$$('[data-btn="moreoptions"]').last();
  optionsMenuSizeButton: ExtendedElementFinder = _$$('span[data-vzb-translate="buttons/size"]').last();
  optionsMenuBubblesResizeToddler: ExtendedElementFinder = _$$('.vzb-slider.vzb-slider-bubblesize .w').last();
  optionsXandY = {
    openBtn: $('[data-vzb-translate="buttons/axes"]'),
    xMin: $$('.vzb-mmi-zoomedmin').first(),
    xMax: $$('.vzb-mmi-zoomedmax').first(),
    yMin: $$('.vzb-mmi-zoomedmin').last(),
    yMax: $$('.vzb-mmi-zoomedmax').last()
  };
  optionsMenuHandIcon: ElementFinder = $('.thumb-tack-class-ico-drag[data-dialogtype="moreoptions"]');
  optionsModalDialogue: ElementArrayFinder = $$('div[data-dlg="moreoptions"]');
  optionsOkBtn: ElementFinder = $$('.vzb-dialog-button.vzb-label-primary').last();

  activeOptionsMenu: ExtendedElementFinder = _$('.vzb-accordion-active');
  opacityMenu: ExtendedElementFinder = _$('[data-dlg="opacity"]');
  labelsMenu: ExtendedElementFinder = _$('[data-dlg="label"]');

  /**
   * Size
   */
  sizeDropDown: ElementFinder = $$('span[class="vzb-ip-select"]').get(1);
  sizeListBabiesPerWomanColorIndicator: ExtendedElementFinder = this.colorListItems.first();

  /**
   * Zoom
   */
  zoomButton: ExtendedElementFinder = _$$('[data-btn="plus"]').first();

  /**
   * Find
   */
  findButton: ExtendedElementFinder = _$$('[data-btn="find"]').last();
  countriesInFindModal: ElementArrayFinder = $$('.vzb-find-item.vzb-dialog-checkbox');

  /**
   * Show
   */
  showButtonSearchInputField: ExtendedElementFinder = _$('input[class="vzb-show-search"]');
  showSearchResult: ExtendedArrayFinder = _$$('div[class*="vzb-show-item vzb-dialog-checkbox"] label'); // TODO
  showButton: ExtendedElementFinder = _$$('[data-btn="show"]').last();
  deselectButton: ExtendedElementFinder = _$('.vzb-find-deselect');

  constructor(chart: any) {
    this.chartType = chart;
    this.searchResult = chart.searchResult || _$$('.vzb-find-item.vzb-dialog-checkbox label');
    this.searchInputField = chart.searchInputField || _$('.vzb-find-search');
  }

  async waitForVisible(): Promise<void> {
    await browser.wait(EC.visibilityOf(this.rootElement), 10000, `element ${this.rootElement.locator()} not visible`);
    await browser.wait(EC.visibilityOf(this.colorDropDown), 10000, `element ${this.rootElement.locator()} not visible`);
    await browser.wait(EC.visibilityOf(this.searchInputField), 10000, `element ${this.rootElement.locator()} not visible`);
  }

  async searchAndSelectCountry(country: string, select = true): Promise<void> {
    /**
     * this method can be used to both select and deselect country
     * LineChart-page use it's own selectors
     */
    await this.searchInputField.typeText(country);
    await browser.wait(EC.presenceOf(this.searchResult.first()), 5000, 'search results not present');
    const counrtyInSearchResults = await this.searchResult.findElementByText(country);
    await counrtyInSearchResults.safeClick();

    await waitForSpinner();
  }

  async deselectCountryInSearch(country: string): Promise<void> {
    /**
     * cilck on country name in search results and wait for it to disappear
     * LineChart-page use it's own selectors
     */
    await this.searchAndSelectCountry(country, false);
  }

  async clickOnCountryFromList(country: string): Promise<void> {
    await this.searchResult.findElementByText(country).safeClick();

    await waitForSpinner();
  }

  async hoverCountryFromList(country: string): Promise<void> {
    await this.searchResult.findElementByText(country).hover();
  }

  async selectInColorDropdown(element: ExtendedElementFinder | ElementFinder): Promise<{}> {
    await this.colorDropDown.safeClick();

    if (element instanceof ExtendedElementFinder) {
      await element.safeClick();
    } else {
      await new ExtendedElementFinder(element).safeClick();
    }

    return await waitForSpinner();
  }

  async getColorFromColorSection(): Promise<string> {
    const style = await this.color.firstColor.getAttribute('style');

    return style.split(';')[0].split(': ')[1]; // TODO remove magic
  }

  async clickOnFindButton(): Promise<void> {
    await this.findButton.safeClick();
    await browser.wait(EC.visibilityOf(this.countriesInFindModal.first()));
  }

  async hoverMinimapRegion(region: string): Promise<void> {
    // TODO make this work for specific region
    // const elem = await this.sidebar.miniMap.$$('path').first();

    return await browser.actions().mouseMove(this.minimapAsiaRegion, {x: 20, y: 10}).perform();
  }

  async clickMinimapRegion(region?: string): Promise<void> {
    // TODO make this work for specific region
    // const elem = await this.sidebar.miniMap.$$('path').first();

    await browser.actions().mouseMove(this.minimapAsiaRegion, {x: 20, y: 10}).perform();
    await browser.actions().click().perform();
  }

  async removeEverythingElseInMinimap(region: string) {
    await this.clickMinimapRegion();
    await this.minimapDropdown._$$('.vzb-cl-select-dialog-item').get(1).click();
    await waitForSpinner();
  }

  async selectAllInThisGroup(region: string) {
    await this.clickMinimapRegion();
    await this.minimapDropdown._$$('.vzb-cl-select-dialog-item').get(0).click();
    await waitForSpinner();
  }

  async changeColor(index?: number) {
    await this.colorDropDown.safeClick();
    await disableAnimations();
    await this.colorSearchResults.get(index || 3).safeClick();
    await waitForSpinner();
  }

  async searchAndSelectInColorDropdown(colorOption: string) {
    await this.colorDropDown.safeClick();
    await this.colorSearch.typeText(colorOption);
    await disableAnimations();
    await browser.wait(EC.presenceOf(element(by.cssContainingText(this.colorSearchResults.first().locator().value, colorOption))));
    await browser.sleep(1000);
    await this.colorSearchResults.first().safeClick();
  }

  async searchAndSelectCountryInShowMenu(country: string): Promise<void> {
    await this.showButtonSearchInputField.typeText(country);
    await this.showSearchResult.findElementByText(country).safeClick();
    await waitForSpinner();
  }

  async deselectCountryInShowMenu(country: string): Promise<void> {
    await this.showButtonSearchInputField.typeText(country);
    await this.showSearchResult.findElementByText(country).safeClick();
    await waitForSpinner();
  }

  async changeOpacityForNonSelected(): Promise<void> {
    const nonSelectedSlider: ExtendedElementFinder = this.opacityMenu._$$('.vzb-dialog-bubbleopacity-selectdim .handle--e').first();
    await this.changeOpacity(nonSelectedSlider);
  }

  async changeRegularOpacity(): Promise<void> {
    const regularOpacitySlider: ExtendedElementFinder = this.opacityMenu._$$('.vzb-dialog-bubbleopacity-regular .handle--e').first();
    await this.changeOpacity(regularOpacitySlider);
  }

  async changeOpacity(sliderType: ExtendedElementFinder): Promise<void> {
    await this.optionsButton.safeClick();
    await this.opacityMenu.safeClick();
    await safeDragAndDrop(sliderType, {x: -50, y: 0});
  }
}
