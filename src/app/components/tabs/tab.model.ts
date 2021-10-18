import { IAdditionalDataItem } from '../descriptors/additional-data-item.descriptor';
import { AlertModel } from './alert.model';

const LABEL_MAP = {
  BarRank: 'Rankings',
  BubbleChart: 'Bubbles',
  BubbleMap: 'Maps',
  LineChart: 'Lines',
  MountainChart: 'Mountains'
};
const DEFAULT_TITLE = 'Chart';

export class TabModel {
  static globalOrder = 0;

  active: boolean;
  title: string;
  removable = true;
  model: any;
  additionalData: IAdditionalDataItem[] = [];

  component: any;
  instance: any;
  alerts: AlertModel[] = [];
  isDataExpired = false;
  reloadTime: number;

  private _chartType = '';
  private readonly order: number;

  constructor(chartType: string = '', active: boolean = false, title: string = '') {
    this.chartType = chartType;
    this.order = ++TabModel.globalOrder;
    this.active = active;
    this.title = title ? title : this.getOrderedTitle();
  }

  getOrder(): number {
    return this.order;
  }

  get chartType(): string {
    return this._chartType;
  }

  set chartType(_chartType: string) {
    this._chartType = _chartType;

    if (this.title === `${DEFAULT_TITLE} ${this.order}`) {
      this.title = this.getOrderedTitle();
    }
  }

  private getOrderedTitle(): string {
    return `${LABEL_MAP[this.chartType] || 'Chart'} ${this.order}`;
  }
}
