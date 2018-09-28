import { $, $$, ElementArrayFinder, ElementFinder, browser, ExpectedConditions as EC } from 'protractor';

import { findElementByExactText, waitForSpinner } from '../../helpers/helper';
import { CommonChartPage } from './common-chart.po';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitUntil } from '../../helpers/waitHelper';

export class MountainChart extends CommonChartPage {
  chartLink: ExtendedElementFinder = _$('[src*="mountainchart"]');


  public selectedCountries: ExtendedArrayFinder = _$$('text[class="vzb-mc-label-text"]');
  // public mountainsChartLeftSidePanelSelectedCountries: ElementArrayFinder = $$('text[class="vzb-mc-label-text"]');
  public extremePovertyPercentage: ElementFinder = $('text[class="vzb-shadow vzb-mc-probe-value-ul"]');
  public axisXLineNumbers: ElementArrayFinder = $$('g[class="tick"]');
  public verticalLine: ElementFinder = $$('.vzb-mc-probe-value-dl').first();
  public extremePovertyTitle: ElementFinder = $('text[class="vzb-mc-probe-extremepoverty"]');
  public allCountriesOnChart: ElementArrayFinder = $$('path[class="vzb-mc-mountain vzb-mc-aggrlevel0"]');
  public allSelectedCountriesOnChart: ElementArrayFinder = $$('path[class="vzb-mc-mountain vzb-mc-aggrlevel0 vzb-selected"]');
  public advancedControlsShowButtons: ExtendedElementFinder = _$$('[data-btn="show"]').last();
  public showButtonSearchInputField: ExtendedElementFinder = _$('input[class="vzb-show-search"]');
  public linesChartSearchResult: ElementFinder = $$('div[class*="vzb-show-item vzb-dialog-checkbox"] label').first(); // TODO
  // public rightSidePanelCountriesList: ElementArrayFinder = $$('.vzb-find-list > div'); // TODO
  public rightSidePanelCountriesList: ElementArrayFinder = $$('.vzb-mc-mountains-labels > g');
  public showMenuSelectedCountry: ElementFinder = $$('.vzb-show-item').first();
  public yearLabel: ElementFinder = $('g[class="vzb-mc-year vzb-dynamic-background"]');
  public visualizationSelectedCountries: ElementArrayFinder = $$('.vzb-selected');

  public sidebar = {
    stackSection: $('.vzb-howtostack')
  };

  getSidebarElements() {
    return this.sidebar;
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }

  async hoverMouseOver500AxisXOnMountainsChart(): Promise<void> {
    await browser.actions().mouseMove(this.axisXLineNumbers.get(10)).perform();
    await waitUntil(this.verticalLine);
  }

  async hoverMouserOverExtremePovertyTitle(): Promise<void> {
    await browser.actions().mouseMove(this.extremePovertyTitle).mouseMove({x: 10, y: 90}).perform();
    await waitUntil(this.verticalLine);
  }
}
