import { IAdditionalDataItem } from './additional-data-item.descriptor';

export interface ChartTypeOption {
  value: string;
  title: string;
}

export class DdfFolderDescriptor {
  public ddfUrl: string;
  public ddfFolderName: string;
  public additionalData: IAdditionalDataItem[] = [];
  public chartTypes: ChartTypeOption[] = [
    {value: 'BubbleChart', title: 'Bubble Chart'},
    {value: 'MountainChart', title: 'Mountain Chart'},
    {value: 'BubbleMap', title: 'Bubble Map'}
  ];
  public chartType: string = this.chartTypes[0].value;

  public defaults(): void {
    this.ddfUrl = this.getUrl();
  }

  public getUrl(): string {
    return DdfFolderDescriptor.electronPath.replace(/app\.asar/, '') + this.ddfFolderName;
  }

  static electronPath: string = "";
  static isDevMode: boolean;

  constructor(ddfFolderName = 'ddf--gapminder--systema_globalis') {
    this.ddfFolderName = ddfFolderName;
    this.ddfUrl = this.getUrl();
  }
}
