import {IAdditionalDataItem} from '../descriptors/additional-data-item.descriptor';

export class TabModel {
  static globalOrder: number = 0;

  public active: boolean;
  public title: string;
  public removable: boolean = true;
  public model: any;
  public additionalData: Array<IAdditionalDataItem> = [];

  public readerModuleObject: any;
  public readerGetMethod: string;
  public readerParams: Array<any>;
  public readerName: string;
  public extResources: any;
  public component: any;
  public instance: any;

  private order: number;

  constructor(public chartType: string = '', active: boolean = false, title: string = '') {
    this.order = ++TabModel.globalOrder;
    this.active = active;
    this.title = title ? title : `Chart ${this.order}`;
  }

  public getOrder() {
    return this.order;
  }
}
