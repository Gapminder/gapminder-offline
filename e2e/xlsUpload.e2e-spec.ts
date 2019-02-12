import { $, $$, browser, ExpectedConditions as EC } from 'protractor';
import * as fs from 'fs';

import { CommonChartPage } from './pageObjects/charts/common-chart.po';
import { Header } from './pageObjects/components/header.e2e-component';
import { disableAnimations } from './helpers/helper';

const header: Header = new Header();
const commonChartPage: CommonChartPage = new CommonChartPage();

// TODO: fix that test
xdescribe('Upload Excel: ', () => {
  const positiveFilePath = './e2e/additional_files/positive-xls/';
  const negativeFilePath = './e2e/additional_files/negative-xls/';
  const positiveFilesToUpload = fs.readdirSync(positiveFilePath);
  const negativeFilesToUpload = fs.readdirSync(negativeFilePath);

  beforeEach(async () => {
    await disableAnimations();
  });

  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  for (const fileToUpload of positiveFilesToUpload) {
    it(`Positive: ${fileToUpload}`, async () => {
      const absolutePath = fs.realpathSync(positiveFilePath + fileToUpload);

      await header.uploadXls(absolutePath, fileToUpload);
      await browser.wait(EC.visibilityOf(CommonChartPage.mainChart), 20000);

      await expect($$('.vzb-bc-entity').first().isDisplayed()).toBeTruthy();
    });
  }

  for (const fileToUpload of negativeFilesToUpload) {
    it(`Negative: ${fileToUpload}`, async () => {
      const absolutePath = fs.realpathSync(negativeFilePath + fileToUpload);

      await header.uploadXls(absolutePath, fileToUpload);

      await expect($('.vzb-placeholder.vzb-error').isDisplayed()).toBeTruthy();
    });
  }
});
