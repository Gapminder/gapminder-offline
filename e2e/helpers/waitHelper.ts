import { browser, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { ExtendedElementFinder } from './ExtendedElementFinder';

const TIMEOUT = 10000;

export function waitUntil(element: ElementFinder | ExtendedElementFinder) {
  return browser.wait(EC.visibilityOf(element), TIMEOUT, `element ${element.locator().value} not visible`);
}

export function waitStaleness(element: ElementFinder | ExtendedElementFinder) {
  return browser.wait(EC.stalenessOf(element), TIMEOUT, `element ${element.locator().value} not visible`);
}
