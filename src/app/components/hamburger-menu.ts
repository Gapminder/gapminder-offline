import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TabModel} from './tab-model';

@Component({
  selector: 'ae-hamburger-menu',
  template: `
<ul role="menu" aria-labelledby="single-button" class="menu show-menu" *ngIf="isMenuOpen">
    <li class="menu-item submenu">
        <button type="button" class="menu-btn"><span class="menu-text">New chart</span></button>
        <ul class="menu">
            <li class="menu-item" (click)="execute('doGapminderChart')">
                <button type="button" class="menu-btn"><span class="menu-text">Gapminder data</span> </button>
            </li>
            <li class="menu-item submenu">
                <button type="button" class="menu-btn"><span class="menu-text">Your data (bubble chart only)</span> </button>
                <ul class="menu">
                    <li class="menu-item" (click)="execute('doNewCsvFile')">
                        <button type="button" class="menu-btn"><span class="menu-text">CSV file...</span> </button>
                    </li>
                    <li class="menu-item" (click)="execute('doNewDdfFolder')">
                        <button type="button" class="menu-btn"><span class="menu-text">DDF folder</span> </button>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li class="menu-item submenu">
        <button type="button" class="menu-btn"><span class="menu-text">Add your data</span></button>
        <ul class="menu">
            <li class="menu-item" *ngIf="currentTab.selectedChartType" (click)="execute('doAddCsvFile')">
                <button type="button" class="menu-btn"><span class="menu-text">CSV file...</span> </button>
            </li>
            <li class="menu-item" *ngIf="currentTab.selectedChartType" (click)="execute('doAddDdfFolder')">
                <button type="button" class="menu-btn"><span class="menu-text">DDF folder</span> </button>
            </li>
            <li class="menu-item" *ngIf="!currentTab.selectedChartType">
                <button type="button" class="menu-btn"><span class="menu-text" style="color: grey">CSV file...</span> </button>
            </li>
            <li class="menu-item" *ngIf="!currentTab.selectedChartType">
                <button type="button" class="menu-btn"><span class="menu-text" style="color: grey">DDF folder</span> </button>
            </li>
        </ul>
    </li>
    <li class="menu-separator"></li>
    <li class="menu-item" (click)="execute('doOpen')">
        <button type="button" class="menu-btn"><span class="menu-text">Open...</span></button>
    </li>
    <li class="menu-item" *ngIf="currentTab.selectedChartType" (click)="execute('doSave')">
        <button type="button" class="menu-btn"><span class="menu-text">Save...</span></button>
    </li>
    <li class="menu-item" *ngIf="!currentTab.selectedChartType">
        <button type="button" class="menu-btn"><span class="menu-text" style="color: grey">Save...</span></button>
    </li>
    <li class="menu-item" *ngIf="currentTab.selectedChartType === 'BubbleChart'" (click)="execute('doExportForWeb')">
        <button type="button" class="menu-btn"><span class="menu-text">Export for Web...</span></button>
    </li>
    <li class="menu-item" *ngIf="currentTab.selectedChartType !== 'BubbleChart'">
        <button type="button" class="menu-btn"><span class="menu-text" style="color: grey">Export for Web...</span></button>
    </li>
    <li class="menu-separator"></li>
    <li class="menu-item" (click)="execute('checkForUpdates')">
        <button type="button" class="menu-btn"><span class="menu-text">Check for updates...</span></button>
    </li>
    <li class="menu-item" (click)="execute('openDevTools')">
        <button type="button" class="menu-btn"><span class="menu-text">Open Developer Tools</span> </button>
    </li>
</ul>
`
})
export class HamburgerMenuComponent {
  @Input() isMenuOpen: boolean = false;
  @Input() currentTab: TabModel;
  @Output() onMenuItemSelected: EventEmitter<any> = new EventEmitter();

  execute(methodName: string) {
    this.onMenuItemSelected.emit(methodName);
  }
}
