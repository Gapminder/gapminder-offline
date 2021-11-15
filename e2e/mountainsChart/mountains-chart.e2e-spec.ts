import { browser, protractor } from 'protractor';

import { safeExpectIsDispayed, waitForSliderToBeReady } from '../helpers/helper';
import { MountainChart } from '../pageObjects/charts/mountain-chart.po';
import { Sidebar } from '../pageObjects/sidebar/sidebar.e2e-component';
import { Slider } from '../pageObjects/components/slider.e2e-component';
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';

const mountainChart: MountainChart = new MountainChart();
const sidebar: Sidebar = new Sidebar(mountainChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Mountains chart', () => {
  beforeEach(async () => {
    await mountainChart.openChart();
  });
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('text on vertical line at the end of the chart', async () => {
    /**
     * should check that in 2018, the percentage of people living in the extreme poverty should be 11.5 ± 0.3%,
     * and the world population should be 7.33B(TC19)
     */
    await waitForSliderToBeReady();
    const extremePovertyPercentage = await mountainChart.extremePovertyPercentage.getText();

    await expect(Number(extremePovertyPercentage.replace('%', ''))).toBeGreaterThan(11.2);
    await expect(Number(extremePovertyPercentage.replace('%', ''))).toBeLessThan(11.8);

    await mountainChart.hoverMouseOver500AxisXOnMountainsChart();
    expect(await mountainChart.verticalLine.getText()).toEqual('7.67B');
  });

  it('labels on vertical line in 2018 and in 1800 match', async () => {
    /**
     * should check that in 2018 there is roughly the same amount of people living in the extreme poverty
     * as there was in 1800 (830 and 812 Millions)(TC20)
     */
    await mountainChart.hoverMouserOverExtremePovertyTitle();

    expect(await mountainChart.verticalLine.getText()).toEqual('861M');

    await slider.dragToStart();
    await mountainChart.hoverMouserOverExtremePovertyTitle();

    expect(await mountainChart.verticalLine.getText()).toEqual('823M');
  });

  it('Population and name displayed on the top', async () => {
    const EC = protractor.ExpectedConditions;
    expect(await mountainChart.yearLabel.isPresent()).toBe(true, 'year label is displayed');

    await browser.wait(EC.presenceOf(mountainChart.allCountriesOnChart.first()));

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(193);
    await sidebar.findSelect.searchAndSelectCountry('China');
    await browser.wait(EC.presenceOf(mountainChart.selectedCountries.first()));

    expect(await mountainChart.selectedCountries.getText()).toMatch('China: 1.4B people');
    await browser.wait(EC.presenceOf(mountainChart.visualizationSelectedCountries.first()));
    expect(await mountainChart.visualizationSelectedCountries.count()).toEqual(1);
    expect(await mountainChart.visualizationSelectedCountries.get(0).getAttribute('style')).toContain('opacity: 1;');

    await sidebar.findSelect.searchAndSelectCountry('India');
    await browser.wait(EC.presenceOf(mountainChart.visualizationSelectedCountries.first()));
    expect(await mountainChart.selectedCountries.getText()).toMatch('India: 1.31B');
    expect(await mountainChart.visualizationSelectedCountries.count()).toEqual(2);
    expect(await mountainChart.visualizationSelectedCountries.get(1).getAttribute('style')).toContain('opacity: 1;');

    await sidebar.findSelect.searchAndSelectCountry('Brazil');
    await browser.wait(EC.presenceOf(mountainChart.visualizationSelectedCountries.first()));
    expect(await mountainChart.selectedCountries.getText()).toMatch('Brazil: 206M');
    expect(await mountainChart.visualizationSelectedCountries.count()).toEqual(3);
    expect(await mountainChart.visualizationSelectedCountries.get(2).getAttribute('style')).toContain('opacity: 1;');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(190);
  });
});
