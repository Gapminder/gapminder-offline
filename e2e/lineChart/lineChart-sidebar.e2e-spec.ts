import { LineChart } from '../pageObjects/charts/line-chart.po';
import { Sidebar } from '../pageObjects/sidebar/sidebar.e2e-component';
import { Slider } from '../pageObjects/components/slider.e2e-component';
import { waitUntil } from '../helpers/waitHelper';
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';

const lineChart: LineChart = new LineChart();
const sidebar: Sidebar = new Sidebar(lineChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

// todo: check it. is that bugs?
describe('Line chart: Sidebar', () => {
  const DEFAULT_COUNTRIES_NUMBER = 4;
  beforeEach(async () => {
    await lineChart.openChart();
  });
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('Add country from country list in sidebar', async () => {
    await sidebar.show.clickOnCountryFromList('Argentina');
    await expect(lineChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await lineChart.countriesLines.count()).toEqual(DEFAULT_COUNTRIES_NUMBER + 1);
  });

  it('Add country from search in sidebar', async () => {
    await sidebar.show.searchAndSelectCountry('Argentina');
    await expect(lineChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await lineChart.countriesLines.count()).toEqual(DEFAULT_COUNTRIES_NUMBER + 1);
  });

  it('Reset button drop settings to default', async () => {
    await sidebar.show.clickOnCountryFromList('Argentina');
    await sidebar.show.clickResetButton();

    expect(await lineChart.countriesLines.count()).toEqual(DEFAULT_COUNTRIES_NUMBER, 'number of selected countries');
  });

  it('"Find" button in sidebar show only selected countries', async () => {
    const chartCountries = lineChart.selectedCountries;
    await sidebar.findSelect.clickOnFindButton();
    const modalCountries = sidebar.findSelect.countriesInFindModal;

    expect(await chartCountries.count()).toEqual(await modalCountries.count());

    /**
     * 'United states' displayed on chart as 'United Sta...'
     * this removes dots from name
     * and iterate through the names to find matches
     */
    const chartCountriesText = await chartCountries.getText();
    const modalCountriesText = await modalCountries.getText();
    const filteredChartCountries = chartCountriesText.toString()
      .replace(/\./g, '')
      .split(',');

    const filteredModelCountries = modalCountriesText.toString();

    await filteredChartCountries.forEach(item => {
      expect(filteredModelCountries.includes(item)).toBe(true, `${item} not match ${filteredModelCountries}`);
    });
  });

  it('Change lines colors at the top of sidebar', async () => {
    await sidebar.colorSection.selectInColorDropdown(sidebar.colorSection.color.mainReligion);
    await waitUntil(lineChart.countriesLines.first());

    const colorFromColorSection = await sidebar.colorSection.getColorFromColorSection();
    expect(await lineChart.getLineColor('China')).toEqual(colorFromColorSection, 'line color');
  });


});
