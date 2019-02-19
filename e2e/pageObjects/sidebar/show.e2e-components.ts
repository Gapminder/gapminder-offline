import { browser, by, element, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitForSpinner, waitForSliderToBeReady } from '../../helpers/helper';
import { waitUntil } from '../../helpers/waitHelper';
import { TreeMenuModal } from './treeMenuModal.e2e-component';

export class Show {
  showSearchInputField: ExtendedElementFinder = _$('input[class="vzb-find-search"]');
  showSearchResult: ExtendedArrayFinder = _$$('div[class*="vzb-show-item vzb-dialog-checkbox"] label'); // TODO
  showButton: ExtendedElementFinder = _$$('[data-btn="show"]').last();
  deselectButton: ExtendedElementFinder = _$('.vzb-find-deselect');

  countryList: ExtendedElementFinder = _$$('[class="vzb-show-item vzb-dialog-checkbox"]').first();
  resetBtn: ExtendedElementFinder = _$('.vzb-show-deselect');
  applyBtn: ExtendedElementFinder = _$('.vzb-show-apply');

  async searchAndSelectCountry(country: string, select = true): Promise<void> {
    await this.showSearchInputField.typeText(country);
    await browser.wait(EC.presenceOf(this.showSearchResult.first()), 5000, 'search results not present');
    const counrtyInSearchResults = await this.showSearchResult.findElementByText(country);
    await counrtyInSearchResults.safeClick();
    await this.applyBtn.safeClick();

    await waitForSpinner();
  }

  async deselectCountryInSearch(country: string): Promise<void> {
    await this.searchAndSelectCountry(country, false);
  }

  async clickOnCountryFromList(country: string): Promise<void> {
    await this.showSearchResult.findElementByText(country).safeClick();
    await this.applyBtn.safeClick();

    await waitForSpinner();
  }

  async clickResetButton(): Promise<void> {
    await this.resetBtn.safeClick();
    await waitForSpinner();
    await waitForSliderToBeReady();
  }
}
