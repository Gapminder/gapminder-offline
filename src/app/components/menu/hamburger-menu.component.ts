import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TabModel } from '../tabs/tab.model';
import { ChartService } from '../tabs/chart.service';
import { LocalizationService } from '../../providers/localization.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html'
})
export class HamburgerMenuComponent {
  @Input() isMenuOpened = false;
  @Input() tabsModel: TabModel[];
  @Output() onMenuItemSelected: EventEmitter<any> = new EventEmitter();

  constructor(public chartService: ChartService, public ls: LocalizationService) {
    this.chartService = chartService;
  }

  execute(methodName: string, ...params) {
    if (params && params.length > 0) {
      const methodWithParams = `${methodName}@${JSON.stringify(params)}`;
      this.onMenuItemSelected.emit(methodWithParams);
      return;
    }

    this.onMenuItemSelected.emit(methodName);
  }

  getCurrentTab(): TabModel {
    return this.chartService.getCurrentTab(this.tabsModel);
  }

  areChartsAvailable(): boolean {
    return this.chartService.areChartsAvailable(this.tabsModel);
  }
}
