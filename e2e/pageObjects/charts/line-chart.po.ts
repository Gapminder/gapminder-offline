import { $, $$, ElementArrayFinder, ElementFinder } from 'protractor';

import { CommonChartPage } from './common-chart.po';
import { findElementByExactText, waitForSliderToBeReady, waitForSpinner } from '../../helpers/helper';
import { Slider } from '../components/slider.e2e-component';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitUntil } from '../../helpers/waitHelper';

export class LineChart extends CommonChartPage {
  type = 'lineChart';
  chartLink: ExtendedElementFinder = _$('[src*="linechart"]');

  dataDoubtsLink: ExtendedElementFinder = _$('.vzb-data-warning');
  dataDoubtsWindow: ElementFinder = $('.vzb-data-warning-box');

  /**
   * specific Line chart selectors
   */
  latestPointOnChart: ElementFinder = $('[class="vzb-axis-value"]');
  selectedCountries: ExtendedArrayFinder = _$$('.vzb-lc-labelname.vzb-lc-labelfill');
  asixDropdownOptions: ExtendedArrayFinder = _$$('.vzb-treemenu-list-item-label');
  yAxisBtn: ExtendedElementFinder = _$('.vzb-lc-axis-y-title');
  axisValues: ElementArrayFinder = $$('.vzb-lc-axis-x .tick text');
  countriesLines: ElementArrayFinder = $$('.vzb-lc-line');

  public linesChartShowAllButton: ElementFinder = $('.vzb-dialog-button.vzb-show-deselect');
  public linesChartRightSidePanelCountriesList: ElementArrayFinder = $$('.vzb-show-item.vzb-dialog-checkbox');
  public linesChartDataDoubtsLabel: ElementArrayFinder = $$('g[class="vzb-data-warning vzb-noexport"]');
  public linesChartSelectedCountries: ElementArrayFinder = $$('.vzb-lc-label');
  public advancedControlsRightSidePanelFindButton: ElementFinder = $$('[data-btn="find"]').last();

  // TODO maybe it should be moved to sidebar po
  countryList: ElementFinder = $$('[class="vzb-show-item vzb-dialog-checkbox"]').first();
  resetBtn: ExtendedElementFinder = _$('.vzb-show-deselect');

  /**
   * default sidebar elements
   * change it carefully
   */
  public sidebar = {
    searchSection: $('.vzb-show-filter'),
    countriesList: $('.vzb-show-list'),
    resetFilterButton: $('.vzb-show-deselect')
  };

  /**
   * specific sidebar elements, unique for Lines chart
   */
  public searchInputField: ExtendedElementFinder = _$('.vzb-show-search');
  public searchResult: ExtendedArrayFinder = _$$('div[class="vzb-show-item vzb-dialog-checkbox"] label'); // TODO maybe add test class to vizabi

  getSidebarElements() {
    return this.sidebar;
  }

  async openChart(): Promise<void> {
    await super.openChart();

    await new Slider().waitForSliderToBeReady();
  }

  getSelectedCountries() {
    return this.selectedCountries;
  }

  async selectLine(country: string): Promise<void> {
    await waitUntil(this.selectedCountries.first());
    await new ExtendedArrayFinder(this.selectedCountries).findElementByText(country).safeClick();
  }

  async getLineOpacity(country: string): Promise<number> {
    await waitUntil(this.selectedCountries.first());

    return Number(await this.selectedCountries.findElementByText(country).safeGetCssValue('opacity'));
  }

  async countHighlightedLines(): Promise<number> {
    return this.countLinesByOpacity(CommonChartPage.opacity.highlighted);
  }

  async countDimmedLines(): Promise<number> {
    return this.countLinesByOpacity(CommonChartPage.opacity.dimmed);
  }

  async countLinesByOpacity(opacity: number): Promise<number> {
    return $$(`.vzb-lc-lines .vzb-lc-entity[style="opacity: ${opacity};"]`).count();
  }

  async hoverLine(country: string): Promise<void> {
    await waitUntil(this.selectedCountries.first());
    await this.selectedCountries
      .findElementByText(country)
      .hover();
  }

  changeYaxisValue(): Promise<string> {
    return super.changeYaxisValue();
  }

  async clickResetButton(): Promise<void> {
    await this.resetBtn.safeClick();
    await waitForSpinner();
    await waitForSliderToBeReady();
  }

  async getLineLabelColor(country: string) {
    return await this.selectedCountries.findElementByText(country).safeGetCssValue('fill');
  }

  getLineColor(country: string) {
    return _$(`[class*="vzb-lc-entity-${CommonChartPage.countries[country]}"]`)
      ._$$('.vzb-lc-line')
      .first()
      .getCssValue('stroke');
  }
}
