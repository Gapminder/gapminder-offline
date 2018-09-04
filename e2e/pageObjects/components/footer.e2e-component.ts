import { $, ElementFinder } from 'protractor';

export class Footer {
  rootSelector: ElementFinder = $('.footer-container');
  chartType;

  constructor(chart: any) {
    this.chartType = chart;
  }
}
