import { IAdditionalDataItem } from '../descriptors/additional-data-item.descriptor';

export class TabModel {
  public static globalOrder: number = 0;

  public chartType: string = '';
  public active: boolean;
  public title: string;
  public removable: boolean = true;
  public model: any;
  public additionalData: IAdditionalDataItem[] = [];

  public readerModuleObject: any;
  public readerGetMethod: string;
  public readerParams: any[];
  public readerName: string;
  public extResources: any;
  public component: any;
  public instance: any;

  private order: number;

  public constructor(chartType: string = '', active: boolean = false, title: string = '') {
    this.chartType = chartType;
    this.order = ++TabModel.globalOrder;
    this.active = active;
    this.title = title ? title : `Chart ${this.order}`;
  }

  public getOrder(): number {
    return this.order;
  }
}
