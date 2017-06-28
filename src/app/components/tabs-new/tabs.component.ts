import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { TabNewComponent } from './tab.component';
import { ITabActionsSynchronizer } from './tabs.common';
import { MessageService } from '../../message.service';
import { Subscription } from 'rxjs/Subscription';
import { CLEAR_EDITABLE_TABS_ACTION } from '../../constants';

@Component({
  selector: 'ae-tabs-new',
  template: `
      <div class = "tab-container" style = "height: 100%;">
          <ul #tabsContainer class = "nav nav-tabs" (click) = "$event.preventDefault()">
              <li class = "nav-item">
                  <ng-content select = "[tabs-head]"></ng-content>
              </li>
              <li *ngFor = "let tab of tabs" class = "nav-item" [class.active] = "tab.active">
                  <a href = "javascript:void(0);" class = "nav-link"
                     [class.active] = "tab.active"
                     (click) = "selectTab(tab)">
                      <span *ngIf = "!tab.editMode"
                            class = "doNotEditTabInput">{{tab.title}}</span>
                      <span *ngIf = "tab.editMode">
                          <ae-tab-title-edit (blur) = "resetEditMode()"
                                             (enter) = "applyEditedTitle()"
                                             (esc) = "dismissEditedTitle()"
                                             [title] = "tab.title"
                                             (titleChange) = "tab.title=$event">
                          </ae-tab-title-edit>
                      </span>
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
export class TabsNewComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(TabNewComponent) public tabs: QueryList<TabNewComponent>;
  @Input() public syncActions: ITabActionsSynchronizer;

  @ViewChild('tabsContainer') public tabsContainer: ElementRef;
  public messageService: MessageService;
  public subscription: Subscription;

  public constructor(messageService: MessageService) {
    this.messageService = messageService;
    this.subscription = this.messageService.getMessage()
      .subscribe((event: any) => {
        if (event.message === CLEAR_EDITABLE_TABS_ACTION) {
          const isEditMode = !!this.getEditableTab();
          const isOptionParamExists = () => !!event.options;
          const isTargetExists = () => isOptionParamExists() && event.options.target;
          const isClassListExists = () => isTargetExists() && event.options.target.classList;
          const hasExpectedClass = (expectedClass: string) => isClassListExists() && event.options.target.classList.contains(expectedClass);

          if (!hasExpectedClass('editTabInput') && !hasExpectedClass('doNotEditTabInput') && isEditMode) {
            this.resetEditMode();
          }
        }
      });
  }

  public ngAfterViewInit(): void {
    this.tabs.changes.subscribe(() => {
      this.tabs.forEach((tab: TabNewComponent) => {
        tab.editMode = false;
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getEditableTab(): TabNewComponent {
    return this.tabs.find((tab: TabNewComponent) => tab.editMode);
  }

  public getTabIndex(currentTab: TabNewComponent): number {
    let currentTabIndex = -1;

    this.tabs.forEach((tab: TabNewComponent, index: number) => {
      if (tab === currentTab) {
        currentTabIndex = index;
      }
    });

    return currentTabIndex;
  }

  public selectTab(selectedTab: TabNewComponent): void {
    let editModeFired = false;

    this.tabs.forEach((tab: TabNewComponent) => {
      if (selectedTab !== tab && tab.active) {
        tab.deselect.emit(tab);
        tab.active = false;
      }

      if (selectedTab === tab && tab.active) {
        tab.editMode = true;
        editModeFired = true;
      }
    });

    selectedTab.active = true;
    selectedTab.select.emit(selectedTab);

    if (!editModeFired) {
      this.resetEditMode();
    }
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

  public getTabsAsArray(): TabNewComponent[] {
    return this.tabs.toArray();
  }

  public applyEditedTitle(): void {
    const editableTab = this.getEditableTab();

    editableTab.applyEditedTitle();
    this.syncActions.onTabChanged(editableTab, this.getTabIndex(editableTab));
  }

  public dismissEditedTitle(): void {
    this.getEditableTab().dismissEditedTitle();
  }

  public resetEditMode(): void {
    this.tabs.forEach((tab: TabNewComponent, index: number) => {
      if (tab.editMode) {
        tab.editMode = false;
        this.syncActions.onTabChanged(tab, index);
      }
    });
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
}
