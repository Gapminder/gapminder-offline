import { browser } from 'protractor';

import { safeExpectIsDispayed, waitForSliderToBeReady } from '../helpers/helper';
import { Sidebar } from '../pageObjects/sidebar/sidebar.e2e-component';
import { LineChart } from '../pageObjects/charts/line-chart.po';
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';
import { Slider } from '../pageObjects/components/slider.e2e-component';

const lineChart: LineChart = new LineChart();
const sidebar: Sidebar = new Sidebar(lineChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Line chart: ', () => {
  const DEFAULT_COUNTRIES_NUMBER = 4;
  beforeEach(async () => {
    await lineChart.openChart();
  });
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('Select line by click on label', async () => {
    await lineChart.selectLine('China');

    expect(await lineChart.getLineOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(1);
    expect(await lineChart.countDimmedLines()).toEqual(DEFAULT_COUNTRIES_NUMBER - 1);
  });

  it('Line became highlighted on hover', async () => {
    await lineChart.selectLine('China');
    await lineChart.hoverLine('Russia');

    expect(await lineChart.getLineOpacity('Russia')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(DEFAULT_COUNTRIES_NUMBER - 2);
    expect(await lineChart.countDimmedLines()).toEqual(DEFAULT_COUNTRIES_NUMBER - 2);
  });

  it('Hover the legend colors - will highlight specific lines', async () => {
    await sidebar.show.searchAndSelectCountry('Bangladesh');
    await waitForSliderToBeReady();
    await sidebar.colorSection.hoverMinimapRegion('Asia');

    expect(await lineChart.getLineOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.getLineOpacity('Bangladesh')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(2);
    expect(await lineChart.countDimmedLines()).toEqual(3);
  });

  it(`Hover the legend colors - won't dim selected lines`, async () => {
    await lineChart.selectLine('Nigeria');
    await waitForSliderToBeReady();
    await sidebar.colorSection.hoverMinimapRegion('Asia');

    expect(await lineChart.getLineOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.getLineOpacity('Nigeria')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(2);
    expect(await lineChart.countDimmedLines()).toEqual(2);
  });

  it('change Y axis value', async () => {
    const yAxisValue = await lineChart.changeYaxisValue();

    expect(await lineChart.yAxisBtn.getText()).toContain(yAxisValue, 'Y axis button text');
  });

  xit('Data doubts button', async () => {
    await lineChart.dataDoubtsLink.safeClick();

    await safeExpectIsDispayed(lineChart.dataDoubtsWindow);
  });

  it('Text on X axis on latest point on chart', async () => {
    await slider.dragToMiddle();

    expect(await lineChart.latestPointOnChart.getText()).toEqual(await slider.getPosition());
  });

  it('Lines opacity should not get lost when timeslider is playing', async () => {
    await lineChart.selectLine('China');
    await CommonChartPage.buttonPlay.safeClick();
    await browser.sleep(2000); // play slider for 2 seconds to get the value in movement

    expect(await lineChart.countHighlightedLines()).toEqual(1);

    await CommonChartPage.buttonPause.safeClick();
    expect(await lineChart.countHighlightedLines()).toEqual(1);
  });

  it(`Hover on line change Color section (legend color and dropdown label)`, async () => {
    await lineChart.hoverLine('China');

    expect(await sidebar.colorSection.colorLabel.safeGetText()).toEqual('Asia');
    expect(Number(await sidebar.colorSection.minimapAsiaRegion.getCssValue('opacity'))).toEqual(CommonChartPage.opacity.highlighted);
  });

});
