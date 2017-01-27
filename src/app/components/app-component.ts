import {Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {DdfFolderFormComponent} from './ddf-folder-form';
import {ConfigService} from './config-service';
import {configSg} from './config-sg';
import {InitMenuComponent} from './template-menu';
import {Menu} from 'electron';
import {Tab} from './tab';

declare var electron: any;

@Component({
    selector: 'ae-app',
    templateUrl: './app.html'
})
export class AppComponent implements OnInit {
    public tabs: Tab[] = [];
    public isMenuOpen: boolean = false;

    @ViewChild('ddfModal') public ddfModal: ModalDirective;
    @ViewChild('additionalDataModal') public additionalDataModal: ModalDirective;
    @ViewChild('presetsModal') public presetsModal: ModalDirective;
    @ViewChild('versionsModal') public versionsModal: ModalDirective;
    @ViewChild('csvConfigModal') public csvConfigModal: ModalDirective;
    @ViewChild('additionalCsvConfigModal') public additionalCsvConfigModal: ModalDirective;

    @ViewChild('newDdfFolder') newDdfFolderInput: ElementRef;
    @ViewChild('addDdfFolder') addDdfFolderInput: ElementRef;

    private readerModuleObject: any;
    private readerGetMethod: string;
    private readerParams: Array<any>;
    private readerName: string;
    private extResources: any;
    public menuComponent: Menu;

    constructor(private _ngZone: NgZone,
                private ddfFolderForm: DdfFolderFormComponent,
                private configService: ConfigService) {

        new InitMenuComponent(this);
        electron.ipcRenderer.send('get-app-path');
    }

    ngOnInit() {
        let processed = false;
        const that = this;

        electron.ipcRenderer.on('got-app-path', (event, path) => {
            this.ddfFolderForm.electronPath = path;

            if (!processed) {
                this.readerModuleObject = this.ddfFolderForm.getDdfCsvReaderObject();
                this.readerGetMethod = 'getDDFCsvReaderObject';
                this.readerParams = [this.ddfFolderForm.fileReader, console];
                this.readerName = 'ddf1-csv-ext';
                this.extResources = {
                    host: this.ddfFolderForm.ddfUrl,
                    preloadPath: 'preview-data/'
                };

                //this.defaultChart();
                that.initTab();
                that._ngZone.run(() => {
                });

                processed = true;
            }
        });

        electron.ipcRenderer.on('do-open-completed', (event, parameters) => {
            this.doOpenCompleted(event, parameters);
        });

        this.setAddDataItemsAvailability(false);
    }

    private setAddDataItemsAvailability(value: boolean) {
        this.menuComponent.items[0].submenu.items[1].submenu.items[0].enabled = value;
        this.menuComponent.items[0].submenu.items[1].submenu.items[1].enabled = value;
        this.menuComponent.items[0].submenu.items[4].enabled = value;
        this.menuComponent.items[0].submenu.items[5].enabled = false;

        const currentTab = this.getCurrentTab();

        if (currentTab && currentTab.selectedChartType === 'BubbleChart') {
            this.menuComponent.items[0].submenu.items[5].enabled = value;
        }
    }

    public getParent(): AppComponent {
        return this;
    }

    public getCurrentTab(): Tab {
        return this.tabs.find(tab => tab.active);
    }

    public appMainClickHandler($event) {
        if (this.isMenuOpen) {
            const elementTarget = $event.target;
            const elementMenu = document.getElementsByClassName('btn-group')[0];
            if (!elementMenu.contains(elementTarget)) {
                this.isMenuOpen = false;
            }
        }
    }

    private switchMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    private openDevTools() {
        this.isMenuOpen = false;
        electron.ipcRenderer.send('open-dev-tools');
    }

    public selectChart(chartType) {
        const tab = this.getCurrentTab();
        tab.selectedChartType = chartType;
        tab.chartType = chartType;
        tab.ddfChartType = chartType;
        this.defaultChart();
    }

    public initTab() {
        const tab = new Tab(this.ddfFolderForm.ddfChartType, this.tabs.length, true);
        this.tabs.forEach(tab => tab.active = false);
        this.tabs.push(tab);
    }

    private defaultChart() {
        this.newChart(() => {
            this._ngZone.run(() => {
            });
        });
    }

    private newChart(onChartReady, isDefaults = true, ddfFolderForm = this.ddfFolderForm) {
        if (isDefaults) {
            ddfFolderForm.defaults();
        }

        const tab = this.getCurrentTab();
        //const tab = new Tab(ddfFolderForm.ddfChartType, this.tabs.length, true);

        tab.readerModuleObject = this.readerModuleObject;
        tab.readerGetMethod = this.readerGetMethod;
        tab.readerParams = this.readerParams;
        tab.readerName = this.readerName;
        tab.extResources = this.extResources;

        const configRequestParameters = {
            ddfPath: ddfFolderForm.ddfUrl,
            chartType: ddfFolderForm.ddfChartType,
            onProgress: (value: number) => {
            }
        };

        tab.additionalData = ddfFolderForm.additionalData;

        // predefined config for SG
        if (!ddfFolderForm.ddfUrl || ddfFolderForm.ddfUrl.indexOf('systema_globalis') > 0) {
            const chartType = tab.selectedChartType;
            const config = configSg[chartType];

            config.data.ddfPath = ddfFolderForm.ddfUrl;
            config.data.path = ddfFolderForm.ddfUrl;

            tab.model = config;

            console.log(JSON.stringify(tab.model));

            //this.tabs.forEach(tab => tab.active = false);
            //this.tabs.push(tab);

            if (onChartReady) {
                onChartReady();
            }

            return;
        }

        // heuristic config for other datasets
        this.configService.getConfig(configRequestParameters, (config) => {
            // tab.model = ddfFolderForm.getQuery();

            config.data.ddfPath = ddfFolderForm.ddfUrl;
            config.data.path = ddfFolderForm.ddfUrl;

            tab.model = config;

            console.log(JSON.stringify(tab.model));

            //this.tabs.forEach(tab => tab.active = false);
            //this.tabs.push(tab);

            if (onChartReady) {
                onChartReady();
            }
        });
    }

    private newSimpleChart(properties, onChartReady) {
        const tab = new Tab(this.ddfFolderForm.ddfChartType, this.tabs.length, true);

        tab.selectedChartType = this.ddfFolderForm.ddfChartType;
        tab.model = {
            data: {
                reader: properties.reader,
                delimiter: properties.delimiter,
                path: properties.path
            }
        };

        console.log(JSON.stringify(tab.model));

        this.tabs.forEach(tab => tab.active = false);
        this.tabs.push(tab);

        if (onChartReady) {
            onChartReady();
        }
    }

    private versionsFormComplete(version?: string) {
        if (version) {
            electron.ipcRenderer.send('request-custom-update', version);
            this.versionsModal.hide();
        }
    }

    private chartCreated(data) {

        console.log('chartCreated', data);

        this.getCurrentTab().component = data.model;
        this.getCurrentTab().instance = data.component;
        this.setAddDataItemsAvailability(true);
    }

    private forceResize() {
        setTimeout(function () {
            const event: any = document.createEvent('HTMLEvents');

            event.initEvent('resize', true, true);
            event.eventName = 'resize';
            window.dispatchEvent(event);
        }, 10);
    }

    private chartChanged(data) {

        console.log('chartChanged', data);

        const currentTab = this.getCurrentTab();

        currentTab.component = data.component;
    }

    public doNewDdfFolder() {
        this.isMenuOpen = false;
        this.newDdfFolderInput.nativeElement.click();
    }

    private onDdfFolderChanged(filePaths) {
        if (filePaths && filePaths.length > 0) {
            this.ddfFolderForm.ddfUrl = filePaths[0];
            this.newChart(() => {
                this._ngZone.run(() => {
                });
            }, false);
        }
    }

    public doNewCsvFile() {
        this.csvConfigModal.show();
        this.isMenuOpen = false;
    }

    public doGapminderChart() {
        this.isMenuOpen = false;
        this.initTab();

        this._ngZone.run(() => {
        });
    }

    public doAddDdfFolder() {
        this.isMenuOpen = false;
        this.addDdfFolderInput.nativeElement.click();
    }

    public onDdfFolderClick(event, callback) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.isMenuOpen = false;
        const dialog = electron.remote.dialog;
        const currentWindow = electron.remote.getCurrentWindow();
        dialog.showOpenDialog(currentWindow, {properties: ['openDirectory']}, callback.bind(this));
    }

    public doAddCsvFile() {
        this.additionalCsvConfigModal.show();
        this.isMenuOpen = false;
    }

    private addData(data) {
        const currentTab = this.getCurrentTab();
        const newAdditionalData = currentTab.additionalData.slice();

        console.log('add data', data);

        newAdditionalData.push(data);
        currentTab.additionalData = newAdditionalData;
    }

    private onDdfExtFolderChanged(filePaths) {
        if (filePaths && filePaths.length > 0) {
            this.addData({reader: 'ddf1-csv-ext', path: filePaths[0]});
        }
    }

    private checkForUpdates() {
        this.versionsModal.show();
        this.isMenuOpen = false;
    }

    public doOpen() {
        this.isMenuOpen = false;
        electron.ipcRenderer.send('do-open');
    }

    private doOpenCompleted(event, parameters) {
        const config = parameters.tab;
        const tab = new Tab(config.chartType, this.tabs.length, true, parameters.file);

        delete config.bind;
        delete config.chartType;

        tab.selectedChartType = 'fromFile';
        tab.model = config;

        this.tabs.forEach(tab => tab.active = false);
        this.tabs.push(tab);

        this._ngZone.run(() => {
        });
    };


    public doSave() {
        const currentTab = this.getCurrentTab();
        const model = Object.assign({}, currentTab.component && currentTab.component.getModel ? currentTab.component.getModel() : currentTab.instance.getModel());

        this.isMenuOpen = false;

        electron.ipcRenderer.send('do-save', {model, chartType: currentTab.chartType});
    }

    public doExportForWeb() {
        const currentTab = this.getCurrentTab();
        const model = Object.assign({}, currentTab.component && currentTab.component.getModel ? currentTab.component.getModel() : currentTab.instance.getModel());

        this.isMenuOpen = false;

        electron.ipcRenderer.send('do-export-for-web', {model, chartType: currentTab.chartType});
    }

    private csvConfigFormComplete(event) {
        this.csvConfigModal.hide();

        if (event) {
            this.newSimpleChart(event, () => {
                this._ngZone.run(() => {
                });
            });
        }
    }

    private additionalCsvConfigFormComplete(event) {
        this.additionalCsvConfigModal.hide();

        if (event) {
            this.addData(event);
        }
    }
}