import { isEmpty } from 'lodash';
import { Injectable } from '@angular/core';
import { TabModel } from '../tabs/tab.model';
import { IAdditionalDataItem } from '../descriptors/additional-data-item.descriptor';
import { ElectronService } from '../../providers/electron.service';

const timeHash: any = {};

@Injectable()
export class FreshenerService {
  private activeTab: TabModel;

  constructor(private es: ElectronService) {
  }

  checkCurrentTabModification(tab: TabModel) {
    if (tab && tab.model) {
      this.activeTab = tab;

      const activePaths = [this.activeTab.model.data.path];

      if (!isEmpty(this.activeTab.additionalData)) {
        const additionalPaths =
          this.activeTab.additionalData.map((additionalItem: IAdditionalDataItem) => additionalItem.path);

        activePaths.push(...additionalPaths);
      }

      this.checkPathModification(activePaths);
    }
  }

  private getKey(activePath: string): string {
    return `${this.activeTab.getOrder()}${activePath}`;
  }

  private checkPathModification(activePaths: string[]) {
    let modificationFlag = false;

    for (const activePath of activePaths) {
      const modificationTime = this.es.fs.statSync(activePath).mtime.getTime();
      const key = this.getKey(activePath);

      if (activePath && !!timeHash[key] && modificationTime !== timeHash[key]) {
        modificationFlag = true;
      }

      timeHash[key] = modificationTime;
    }

    if (modificationFlag) {
      this.activeTab.isDataExpired = true;
    }
  }
}
