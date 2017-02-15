import {Component, ContentChildren, AfterContentInit, QueryList, Input} from '@angular/core';
import {TabNewComponent} from './tab.component';

@Component({
  selector: 'ae-tabs-new',
  template: `
      <div class = "tab-container" *ngIf = "model" style = "height: 100%;">
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
export class TabsNewComponent implements AfterContentInit {
  @ContentChildren(TabNewComponent) tabs: QueryList<TabNewComponent>;
  @Input() model: Array<any>;

  ngAfterContentInit() {
  }

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
    const tabsArr: Array<any> = this.tabs.toArray();
    const index = tabsArr.indexOf(tab);

    if (index === -1) {
      return;
    }

    let newActiveIndex = -1;

    if (this.tabs.length > 1) {
      newActiveIndex = this.getClosestTabIndex(index);

      if (newActiveIndex >= 0) {
        this.tabs.forEach(tab => tab.active = false);
        tabsArr[newActiveIndex].active = true;
        this.model[newActiveIndex].active = true;
      }
    }

    tab.remove.emit({tab: this.tabs[index], newActiveIndex});
    this.model.splice(index, 1);
  }

  protected getClosestTabIndex(index: number): number {
    const tabsArr: Array<any> = this.tabs.toArray();
    const tabsLength = this.tabs.length;

    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step += 1) {
      const prevIndex = index - step;
      const nextIndex = index + step;

      if (tabsArr[nextIndex] && !tabsArr[nextIndex].disabled) {
        return nextIndex;
      }

      if (tabsArr[prevIndex] && !tabsArr[prevIndex].disabled) {
        return prevIndex;
      }
    }

    return -1;
  }
}
