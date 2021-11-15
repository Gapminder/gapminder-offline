import { browser, by, element, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitForSpinner } from '../../helpers/helper';
import { waitUntil } from '../../helpers/waitHelper';
import { TreeMenuModal } from './treeMenuModal.e2e-component';

export class Color {
  treeMenuModal: TreeMenuModal = new TreeMenuModal();
  colorBtn: ExtendedElementFinder = _$$('[data-btn="colors"]').last();
  colorDropDownBtn: ExtendedElementFinder = _$$('span[class="vzb-ip-select"]').first();
  colorLabel: ExtendedElementFinder = this.colorDropDownBtn;
  color = {
    childMortalityRate: this.treeMenuModal.listItems.get(3), // TODO add test class to vizabi
    incomePerPerson: this.treeMenuModal.listItems.get(4), // TODO add test class to vizabi
    mainReligion: element(by.cssContainingText('.vzb-treemenu-list-item-label', 'Main religion')),
    firstColor: _$$('.vzb-cl-color-sample').first()
  };
  colorAsiaRegion = 'rgb(255, 88, 114)'; //red
  minimapAsiaRegion = _$$('.vzb-cl-minimap').$$(`path[style*='fill: ${this.colorAsiaRegion}']`).first();
  minimapDropdown: ExtendedElementFinder = _$('[class=vzb-cl-select-dialog]'); // will find any active(mobile or desktop)

  async selectInColorDropdown(element: ExtendedElementFinder | ElementFinder): Promise<void> {
    await this.colorDropDownBtn.safeClick();

    if (element instanceof ExtendedElementFinder) {
      await element.safeClick();
    } else {
      await new ExtendedElementFinder(element).safeClick();
    }

    await waitForSpinner();
  }

  async getColorFromColorSection(): Promise<string> {
    const style = await this.color.firstColor.safeGetAttribute('style');

    const color = style.slice(style.indexOf('background-color: '), style.indexOf(';'))
      .replace('background-color: ', '');

    return color;
  }


  async hoverMinimapRegion(region: string): Promise<void> {
    await browser.actions().mouseMove(this.minimapAsiaRegion, { x: 20, y: 10 }).perform();
  }


  async clickMinimapRegion(region?: string): Promise<void> {
    await browser.actions().mouseMove(this.minimapAsiaRegion, { x: 20, y: 10 }).perform();
    await browser.actions().click().perform();
  }

  async removeEverythingElseInMinimap() {
    await this.clickMinimapRegion();
    await this.minimapDropdown._$$('.vzb-cl-select-dialog-item').get(1).safeClick();
    await waitForSpinner();
  }

  async selectAllInThisGroup() {
    await this.clickMinimapRegion();
    await this.minimapDropdown._$$('.vzb-cl-select-dialog-item').get(0).safeClick();
    await waitForSpinner();
  }

  async changeColor(index?: number) {
    await this.colorDropDownBtn.safeClick();
    await this.treeMenuModal.listItems.get(index || 3).safeClick();
    await waitForSpinner();
  }

  async searchAndSelectInColorDropdown(colorOption: string) {
    await this.colorDropDownBtn.safeClick();
    const option = await this.treeMenuModal.searchForItem(colorOption);
    await option.safeClick();
    await waitForSpinner();
  }
}
