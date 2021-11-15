import { safeDragAndDrop, safeExpectIsDispayed, waitForSpinner, disableAnimations } from '../helpers/helper';
import { CommonChartPage } from '../pageObjects/charts/common-chart.po';
import { BubbleChart } from '../pageObjects/charts/bubble-chart.po';
import { Slider } from '../pageObjects/components/slider.e2e-component';
import { browser } from 'protractor';

const commonChartPage: CommonChartPage = new CommonChartPage();
const bubbleChart: BubbleChart = new BubbleChart();
const slider: Slider = new Slider();

describe('Bubbles chart', () => {
  beforeEach(async () => {
    await bubbleChart.openChart();
  });

  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  it('data warning modal', async () => {
    await bubbleChart.dataDoubtsLink.safeClick();
    await safeExpectIsDispayed(bubbleChart.dataDoubtsWindow);
  });

  it('hover biggest bubbles: red, yellow, green and blue', async () => {
    /**
     * should check bubbles react to hovering and tooltip appears, and contains the country name.
     * In 2015 the biggest red bubbles: "China", "India"; the biggest green - "United states"
     * the biggest yellow is "Russia" and the biggest blue is "Nigeria"(TC06)
     */


    /**
     *  bubbleChart.hoverMouseOverBubble(bubble color, index in arrayFinder, x-coordinate, y-coordinate;
     */
    // hove biggest yellow
    await bubbleChart.hoverMouseOverBubble('yellow');
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('Russia');

    // hove biggest blue
    await bubbleChart.hoverMouseOverBubble('blue');
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('Nigeria');

    // hove biggest green
    await bubbleChart.hoverMouseOverBubble('green', 0, 10, 10); // fine tune coordinates because other bubble overlaps it
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('United States');

    // hover second biggest red bubble
    await bubbleChart.hoverMouseOverBubble('red', 1);
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('India');
  });

  it('United states bubble data', async () => {
    /**
     * United states have in 2015: GDP: 53354 $/year/person(TC07)
     */
    await bubbleChart.hoverUnitedStates();
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('United States');
    expect(await bubbleChart.axisXValue.getText()).toEqual('54.9k');
  });

  it('only selected bubble get full opacity', async () => {
    /**
     * should check that clicking the bubble of the United States should select it. The bubble gets full opacity,
     * while the other bubbles get lower opacity(TC08)
     */
    expect(await bubbleChart.countBubblesByOpacity(0.3)).toBe(0, 'no elements with low opacity');
    await bubbleChart.clickOnUnitedStates();

    expect(await bubbleChart.getCountryBubble('USA').getCssValue('opacity')).toEqual('1');
    expect(await bubbleChart.countBubblesByOpacity(0.3)).toBe(await bubbleChart.allBubbles.count() - 4);
    expect(await bubbleChart.countBubblesByOpacity(1)).toBe(1);
    expect(await bubbleChart.getCountryBubble('India').getCssValue('opacity')).toEqual('0.3');
  });

  it('drag and drop bubble label', async () => {
    /**
     * should check that label "United States" can be dragged and dropped anywhere in the chart area(TC09)
     */
    await bubbleChart.clickOnCountryBubble('India');

    const initialLabelPosition = await bubbleChart.countrySelectedBiggerLabel.getAttribute('transform');

    await bubbleChart.dragAndDropSelectedCountryLabelBubblesChart(200, 300);
    const newLabelPosition = await bubbleChart.countrySelectedBiggerLabel.getAttribute('transform');

    await expect(initialLabelPosition).not.toEqual(newLabelPosition);

    await bubbleChart.dragAndDropSelectedCountryLabelBubblesChart(250, 100);

    const finalLabelPosition = await bubbleChart.countrySelectedBiggerLabel.getAttribute('transform');
    await expect(newLabelPosition).not.toEqual(finalLabelPosition);
  });

  it('deselect bubble by "X" on tooltip', async () => {
    /**
     * should check that the bubble can be deselected by clicking on the "x" of the label "United States",
     * or by clicking on the bubble(TC10)
     */
    await bubbleChart.clickOnCountryBubble('Bangladesh');
    await bubbleChart.clickXiconOnBubble('Bangladesh');

    expect(await bubbleChart.countryTooltip('Bangladesh').isPresent()).toBe(false, 'tooltip should be hidden');
  });

  it('deselect bubble by click on that bubble', async () => {
    /**
     * should check that the bubble can be deselected by clicking on the "x" of the label "United States",
     * or by clicking on the bubble(TC10)
     */
    await bubbleChart.clickOnCountryBubble('India');
    await bubbleChart.deselectBubble('India');

    expect(await bubbleChart.countryTooltip('India').isPresent()).toBe(false, 'tooltip should be hidden');
  });

  it('trialsegments are left for bubbles on play', async () => {
    /**
     * should check that when select China and the United States bubbles and click on play,
     * the trails being left for those two countries(TC13)
     */
    await bubbleChart.clickOnUnitedStates();

    await slider.playTimesliderSeconds(5);

    expect(await bubbleChart.usaTrails.count()).toBeGreaterThan(20);

    await slider.playTimesliderSeconds(5);

    expect(await bubbleChart.usaTrails.count()).toBeGreaterThan(50);

    await browser.sleep(1000); // TODO remove this after fixing https://github.com/Gapminder/ng2-tools-page/issues/175
  });

  it(`trialsegments are left for bubbles on drag'n'drop`, async () => {
    /**
     * should check that when select China and the United States bubbles and and drag the timeslider,
     * the trails being left for those two countries(TC14)
     */
    await bubbleChart.clickOnCountryBubble('India');

    await slider.dragToMiddle();
    await slider.dragToRightEdge();

    expect(await bubbleChart.indiaTrails.count()).toBeGreaterThan(100);
  });

  it('restore default charts settigns', async () => {
    /**
     * should check that user is able to restore charts to their default values after changing
     * the indicators again and again(TC77)
     */
    // load bubble chart, switch Y to less time-available indicator. Like number of billionaires or something.
    // Check time slider range, it should be restricted to only a few >years.
    // Switch Y back to less: time slider should be back to 1800-2018 or what we had at start
    await bubbleChart.changeYaxisValue('Dollar billionaires');
    expect(await slider.getPosition()).toContain('2007');

    await bubbleChart.changeYaxisValue('Life expectancy');
    expect(await slider.getPosition()).toContain('2007');

    await slider.dragToRightEdge();
    expect(await slider.getPosition()).toContain('2018');
  });

  it('Change Y-axis value', async () => {
    const axisValue = await bubbleChart.changeYaxisValue('Dollar billionaires');

    expect((await commonChartPage.yAxisBtn.safeGetText()).replace(' ▼', '')).toEqual(axisValue);
  });

  it('Change X-axis value', async () => {
    const axisValue = await bubbleChart.changeXaxisValue('Dollar billionaires');

    expect((await commonChartPage.xAxisBtn.safeGetText()).replace(' ▼', '')).toEqual(axisValue);
  });
});
