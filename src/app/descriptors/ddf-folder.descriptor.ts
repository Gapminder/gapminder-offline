import {IAdditionalDataItem} from './additional-data-item.descriptor';

export class ChartTypeOption {
  value: string;
  title: string;
}

export class DdfFolderDescriptor {
  public ddfUrl: string;
  public additionalData: Array<IAdditionalDataItem> = [];
  public chartTypes: ChartTypeOption[] = [
    {value: 'BubbleChart', title: 'Bubble Chart'},
    {value: 'MountainChart', title: 'Mountain Chart'},
    {value: 'BubbleMap', title: 'Bubble Map'}
  ];
  public electronPath: string;
  public chartType: string = this.chartTypes[0].value;

  public defaults() {
    this.ddfUrl = this.electronPath + '/ddf--gapminder--systema_globalis';
  }
}
