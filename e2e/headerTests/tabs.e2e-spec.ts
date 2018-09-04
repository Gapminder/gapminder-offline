import { CommonChartPage } from '../pageObjects/charts/common-chart.po';

const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Tabs actions', () => {
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('Add tab', async () => {
    const tabsBefore = await commonChartPage.tabs.count();
    await commonChartPage.addTab();
    const tabsAfter = await commonChartPage.tabs.count();

    expect(tabsAfter).toEqual(tabsBefore + 1);
  });

  it('Rename tab', async () => {
    await commonChartPage.addTab();
    await commonChartPage.renameTab('test_name');
    const tab = await commonChartPage.tabs.last();

    expect(await commonChartPage.getTabName(tab)).toEqual('test_name');
  });  
});