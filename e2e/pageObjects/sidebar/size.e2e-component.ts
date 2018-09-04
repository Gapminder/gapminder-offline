import { browser, by, element, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitForSpinner, safeDragAndDrop } from '../../helpers/helper';
import { waitUntil } from '../../helpers/waitHelper';
import { TreeMenuModal } from './treeMenuModal.e2e-component';
import { DialogModal } from './dialogModal.e2e-component';

export class Size {
  private treeMenuModal: TreeMenuModal = new TreeMenuModal();
  private dialogModal: DialogModal = new DialogModal();

  sizeDropDown: ExtendedElementFinder = _$$('span[class="vzb-ip-select"]').get(1);
  // sizeListBabiesPerWomanColorIndicator: ExtendedElementFinder = this.colorListItems.first();
  sizeListBabiesPerWomanColorIndicator: ExtendedElementFinder = this.treeMenuModal.listItems.first();
  sizeLabel: ExtendedElementFinder = this.sizeDropDown;
  resizeToddler: ExtendedElementFinder = _$$('.vzb-slider.vzb-slider-bubblesize .w').last();

  async moveSizeSlider(): Promise<void> {
    await safeDragAndDrop(this.resizeToddler, { x: 60, y: 0 });
  }

  async changeSizeIndicator() {
    await this.dialogModal.sizeDropdown.safeClick();
    await this.treeMenuModal.listItems.first().safeClick();
    await waitForSpinner();
  }

  async getCurrentSizeIndicator() {
    let sizeIndicator: string;
    sizeIndicator = await this.sizeDropDown.safeGetText();

    return sizeIndicator;
  }
}