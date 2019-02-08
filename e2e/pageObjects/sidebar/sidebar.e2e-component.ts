import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from 'protractor';

import {
  disableAnimations,
  safeDragAndDrop,
  waitForSpinner,
  waitForSliderToBeReady
} from '../../helpers/helper';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitUntil } from '../../helpers/waitHelper';
import { LineChart } from '../charts/line-chart.po';
import { BubbleChart } from '../charts/bubble-chart.po';
import { MapChart } from '../charts/map-chart.po';
import { RankingsChart } from '../charts/rankings-chart.po';
import { MountainChart } from '../charts/mountain-chart.po';
import { TreeMenuModal } from './treeMenuModal.e2e-component';
import { Color } from './color.e2e-component';
import { Find } from './find.e2e-component';
import { Size } from './size.e2e-component';
import { DialogModal } from './dialogModal.e2e-component';
import { Show } from './show.e2e-components';

export class Sidebar {
  /**
   * Note that sidebar could include specific elements in different charts
   * The elements could be added in constructor
   */
  chart: any;

  /**
   *  Common elements
   *  change it carefully becaues it can affect all charts
   */
  rootElement: ElementFinder = $('.vzb-tool-sidebar');
  sidebar = {
    colorsSection: $('[data-dlg="colors"]'),
    miniMap: $('.vzb-cl-minimap'),
    searchSection: $('.vzb-find-filter'),
    countriesList: $('.vzb-find-list'),
    advancedButtons: $('.vzb-tool-buttonlist')
  };
  yearAtTop: ExtendedElementFinder = _$('.vzb-timedisplay');

  colorSection: Color;
  findSelect: Find;
  size: Size;
  show: Show;
  find: Find;
  dialogModal: DialogModal;
  treeMenuModal: TreeMenuModal;

  /**
   * Search select
   */
  searchInputField: ExtendedElementFinder;
  searchResult: ExtendedArrayFinder;

  /**
   * Advanced buttons section
   */
  advancedSection: ExtendedArrayFinder = _$$('.vzb-tool-buttonlist');

  /**
   * Options
   */
  optionsButton: ExtendedElementFinder = _$$('[data-btn="moreoptions"]').last();
  optionsMenuSizeButton: ExtendedElementFinder = _$$('span[data-vzb-translate="buttons/size"]').last();
  optionsMenuBubblesResizeToddler: ExtendedElementFinder = _$$('.vzb-slider.vzb-slider-bubblesize .w').last();
  optionsXandY = {
    openBtn: $('[data-vzb-translate="buttons/axes"]'),
    xMin: $$('.vzb-mmi-zoomedmin').first(),
    xMax: $$('.vzb-mmi-zoomedmax').first(),
    yMin: $$('.vzb-mmi-zoomedmin').last(),
    yMax: $$('.vzb-mmi-zoomedmax').last()
  };
  optionsMenuHandIcon: ElementFinder = $('.thumb-tack-class-ico-drag[data-dialogtype="moreoptions"]');
  optionsModalDialogue: ElementArrayFinder = $$('div[data-dlg="moreoptions"]');
  optionsOkBtn: ElementFinder = $$('.vzb-dialog-button.vzb-label-primary').last();

  activeOptionsMenu: ExtendedElementFinder = _$('.vzb-accordion-active');
  opacityMenu: ExtendedElementFinder = _$('[data-dlg="opacity"]');
  labelsMenu: ExtendedElementFinder = _$('[data-dlg="label"]');

  /**
   * Zoom
   */
  zoomButton: ExtendedElementFinder = _$$('[data-btn="plus"]').first();

  constructor(chart: any) {
    this.colorSection = new Color();
    this.findSelect = new Find();
    this.size = new Size();
    this.show = new Show();
    this.find = new Find();
    this.dialogModal = new DialogModal();
    this.treeMenuModal = new TreeMenuModal();
    this.chart = chart;
    this.searchResult = chart.searchResult || _$$('.vzb-find-item.vzb-dialog-checkbox label');
    this.searchInputField = chart.searchInputField || _$('.vzb-find-search');
  }

  async waitForVisible(): Promise<void> {
    await browser.wait(EC.visibilityOf(this.rootElement), 10000, `element ${this.rootElement.locator()} not visible`);
  }

  async changeOpacityForNonSelected(): Promise<void> {
    const nonSelectedSlider: ExtendedElementFinder = this.opacityMenu._$$('.vzb-dialog-bubbleopacity-selectdim .handle--e').first();
    await this.changeOpacity(nonSelectedSlider);
  }

  async changeRegularOpacity(): Promise<void> {
    const regularOpacitySlider: ExtendedElementFinder = this.opacityMenu._$$('.vzb-dialog-bubbleopacity-regular .handle--e').first();
    await this.changeOpacity(regularOpacitySlider);
  }

  async changeOpacity(sliderType: ExtendedElementFinder): Promise<void> {
    await this.optionsButton.safeClick();
    await this.opacityMenu.safeClick();
    await safeDragAndDrop(sliderType, { x: -50, y: 0 });
  }

  async moveGroupSlider() {
    await this.optionsButton.safeClick();
    await this.dialogModal.group.safeClick();
    await this.dialogModal.moveGroupSlider();
  }
}
