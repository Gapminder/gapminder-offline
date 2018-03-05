import * as fs from 'fs';
import { Injectable, OnDestroy } from '@angular/core';
import { TabModel } from '../tabs/tab.model';

const timeHash: any = {};

@Injectable()
export class FreshenerService implements OnDestroy {
  private activePaths: string[] = [];
  private activeTab: TabModel;
  private interval: number;

  public constructor() {
    this.interval = setInterval(() => {
      if (!this.activeTab) {
        return;
      }

      let modificationFlag = false;

      for (const activePath of this.activePaths) {
        const modificationTime = fs.statSync(activePath).mtime;
        const key = this.getKey(activePath);

        if (activePath && modificationTime > timeHash[key]) {
          modificationFlag = true;
        }

        timeHash[key] = modificationTime;
      }

      if (modificationFlag) {
        this.activeTab.isDataExpired = true;
      }
    }, 10000);
  }

  public ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  public reloadAlert(what: any, tab: TabModel): void {
    this.activeTab = tab;
    this.activePaths = what;

    for (const activePath of this.activePaths) {
      const key = this.getKey(activePath);

      if (!timeHash[key]) {
        timeHash[key] = fs.statSync(activePath).mtime;
      }
    }
  }

  private getKey(activePath: string): string {
    return `${this.activeTab.getOrder()}${activePath}`;
  }
}
