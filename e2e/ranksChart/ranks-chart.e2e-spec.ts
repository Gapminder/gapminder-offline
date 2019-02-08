import { browser } from 'protractor';

import { Sidebar } from '../pageObjects/sidebar/sidebar.e2e-component';
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';
import { Slider } from '../pageObjects/components/slider.e2e-component';
import { RankingsChart } from '../pageObjects/charts/rankings-chart.po';
import { safeExpectIsDispayed, waitForSpinner } from '../helpers/helper';

const ranksChart: RankingsChart = new RankingsChart();
const sidebar: Sidebar = new Sidebar(ranksChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Ranks chart', () => {
  beforeEach(async () => {
    await ranksChart.openChart();
  });
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('Select bar by click', async () => {
    await ranksChart.selectBar('India');

    expect(await ranksChart.getBarOpacity('India')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await ranksChart.countHighlightedBars()).toEqual(1);
  });

  it('Not selected bar became highlighted on hover', async () => {
    await ranksChart.selectBar('China');
    await ranksChart.hoverBar('Russia');

    expect(await ranksChart.getBarOpacity('Russia')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await ranksChart.countHighlightedBars()).toEqual(2);
  });

  it('Hover the legend colors - will highlight specific bars', async () => {
    await ranksChart.selectBar('China');
    await sidebar.colorSection.hoverMinimapRegion('Asia');

    await ranksChart.getAllBarsWithColor('red').each(element => {
      element.getCssValue('opacity').then(opacity => {
        expect(Number(opacity)).toEqual(CommonChartPage.opacity.highlighted);
      });
    });

    expect(await ranksChart.countHighlightedBars()).toEqual(await ranksChart.getAllBarsWithColor('red').count());
  });

  it(`Hover the legend colors - won't dim selected bars`, async () => {
    await ranksChart.selectBar('USA');
    await sidebar.colorSection.hoverMinimapRegion('Asia');

    expect(await ranksChart.getBarOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await ranksChart.getBarOpacity('USA')).toEqual(CommonChartPage.opacity.highlighted);
  });

  it(`Hover a bar change Color section (legend color and dropdown label)`, async () => {
    await ranksChart.hoverBar('China');

    expect(await sidebar.colorSection.colorLabel.getText()).toEqual('Asia');
    expect(Number(await sidebar.colorSection.minimapAsiaRegion.getCssValue('opacity'))).toEqual(CommonChartPage.opacity.highlighted);
  });

  it('Data doubts button', async () => {
    await ranksChart.dataDoubtsLink.safeClick();

    await safeExpectIsDispayed(ranksChart.dataDoubtsWindow);
  });

  it('Opacity should not get lost when timeslider is playing', async () => {
    await ranksChart.selectBar('China');
    await CommonChartPage.buttonPlay.safeClick();
    await browser.sleep(2000); // play slider for 2 seconds to get the value in movement

    expect(await ranksChart.countHighlightedBars()).toEqual(1);

    await CommonChartPage.buttonPause.safeClick();
    expect(await ranksChart.countHighlightedBars()).toEqual(1);
  });

  it('Bars sorted when timeslider change position', async () => {
    const NUMBER_OF_BARS = 10;
    await waitForSpinner();
    const barsBefore = await ranksChart.getBarsPosition(NUMBER_OF_BARS);

    await slider.dragToMiddle();

    const barsAfter = await ranksChart.getBarsPosition(NUMBER_OF_BARS);

    await expect(barsBefore.length).toEqual(NUMBER_OF_BARS);
    await expect(barsAfter.length).toEqual(NUMBER_OF_BARS);
    await expect(barsBefore).not.toEqual(barsAfter);
  });

  it('change Y axis value', async () => {
    const NUMBER_OF_BARS = 10;
    const barsBefore = await ranksChart.getBarsPosition(NUMBER_OF_BARS);
    const yAxisValue = await ranksChart.changeYaxisValue();

    const barsAfter = await ranksChart.getBarsPosition(NUMBER_OF_BARS);

    expect(await ranksChart.yAxisBtn.getText()).toContain(yAxisValue, 'Y axis button text');
    // bars should be resorted
    await expect(barsBefore.length).toEqual(NUMBER_OF_BARS);
    await expect(barsAfter.length).toEqual(NUMBER_OF_BARS);
    await expect(barsBefore).not.toEqual(barsAfter);
  });
});
