import { IAdditionalDataItem } from '../descriptors/additional-data-item.descriptor';
import { AlertModel } from './alert.model';

const LABEL_MAP = {
  BarRankChart: 'Rankings',
  BubbleChart: 'Bubbles',
  BubbleMap: 'Maps',
  LineChart: 'Lines',
  MountainChart: 'Mountains'
};
const DEFAULT_TITLE = 'Chart';

export class TabModel {
  public static globalOrder: number = 0;

  public active: boolean;
  public title: string;
  public removable: boolean = true;
  public model: any;
  public additionalData: IAdditionalDataItem[] = [];

  public readerModuleObject: any;
  public readerGetMethod: string;
  public readerPlugins: any[];
  public readerName: string;
  public component: any;
  public instance: any;
  public alerts: AlertModel[] = [];
  public isDataExpired: boolean = false;
  public reloadTime: number;

  private _chartType: string = '';
  private order: number;

  public constructor(chartType: string = '', active: boolean = false, title: string = '') {
    this.chartType = chartType;
    this.order = ++TabModel.globalOrder;
    this.active = active;
    this.title = title ? title : this.getOrderedTitle();
  }

  public getOrder(): number {
    return this.order;
  }

  public get chartType(): string {
    return this._chartType;
  }

  public set chartType(_chartType: string) {
    this._chartType = _chartType;

    if (this.title === `${DEFAULT_TITLE} ${this.order}`) {
      this.title = this.getOrderedTitle();
    }
  }

  private getOrderedTitle(): string {
    return `${LABEL_MAP[this.chartType] || 'Chart'} ${this.order}`;
  }
}
