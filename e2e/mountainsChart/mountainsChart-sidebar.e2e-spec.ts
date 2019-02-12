import { MountainChart } from '../pageObjects/charts/mountain-chart.po';
import { Sidebar } from '../pageObjects/sidebar/sidebar.e2e-component';
import { Slider } from '../pageObjects/components/slider.e2e-component';
import { safeExpectIsDispayed } from '../helpers/helper';
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';
import { browser } from 'protractor';

const mountainChart: MountainChart = new MountainChart();
const sidebar: Sidebar = new Sidebar(mountainChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Mountains chart: Sidebar', () => {
  beforeEach(async () => {
    await mountainChart.openChart();
  });
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('"find" section hide all countries except selected', async () => {
    /**
     * should check that only checked countries displayed after click "find", check a few countries(TC21)
     */
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(193);
    await sidebar.find.searchAndSelectCountry('Ukraine');

    expect(await mountainChart.allSelectedCountriesOnChart.count()).toEqual(1);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(1);

    await sidebar.find.searchAndSelectCountry('Austria');

    expect(await mountainChart.allSelectedCountriesOnChart.count()).toEqual(2);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(2);

    await sidebar.find.searchAndSelectCountry('Brazil');

    expect(await mountainChart.allSelectedCountriesOnChart.count()).toEqual(3);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(3);
  });

  it('uncheck all countries from "find" return to the default view', async () => {
    /**
     * should check that uncheck the countries from "find", when the last one is unchecked,
     * the picture should return to a default view = stacked shapes of all countries(TC22)
     */
    await sidebar.find.searchAndSelectCountry('Ukraine');
    await safeExpectIsDispayed(mountainChart.allCountriesOnChart.first(), 5000);
    expect(await mountainChart.allSelectedCountriesOnChart.count()).toEqual(1);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(1);

    await sidebar.find.searchAndSelectCountry('Austria');
    await safeExpectIsDispayed(mountainChart.allCountriesOnChart.get(1), 5000);

    expect(await mountainChart.allSelectedCountriesOnChart.count()).toEqual(2);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(2);

    await sidebar.find.deselectCountryInSearch('Ukraine');
    await sidebar.find.deselectCountryInSearch('Austria');
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(193);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(0);
  });
});
