import { safeDragAndDrop } from './helpers/helper';
import { BubbleChart } from './pageObjects/charts/bubble-chart.po';
import { Sidebar } from './pageObjects/sidebar/sidebar.e2e-component';
import { CommonChartPage } from './pageObjects/charts/common-chart.po';
import { _$, _$$ } from './helpers/ExtendedElementFinder';
import { browser } from 'protractor';

const bubbleChart: BubbleChart = new BubbleChart();
const sidebar: Sidebar = new Sidebar(bubbleChart);
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Sidebar: Select', () => {

  beforeEach(async() => {
    await bubbleChart.openChart();
  });
  afterEach(async()=>{
    await commonChartPage.closeTab();
  });

  it('Hover country in the country list highlight it', async () => {
    await sidebar.findSelect.hoverCountryFromList('Australia');

    expect(await bubbleChart.countBubblesByOpacity(CommonChartPage.opacity.highlighted)).toEqual(1);
    expect(await bubbleChart.bubbleLabelOnMouseHover.safeGetText()).toEqual('Australia');
  });
});

describe('Sidebar: Advanced buttons', () => {

  beforeEach(async() => {
    await bubbleChart.openChart();
  });
  afterEach(async()=>{
    await commonChartPage.closeTab();
  });

  /** unxit after the fix "not visible" issue  */
  xit('Change regular opacity', async() => {
    const allBubblesCount = await bubbleChart.allBubbles.count();

    await changeRegularOpacity();

    const newOpacity = await _$$('.vzb-bc-entity').first().safeGetCssValue('opacity');
    const newOpacityCount = await bubbleChart.countBubblesByOpacity(Number(newOpacity));

    await expect(allBubblesCount).toEqual(newOpacityCount);
  });

  /** unxit after the fix "not visible" issue  */
  xit('Change opacity for non-selected', async() => {
    const allBubblesCount = await bubbleChart.allBubbles.count();

    await changeOpacityForNonSelected();

    await bubbleChart.clickOnUnitedStates(); // select bubble

    const newOpacity = await _$$('.vzb-bc-entity').first().safeGetCssValue('opacity');
    const newOpacityCount = await bubbleChart.countBubblesByOpacity(Number(newOpacity));

    await expect(newOpacityCount).toEqual(allBubblesCount - 1);
  });
});

async function changeRegularOpacity() {
  await sidebar.optionsButton.safeClick();
  await _$('[data-dlg="opacity"]').safeClick();
  await safeDragAndDrop(_$('.vzb-dialog-bubbleopacity-regular .handle--e'), {x: -100, y: 0});
}

async function changeOpacityForNonSelected() {
  await sidebar.optionsButton.safeClick();
  await _$('[data-dlg="opacity"]').safeClick();
  await safeDragAndDrop(_$('.vzb-dialog-bubbleopacity-selectdim .handle--e'), {x: -20, y: 0});
}
