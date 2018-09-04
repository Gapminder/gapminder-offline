import { MountainChart } from '../pageObjects/charts/mountain-chart.po';
import { Sidebar } from '../pageObjects/sidebar/sidebar.e2e-component';
import { Slider } from '../pageObjects/components/slider.e2e-component';
import { safeExpectIsDispayed } from '../helpers/helper';
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';

const mountainChart: MountainChart = new MountainChart();
const sidebar: Sidebar = new Sidebar(mountainChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

// todo: check all of them!
xdescribe('Mountains chart: Sidebar', () => {
  beforeEach(async () => {
    await mountainChart.openChart();
  });
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('"show" section hide all countries except selected', async () => {
    /**
     * should check that only checked countries displayed after click "show", check a few countries(TC21)
     */
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(165);

    await sidebar.show.showButton.safeClick();

    await sidebar.show.searchAndSelectCountry('Ukraine');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(1);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(1);

    await sidebar.show.searchAndSelectCountry('Austria');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(2);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(2);

    await sidebar.show.searchAndSelectCountry('Brazil');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(3);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(3);
  });

  it('uncheck all countries from "show" return to the default view', async () => {
    /**
     * should check that uncheck the countries from "show", when the last one is unchecked,
     * the picture should return to a default view = stacked shapes of all countries(TC22)
     */
    await sidebar.show.showButton.safeClick();

    await sidebar.show.searchAndSelectCountry('Ukraine');
    await safeExpectIsDispayed(mountainChart.allCountriesOnChart.first(), 5000);
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(1);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(1);

    await sidebar.show.searchAndSelectCountry('Austria');
    await safeExpectIsDispayed(mountainChart.allCountriesOnChart.get(1), 5000);

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(2);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(2);

    await sidebar.show.deselectCountryInSearch('Ukraine');
    await sidebar.show.deselectCountryInSearch('Austria');
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(165);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toBeGreaterThan(25);
  });
});
