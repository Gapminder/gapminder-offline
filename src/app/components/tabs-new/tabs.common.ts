export interface ITabActionsSynchronizer {
  onSetTabActive(index: number);
  onTabRemove(index: number);
  onTabChanged(tab: any, index: number);
}
