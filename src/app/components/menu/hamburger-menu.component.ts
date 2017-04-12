import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TabModel } from '../tabs/tab.model';
import { ChartService } from '../tabs/chart.service';

@Component({
  selector: 'ae-hamburger-menu',
  template: require('./hamburger-menu.component.html')
})
export class HamburgerMenuComponent {
  @Input() public isMenuOpened: boolean = false;
  @Input() public tabsModel: TabModel[];
  @Output() public onMenuItemSelected: EventEmitter<any> = new EventEmitter();

  private chartService: ChartService;

  public constructor(chartService: ChartService) {
    this.chartService = chartService;
  }

  public execute(methodName: string): void {
    this.onMenuItemSelected.emit(methodName);
  }

  public getCurrentTab(): TabModel {
    return this.chartService.getCurrentTab(this.tabsModel);
  }

  public areChartsAvailable(): boolean {
    return this.chartService.areChartsAvailable(this.tabsModel);
  }
}
