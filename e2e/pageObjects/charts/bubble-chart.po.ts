import { $, $$, browser, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from 'protractor';

import { CommonChartPage } from './common-chart.po';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitUntil } from '../../helpers/waitHelper';

export class BubbleChart extends CommonChartPage {
  chartLink: ExtendedElementFinder = _$$('[src*="bubblechart"]').last();

  public dataDoubtsLink: ExtendedElementFinder = _$('.vzb-data-warning');
  public dataDoubtsWindow: ElementFinder = $('.vzb-data-warning-body');
  public allBubbles: ExtendedArrayFinder = _$$('circle[class*="vzb-bc-entity"]');
  public bubbleLabelOnMouseHover: ExtendedElementFinder = _$('g[class="vzb-bc-tooltip"]');
  public axisXValue: ElementFinder = $$('g[class="vzb-axis-value"]').first();
  yAxisBtn: ExtendedElementFinder = _$('.vzb-bc-axis-y-title');
  public tooltipOnClick: ElementArrayFinder = $$('.vzb-bc-label-content');
  public selectedCountryLabel: ExtendedElementFinder = _$$('.vzb-label-fill.vzb-tooltip-border').first();
  public countrySelectedBiggerLabel: ElementFinder = $('.vzb-bc-labels .vzb-bc-entity');
  public selectedBubbleLabel: ExtendedElementFinder = _$('.vzb-label-fill.vzb-tooltip-border');
  public allLabels: ExtendedArrayFinder = _$$('.vzb-bc-entity[class*=label-][transform*=translate]');
  public xIconOnBubble: ExtendedElementFinder = _$('[class="vzb-bc-label-x"]');
  public trials: ElementArrayFinder = $$('.vzb-bc-entity.entity-trail');
  public chinaTrails: ElementArrayFinder = $$('.trail-chn [class="vzb-bc-trailsegment"]');
  public indiaTrails: ElementArrayFinder = $$('.trail-ind [class="vzb-bc-trailsegment"]');
  public usaTrails: ElementArrayFinder = $$('.trail-usa [class="vzb-bc-trailsegment"]');
  public selectedCountries: ExtendedArrayFinder = _$$('[class*="vzb-bc-entity label"]');
  public noDataLabelArr: ExtendedArrayFinder = _$$('label[class="vzb-find-item-brokendata"]');

  public lockButton: ExtendedElementFinder = _$$('[data-btn="lock"]').last();
  public trailsButton: ExtendedElementFinder = _$$('button[data-btn="trails"]').last();
  public sidebar = {
    bubbleOpacityControl: $('.vzb-dialog-bubbleopacity'),
    resetFiltersBtn: $('.vzb-find-deselect'),
    zoomSection: $('.vzb-dialog-zoom-buttonlist')
  };
  
  public colors = {
    'red': 'rgb(255, 88, 114)',
    'yellow': 'rgb(255, 231, 0)',
    'blue': 'rgb(0, 213, 233)',
    'green': 'rgb(127, 235, 0)'
  };

  countryTooltip = country => $(`[class*="vzb-bc-entity label-${CommonChartPage.countries[country]}"]`);

  getSidebarElements() {
    return this.sidebar;
  }

  getCountryBubble(country: string): ExtendedElementFinder {
    return _$(`circle[class*="vzb-bc-entity bubble-${CommonChartPage.countries[country]}"]`);
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }

  async hoverMouseOverCountry(country: string): Promise<{}> {
    await browser.actions().mouseMove(this.getCountryBubble(country)).perform();

    return await waitUntil(this.bubbleLabelOnMouseHover);
  }

  async clickOnCountryBubble(country: string): Promise<void> {
    await this.getCountryBubble(country).safeClick();
  }

  async filterBubblesByColor(color: string, index = 0): Promise<ElementFinder> {
    await waitUntil($$(`circle[style*='fill: ']`).first());

    return $$(`circle[style*='fill: ${this.colors[color.toLocaleLowerCase()]}']`).get(index);
  }

  async hoverMouseOverBubble(color: string, index = 0, x = 0, y = 0): Promise<ElementFinder> {
    /**
     * x and y needs because some bubbles could overlay another
     */

    const filteredElement = await this.filterBubblesByColor(color, index);

    /**
     * if 'x' and 'y' were set - use the coordinates, otherwise just move to the element
     */
    await browser.actions()
      .mouseMove(filteredElement)
      .mouseMove(x && y ? {x: x, y: y} : filteredElement)
      .perform();

    await waitUntil(this.bubbleLabelOnMouseHover);

    return filteredElement;
  }

  clickOnBubble(color: string, index = 0, x = 0, y = 0): Promise<{}> {
    /**
     * x and y needs because some bubbles could overlay another
     */

    return this.filterBubblesByColor(color, index).then(filteredElement => {
      /**
       * if 'x' and 'y' were set - use the coordinates, otherwise just move to the element
       */
      browser.actions()
        .mouseMove(filteredElement)
        .mouseMove(x && y ? {x: x, y: y} : filteredElement)
        .click()
        .perform();
    }).then(() => {
      return waitUntil(this.tooltipOnClick.last());
    });
  }

  async deselectBubble(country: string): Promise<{}> {
    await this.getCountryBubble(country).safeClick();

    return await browser.wait(EC.invisibilityOf(this.countryTooltip(country)), 5000, 'tooltip visible');
  }

  async hoverUnitedStates(): Promise<{}> {
    return this.hoverMouseOverBubble('green', 0, 10, 10);
  }

  async clickOnUnitedStates(): Promise<{}> {
    await this.clickOnBubble('green', 0, 10, 10);

    return await waitUntil(this.getCountryBubble('USA'));
  }

  async clickOnChina(): Promise<void> {
    await this.clickOnBubble('red', 0, 10, -10);

    await waitUntil(this.getCountryBubble('China'));
  }

  countBubblesByOpacity(opacity?: number) {
    const element = this.allBubbles;

    if (!opacity) {
      return element.count();
    }

    return $$(`circle[style*='opacity: ${opacity}']`).count();
  }

  countBubblesByColor(color: string) {
    return $$(`circle[style*='fill: ${this.colors[color.toLocaleLowerCase()]}']`).count();
  }

  dragAndDropSelectedCountryLabelBubblesChart(x: number, y: number) {
    return browser.actions().dragAndDrop(this.selectedCountryLabel, {x: x, y: y}).perform();
  }

  async clickXiconOnBubble(country: string): Promise<{}> {
    await this.selectedBubbleLabel.hover();
    await this.xIconOnBubble.safeClick();

    return await browser.wait(EC.invisibilityOf(this.tooltipOnClick.last()), 5000, 'tooltip visible');
  }

  getBubblesRadius() {
    return this.allBubbles.map(elem => {
      return elem.getAttribute('r').then(radius => {
        return radius;
      });
    });
  }

  async changeYaxisValue(option: string): Promise<string> {
    return super.changeYaxisValue(option);
  }

  async changeXaxisValue(option: string): Promise<string> {
    return super.changeXaxisValue(option);
  }

  getCoordinatesOfLowerOpacityBubblesOnBubblesChart() {
    /**
     * return sorted array with bubbles coordinates
     */

    return $$(`circle[style*='opacity: 0.3']`)
      .map(elm => {
        return {
          cx: elm.getAttribute('cx'),
          cy: elm.getAttribute('cy')
        };
      }).then(obj => {
        return obj.sort((obj1: any, obj2: any) => obj1.cx - obj2.cx);
      });
  }
}
