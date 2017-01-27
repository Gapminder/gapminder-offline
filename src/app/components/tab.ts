import {IAdditionalDataItem} from './additional-data';

export class Tab {
    public active: boolean;
    public title: string;
    public removable: boolean = true;
    public selectedChartType: string = '';
    public model: any;
    public additionalData: Array<IAdditionalDataItem> = [];

    public readerModuleObject: any;
    public readerGetMethod: string;
    public readerParams: Array<any>;
    public readerName: string;
    public extResources: any;
    public ddfChartType: string;
    public component: any;
    public instance: any;

    private order: number;

    constructor(public chartType: string, order: number, active: boolean = false, title: string = '') {
        this.order = order + 1;
        this.active = active;
        this.ddfChartType = chartType;
        this.title = title ? title : `Chart ${this.order}`;
        this.selectedChartType = '';
        this.removable = order !== 0;
    }

    public getOrder() {
        return this.order;
    }
}