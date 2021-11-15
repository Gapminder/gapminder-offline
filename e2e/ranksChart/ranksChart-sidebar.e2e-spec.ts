import { waitForSpinner } from '../helpers/helper';
import { RankingsChart } from '../pageObjects/charts/rankings-chart.po';
import { Sidebar } from '../pageObjects/sidebar/sidebar.e2e-component';
import { Slider } from '../pageObjects/components/slider.e2e-component';
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';

const ranksChart: RankingsChart = new RankingsChart();
const sidebar: Sidebar = new Sidebar(ranksChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Ranks chart: Sidebar', () => {
  beforeEach(async () => {
    await ranksChart.openChart();
  });
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('Add country from country list in sidebar', async () => {
    await sidebar.findSelect.clickOnCountryFromList('Argentina');
    await expect(ranksChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await ranksChart.selectedCountries.count()).toEqual(1);
  });

  it('Add country from search in sidebar', async () => {
    await sidebar.findSelect.searchAndSelectCountry('Argentina');
    await expect(ranksChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await ranksChart.selectedCountries.count()).toEqual(1);
  });

  it('Change color at the top of sidebar', async () => {
    await sidebar.colorSection.searchAndSelectInColorDropdown('Main religion');
    await waitForSpinner();

    const colorFromColorSection = await sidebar.colorSection.color.firstColor.getAttribute('style');
    expect(colorFromColorSection).toContain(await ranksChart.getBarForCountry('United States').safeGetCssValue('fill'));
  });

  it(`"DESELECT" button reset selected countries`, async () => {
    await sidebar.findSelect.clickOnCountryFromList('India');
    await sidebar.findSelect.deselectAllCountries();

    expect(await ranksChart.countDimmedBars()).toEqual(0);
  });

  it(`Active year at the top`, async () => {
    await slider.dragToMiddle();
    const selectedYear = await slider.getPosition();

    expect(await sidebar.yearAtTop.safeGetText()).toEqual(selectedYear);
  });
});
