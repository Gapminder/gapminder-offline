import { IAdditionalDataItem } from './additional-data-item.descriptor';

export interface ChartTypeOption {
  value: string;
  title: string;
}

export class DdfFolderDescriptor {
  public ddfUrl: string;
  public additionalData: IAdditionalDataItem[] = [];
  public chartTypes: ChartTypeOption[] = [
    {value: 'BubbleChart', title: 'Bubble Chart'},
    {value: 'MountainChart', title: 'Mountain Chart'},
    {value: 'BubbleMap', title: 'Bubble Map'}
  ];
  public electronPath: string;
  public chartType: string = this.chartTypes[0].value;

  public defaults(): void {
    this.ddfUrl = this.electronPath + '/ddf--gapminder--systema_globalis';
  }
}
