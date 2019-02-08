import { Slider } from './pageObjects/components/slider.e2e-component';
import { browser } from 'protractor';
import { CommonChartPage } from './pageObjects/charts/common-chart.po';
import { BubbleChart } from './pageObjects/charts/bubble-chart.po';

describe('Slider', () => {
  const slider: Slider = new Slider();
  const bubbleChart: BubbleChart = new BubbleChart();
  const commonChartPage: CommonChartPage = new CommonChartPage();

  beforeEach(async () => {
    await bubbleChart.openChart();
  });
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('Change speed during playing not reset slider', async () => {
    await slider.dragToStart();
    await slider.playSlider();

    await slider.speedStepper.safeClick();

    const timeStamp = Number(await slider.getPosition());
    await browser.wait(() => slider.getPosition().then(res => Number(res) > timeStamp), 5000);

    expect(Number(await slider.getPosition())).toBeLessThan(2015);
  });
});
