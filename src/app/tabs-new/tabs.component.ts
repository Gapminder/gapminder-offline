import {Component, ContentChildren, QueryList, Input} from '@angular/core';
import {TabNewComponent} from './tab.component';
import {ITabActionsSynchronizer} from './tabs.common';

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
  @ContentChildren(TabNewComponent) tabs: QueryList<TabNewComponent>;
  @Input() syncActions: ITabActionsSynchronizer;

  selectTab(selectedTab: TabNewComponent) {
    this.tabs.forEach(tab => {
      if (selectedTab !== tab && tab.active) {
        tab.deselect.emit(tab);
        tab.active = false;
      }
    });

    selectedTab.active = true;
    selectedTab.select.emit(selectedTab);
  }

  removeTab(tab: TabNewComponent) {
    const tabsAsArray: Array<TabNewComponent> = this.getTabsAsArray();
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

  protected getClosestTabIndex(index: number): number {
    const tabsAsArray: Array<TabNewComponent> = this.getTabsAsArray();
    const tabsLength = this.tabs.length;

    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step++) {
      const prevIndex = index - step;
      const nextIndex = index + step;

      if (tabsAsArray[nextIndex] && !tabsAsArray[nextIndex].disabled) {
        return nextIndex;
      }

      if (tabsAsArray[prevIndex] && !tabsAsArray[prevIndex].disabled) {
        return prevIndex;
      }
    }

    return -1;
  }

  protected getTabsAsArray(): Array<TabNewComponent> {
    return this.tabs.toArray();
  }
}
