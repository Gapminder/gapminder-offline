import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TabModel } from '../tabs/tab.model';
import { ChartService } from '../tabs/chart.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html'
})
export class HamburgerMenuComponent {
  @Input() isMenuOpened = false;
  @Input() tabsModel: TabModel[];
  @Output() onMenuItemSelected: EventEmitter<any> = new EventEmitter();

  private chartService: ChartService;

  constructor(chartService: ChartService) {
    this.chartService = chartService;
  }

  execute(methodName: string) {
    this.onMenuItemSelected.emit(methodName);
  }

  getCurrentTab(): TabModel {
    return this.chartService.getCurrentTab(this.tabsModel);
  }

  areChartsAvailable(): boolean {
    return this.chartService.areChartsAvailable(this.tabsModel);
  }
}
