import { CommonChartPage } from '../pageObjects/charts/common-chart.po';

const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Tabs actions', () => {
  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  xit('Add tab', async () => {
    const tabsBefore = await commonChartPage.tabs.count();
    await commonChartPage.addTab();
    const tabsAfter = await commonChartPage.tabs.count();

    expect(tabsAfter).toEqual(tabsBefore + 1);
  });

  it('Rename tab', async () => {
    await commonChartPage.addTab();
    const testText = await commonChartPage.renameTab('test_name');
    const tab = await commonChartPage.tabs.last();

    expect("text").toEqual(testText);
    expect(await commonChartPage.getTabName(tab)).toEqual('test_name');
  });  
});
