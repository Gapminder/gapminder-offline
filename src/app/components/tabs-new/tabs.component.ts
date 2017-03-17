import { Component, ContentChildren, QueryList, Input } from '@angular/core';
import { TabNewComponent } from './tab.component';
import { ITabActionsSynchronizer } from './tabs.common';

@Component({
  selector: 'ae-tabs-new',
  template: `
      <div class = "tab-container" style = "height: 100%;">
          <ul class = "nav nav-tabs" (click) = "$event.preventDefault()">
              <li class = "nav-item">
                  <ng-content select = "[tabs-head]"></ng-content>
              </li>
              <li *ngFor = "let tab of tabs" class = "nav-item" [class.active] = "tab.active">
                  <a href = "javascript:void(0);" class = "nav-link"
                     [class.active] = "tab.active"
                     (click) = "selectTab(tab)">
                      <span>{{tab.title}}</span>
                      <span *ngIf = "tab.removable" (click) = "$event.preventDefault(); removeTab(tab);"
                            class = "glyphicon glyphicon-remove-circle"></span>
                  </a>
              </li>
              <li class = "nav-item">
                  <ng-content select = "[tabs-tail]"></ng-content>
              </li>
          </ul>
          <div class = "tab-content" style = "height: 100%;">
              <ng-content></ng-content>
          </div>
      </div>
  `
})
export class TabsNewComponent {
  @ContentChildren(TabNewComponent) public tabs: QueryList<TabNewComponent>;
  @Input() public syncActions: ITabActionsSynchronizer;

  public selectTab(selectedTab: TabNewComponent): void {
    this.tabs.forEach((tab: TabNewComponent) => {
      if (selectedTab !== tab && tab.active) {
        tab.deselect.emit(tab);
        tab.active = false;
      }
    });

    selectedTab.active = true;
    selectedTab.select.emit(selectedTab);
  }

  public removeTab(tab: TabNewComponent): void {
    const tabsAsArray: TabNewComponent[] = this.getTabsAsArray();
    const index = tabsAsArray.indexOf(tab);

    if (index === -1) {
      return;
    }

    let newActiveIndex = -1;

    if (this.tabs.length > 1) {
      newActiveIndex = this.getClosestTabIndex(index);

      if (newActiveIndex >= 0) {
        this.syncActions.onSetTabActive(newActiveIndex);
      }
    }

    tab.remove.emit({tab: this.tabs[index], newActiveIndex});
    this.syncActions.onTabRemove(index);
  }

  protected getClosestTabIndex(currentIndex: number): number {
    const tabsAsArray: TabNewComponent[] = this.getTabsAsArray();
    const tabsLength = this.tabs.length;
    const isIndexExpected = (index: number) => tabsAsArray[index] && !tabsAsArray[index].disabled;

    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step++) {
      const prevIndex = currentIndex - step;
      const nextIndex = currentIndex + step;

      if (isIndexExpected(nextIndex)) {
        return nextIndex;
      }

      if (isIndexExpected(prevIndex)) {
        return prevIndex;
      }
    }

    return -1;
  }

  protected getTabsAsArray(): TabNewComponent[] {
    return this.tabs.toArray();
  }
}
