import { browser } from "protractor";
import { MapChart } from "../pageObjects/charts/map-chart.po";
import { Sidebar } from "../pageObjects/sidebar/sidebar.e2e-component";
import { Slider } from "../pageObjects/components/slider.e2e-component";
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';

const mapChart: MapChart = new MapChart();
const sidebar: Sidebar = new Sidebar(mapChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Maps chart: Sidebar', () => {
  beforeEach(async() => {
    await mapChart.openChart();
  });
  afterEach(async()=>{
    await commonChartPage.closeTab();
  });

  it('Countries could be selected/deselected using the search in sidebar', async() => {
    await sidebar.findSelect.searchAndSelectCountry('China');
    expect(await mapChart.selectedCountries.count()).toEqual(1);

    await sidebar.findSelect.searchAndSelectCountry('India');
    expect(await mapChart.selectedCountries.count()).toEqual(2);

    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('China');
    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('India');

    await sidebar.findSelect.deselectCountryInSearch('India');
    expect(await mapChart.selectedCountries.count()).toEqual(1);

    await sidebar.findSelect.deselectCountryInSearch('China');
    expect(await mapChart.selectedCountries.count()).toEqual(0);
  });

  // todo: strange behavior: check it!
  xit('Click on minimap region - "Remove everything else"', async () => {
    await sidebar.colorSection.removeEverythingElseInMinimap();

    await expect(mapChart.allBubbles.count()).toEqual(mapChart.countBubblesByColor('red'));
  });

  it('Click on minimap region - "Select all in this group"', async () => {
    await sidebar.colorSection.selectAllInThisGroup();
    const selectedBubbles = await mapChart.countBubblesByColor('red');
    const selectedLabels = await mapChart.allLabels.count();

    expect(selectedLabels).toEqual(selectedBubbles);
  });
});
