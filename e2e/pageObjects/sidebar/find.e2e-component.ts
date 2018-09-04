import { browser, by, element, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { waitForSpinner } from '../../helpers/helper';
import { waitUntil } from '../../helpers/waitHelper';
import { TreeMenuModal } from './treeMenuModal.e2e-component';

export class Find {
  private treeMenuModal: TreeMenuModal = new TreeMenuModal();

  findButton: ExtendedElementFinder = _$$('[data-btn="find"]').last();
  countriesInFindModal: ExtendedArrayFinder = _$$('.vzb-find-item.vzb-dialog-checkbox');
  searchInputField: ExtendedElementFinder = _$('.vzb-find-search');
  searchResult: ExtendedArrayFinder = _$$('.vzb-find-item.vzb-dialog-checkbox label');
  countriesList: ExtendedArrayFinder = _$$('.vzb-find-list > div'); // TODO
  deselectButton: ExtendedElementFinder = _$('.vzb-find-deselect');

  async searchAndSelectCountry(country: string, select = true): Promise<void> {
    /**
     * this method can be used to both select and deselect country
     * LineChart-page use it's own selectors
     */
    await this.searchInputField.typeText(country);
    await browser.wait(EC.presenceOf(this.searchResult.first()), 5000, 'search results not present');
    const counrtyInSearchResults = await this.searchResult.findElementByText(country);
    await counrtyInSearchResults.safeClick();

    await waitForSpinner();
  }

  async deselectCountryInSearch(country: string): Promise<void> {
    await this.searchAndSelectCountry(country, false);
  }

  async deselectAllCountries(): Promise<void> {
    await this.deselectButton.safeClick();
  }

  async clickOnFindButton(): Promise<void> {
    await this.findButton.safeClick();
    await browser.wait(EC.visibilityOf(this.countriesInFindModal.first()));
  }

  async clickOnCountryFromList(country: string): Promise<void> {
    await this.searchResult.findElementByText(country).safeClick();

    await waitForSpinner();
  }

  async hoverCountryFromList(country: string): Promise<void> {
    await this.searchResult.findElementByText(country).hover();
  }

}
