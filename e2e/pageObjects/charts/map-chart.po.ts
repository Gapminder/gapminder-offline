import { $, $$, ElementArrayFinder, ElementFinder, browser, ExpectedConditions as EC } from 'protractor';

import { CommonChartPage } from './common-chart.po';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitUntil } from '../../helpers/waitHelper';

export class MapChart extends CommonChartPage {
  static opacityHighlighted = 0.8;
  chartLink: ExtendedElementFinder = _$('[src*="bubblemap"]');

  selectedCountries: ExtendedArrayFinder = _$$('[class*="vzb-bmc-entity label"]');
  selectedBubbles: ExtendedArrayFinder = _$$(`.vzb-bmc-bubble[style*="opacity: ${MapChart.opacityHighlighted}"]`);
  nonSelectedBubbles: ExtendedArrayFinder = _$$(`.vzb-bmc-bubble[style*="opacity: ${CommonChartPage.opacity.dimmed}"]`);
  allBubbles: ExtendedArrayFinder = _$$('circle[class="vzb-bmc-bubble"]');
  allLabels: ExtendedArrayFinder = _$$('.vzb-bmc-entity[class*=label-][transform*=translate]');
  bubbleLabelOnMouseHover: ExtendedElementFinder = _$('.vzb-bmc-tooltip');
  tooltipOnClick: ElementFinder = $('.vzb-label-glow');
  selectedCountriesLabels: ExtendedArrayFinder = _$$('text[class="vzb-bmc-label-content stroke"]');
  selectedCountryLabel: ElementFinder = $('[class*="vzb-bmc-entity label"]'); // TODO this could be elementArray
  xIconOnBubble: ExtendedElementFinder = _$('.vzb-bmc-label-x');
  yAxisTitle: ElementFinder = $('.vzb-bmc-axis-s-title');

  sidebar = {
    bubbleOpacityControl: $('.vzb-dialog-bubbleopacity'),
    resetFiltersBtn: $('.vzb-find-deselect'),
    axisSelector: $('.vzb-saxis-selector')
  };

  
  colors = {
    'red': '#ff5872',
    'yellow': '#ffe700',
    'blue': '#00d5e9',
    'green': '#7feb00'
  };

  getSidebarElements() {
    return this.sidebar;
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountriesLabels;
  }

  async filterBubblesByColor(color: string, index = 0): Promise<ExtendedElementFinder> {
    await waitUntil(this.allBubbles.first());

    return await _$$(`circle[fill = '${this.colors[color.toLocaleLowerCase()]}']`).get(index);
  }

  async hoverMouseOverBubble(color: string, index = 0): Promise<ElementFinder> {
    const filteredElement = await this.filterBubblesByColor(color, index);

    await browser.actions().mouseMove(filteredElement)
      .perform();

    await waitUntil(this.bubbleLabelOnMouseHover);

    return filteredElement;
  }

  async clickOnBubble(color: string, index = 0): Promise<void> {
    const bubble: ExtendedElementFinder = await this.filterBubblesByColor(color, index);
    await bubble.safeClick();
    await waitUntil(this.tooltipOnClick);
  }

  async deselectBubble(color: string, index = 0): Promise<void> {
    const bubble: ExtendedElementFinder = await this.filterBubblesByColor(color, index);
    await bubble.safeClick();
    await browser.wait(EC.invisibilityOf(this.tooltipOnClick), 2000);
  }

  getOpacityOfNonSelectedBubblesMapsChart() {
    return this.allBubbles.each(elem => {
      return elem.getAttribute('style').then(opacity => {
        return opacity;
      });
    });
  }

  // TODO make it work with specific country
  async clickXiconOnBubble(country: string): Promise<{}> {
    await browser.actions().mouseMove(this.selectedCountryLabel).perform();
    await this.xIconOnBubble.safeClick();

    return await browser.wait(EC.invisibilityOf(this.tooltipOnClick), 5000);
  }

  countBubblesByColor(color: string) {
    return $$(`circle[fill='${this.colors[color.toLocaleLowerCase()]}']`).count();
  }
}
