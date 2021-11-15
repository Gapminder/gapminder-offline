import { $, browser, ElementFinder, ExpectedConditions as EC } from 'protractor';

import { CommonChartPage } from '../charts/common-chart.po';
import { _$, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { safeDragAndDrop } from '../../helpers/helper';

export class Slider {
  public sliderSelectedYear: ExtendedElementFinder = _$('.vzb-ts-slider-value');
  public sliderButton: ElementFinder = $('.vzb-ts-slider-handle');
  public sliderReady: ElementFinder = $('.vzb-animationcontrols .vzb-ts-btn .vzb-icon-play'); // TODO remove this because there is static property
  public sliderAxis: ElementFinder = $('.vzb-ts-slider');
  public speedStepper: ExtendedElementFinder = _$('.vzb-speedslider');

  async waitForSliderToBeReady(): Promise<{}> {
    return await browser.wait(EC.visibilityOf(this.sliderReady), 30000, 'slider not visible');
  }

  async getPosition(): Promise<string> {
    await this.waitForSliderToBeReady();

    return this.sliderSelectedYear.getAttribute('textContent');
  }

  async dragToMiddle(): Promise<void> {
    await this.waitForSliderToBeReady();
    
    let distance: number;
    return await safeDragAndDrop(this.sliderButton, {x: -600, y: 0});
  }

  async dragToStart(): Promise<void> {
    await this.waitForSliderToBeReady();
    return await safeDragAndDrop(this.sliderButton, CommonChartPage.buttonPlay);
  }

  async dragToRightEdge(): Promise<void> {
    await this.waitForSliderToBeReady();
    await safeDragAndDrop(this.sliderButton, this.speedStepper);
  }

  async playTimesliderSeconds(seconds: number): Promise<void> {
    await this.waitForSliderToBeReady();
    await CommonChartPage.buttonPlay.safeClick();
    await browser.sleep(seconds * 1000);
    await CommonChartPage.buttonPause.safeClick();
  }

  async playSlider() {
    await this.waitForSliderToBeReady();
    await CommonChartPage.buttonPlay.safeClick();
  }

}
