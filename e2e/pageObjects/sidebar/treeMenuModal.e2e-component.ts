import { ExtendedElementFinder, _$, ExtendedArrayFinder, _$$ } from "../../helpers/ExtendedElementFinder";
import { browser } from "protractor";

export class TreeMenuModal {
  treeMenuModal: ExtendedElementFinder = _$('.vzb-treemenu-wrap-outer');
  searchInput: ExtendedElementFinder = _$('.vzb-treemenu-search');
  listItems: ExtendedArrayFinder = _$$('span[class="vzb-treemenu-list-item-label"]');

  async searchForItem(item: string): Promise<ExtendedElementFinder> {
    await this.searchInput.typeText(item);
    await browser.sleep(1000);

    return this.listItems.first();
  }

  async clickOnItem(index = 0): Promise<string> {
    const item = this.listItems.get(index);
    const itemName = await item.safeGetText();

    await item.safeClick();

    return itemName
  }
}