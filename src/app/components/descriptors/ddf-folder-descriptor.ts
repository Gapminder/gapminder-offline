import {IAdditionalDataItem} from '../additional-data';

export class ChartTypeOption {
  value: string;
  title: string;
}

export class DdfFolderDescriptor {
  public ddfUrl: string;
  public additionalData: Array<IAdditionalDataItem> = [];
  public ddfChartTypes: ChartTypeOption[] = [
    {value: 'BubbleChart', title: 'Bubble Chart'},
    {value: 'MountainChart', title: 'Mountain Chart'},
    {value: 'BubbleMap', title: 'Bubble Map'}
  ];
  public electronPath: string;
  public ddfChartType: string = this.ddfChartTypes[0].value;

  public defaults() {
    this.ddfUrl = this.electronPath + '/ddf--gapminder--systema_globalis';
  }
}
