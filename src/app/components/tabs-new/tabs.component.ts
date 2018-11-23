import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { TabNewComponent } from './tab.component';
import { ITabActionsSynchronizer } from './tabs.common';
import { MessageService } from '../../message.service';
import { Subscription } from 'rxjs/Subscription';
import {
  CLEAR_EDITABLE_TABS_ACTION, TABS_LOGO_ACTION, TABS_ADD_TAB_ACTION, SWITCH_MENU_ACTION,
  MODEL_CHANGED, SET_ACTIVE_TAB, REMOVE_TAB
} from '../../constants';

const TAB_TIMEOUT = 100;
const SCROLL_TIMEOUT = 200;

@Component({
  selector: 'app-tabs-new',
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsNewComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(TabNewComponent) tabs: QueryList<TabNewComponent>;
  @Input() syncActions: ITabActionsSynchronizer;
  @Input() disabled: boolean;

  @ViewChild('tabsContainer') tabsContainer: ElementRef;
  messageService: MessageService;
  subscription: Subscription;

  private intervalId: any;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
    this.subscription = this.messageService.getMessage()
      .subscribe((event: any) => {
        if (event.message === CLEAR_EDITABLE_TABS_ACTION && !this.disabled) {
          const isEditMode = !!this.getEditableTab();
          const isOptionParamExists = () => !!event.options;
          const isTargetExists = () => isOptionParamExists() && event.options.target;
          const isClassListExists = () => isTargetExists() && event.options.target.classList;
          const hasExpectedClass = (expectedClass: string) => isClassListExists() && event.options.target.classList.contains(expectedClass);

          if (!hasExpectedClass('editTabInput') && !hasExpectedClass('doNotEditTabInput') && isEditMode) {
            this.resetEditMode();
          }
        }

        if (event.message === SET_ACTIVE_TAB) {
          const selectedTab = event.options;

          if (!this.disabled) {
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

          this.messageService.sendMessage(MODEL_CHANGED);
        }

        if (event.message === REMOVE_TAB) {
          const tab = event.options;
          const tabsAsArray: TabNewComponent[] = this.getTabsAsArray();
          const index = tabsAsArray.indexOf(tab);

          if (index === -1) {
            return;
          }

          tab.remove.emit({tab: this.tabs[index]});
          this.syncActions.onTabRemove(index);
        }
      });
  }

  ngAfterViewInit() {
    this.tabs.changes.subscribe(() => {
      this.tabs.forEach((tab: TabNewComponent) => {
        tab.editMode = false;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getEditableTab(): TabNewComponent {
    return this.tabs.find((tab: TabNewComponent) => tab.editMode);
  }

  getTabIndex(currentTab: TabNewComponent): number {
    let currentTabIndex = -1;

    this.tabs.forEach((tab: TabNewComponent, index: number) => {
      if (tab === currentTab) {
        currentTabIndex = index;
      }
    });

    return currentTabIndex;
  }

  selectTab(selectedTab: TabNewComponent) {
    this.messageService.sendMessage(SET_ACTIVE_TAB, selectedTab);
  }

  removeTab(tab: TabNewComponent) {
    if (!this.disabled) {
      this.messageService.sendMessage(REMOVE_TAB, tab);
    }
  }

  getTabsAsArray(): TabNewComponent[] {
    return this.tabs.toArray();
  }

  applyEditedTitle() {
    if (!this.disabled) {
      const editableTab = this.getEditableTab();

      editableTab.applyEditedTitle();
      this.syncActions.onTabChanged(editableTab, this.getTabIndex(editableTab));
    }
  }

  dismissEditedTitle() {
    if (!this.disabled) {
      this.getEditableTab().dismissEditedTitle();
    }
  }

  resetEditMode() {
    if (!this.disabled) {
      this.tabs.forEach((tab: TabNewComponent, index: number) => {
        if (tab.editMode) {
          tab.editMode = false;
          this.syncActions.onTabChanged(tab, index);
        }
      });
    }
  }

  logoAction() {
    this.messageService.sendMessage(TABS_LOGO_ACTION);
  }

  addTabAction() {
    this.messageService.sendMessage(TABS_ADD_TAB_ACTION);

    const el = this.tabsContainer.nativeElement;

    setTimeout(() => {
      el.scrollLeft = el.scrollWidth;
    }, TAB_TIMEOUT);
  }

  switchMenuAction(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.messageService.sendMessage(SWITCH_MENU_ACTION);
  }

  actionScroll(direction: number) {
    const el = this.tabsContainer.nativeElement;
    const tabWidthWithDirection = direction * el.children[0].getBoundingClientRect().width;

    el.scrollLeft += tabWidthWithDirection;
  }

  actionScrollStart(direction: number) {
    if (!this.intervalId) {
      this.actionScroll(direction);

      this.intervalId = setInterval(() => {
        this.actionScroll(direction);
      }, SCROLL_TIMEOUT);
    }
  }

  actionScrollFinish() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  autoScroll() {
    const el = this.tabsContainer.nativeElement;

    el.scrollLeft = el.scrollLeft;
  }

  canMoveRight(): boolean {
    const el = this.tabsContainer.nativeElement;

    return el.scrollLeft > 0;
  }

  canMoveLeft(): boolean {
    const el = this.tabsContainer.nativeElement;
    const width = Math.ceil(el.getBoundingClientRect().width);
    const scrollWidth = Math.ceil(el.scrollWidth);
    const scrollLeft = Math.ceil(el.scrollLeft);

    return scrollWidth > width && scrollWidth - scrollLeft !== width;
  }
}
