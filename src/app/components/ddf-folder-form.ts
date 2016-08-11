import {Component, OnInit, NgZone, Injectable, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {mainQueryTemplate} from './templates/main-query-template';
import {entitiesQueryTemplate} from './templates/entities-query-template';

const formatJson = require('format-json');
const ddfCsvReaderLib = require('vizabi-ddfcsv-reader');
const Ddf = ddfCsvReaderLib.Ddf;
const ChromeFileReader = ddfCsvReaderLib.ChromeFileReader;
const FrontendFileReader = ddfCsvReaderLib.FrontendFileReader;

let template = require('./ddf-folder-form.html');

class Option {
  value: string;
  title: string;
}

@Injectable()
@Component({
  selector: 'ae-ddf-folder-form',
  directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  events: ['done'],
  template: template
})
export class DdfFolderFormComponent implements OnInit {
  public fileReader: any;
  public ddfChartTypes: Option[] = [
    {value: 'BubbleChart', title: 'Bubble Chart'},
    {value: 'MountainChart', title: 'Mountain Chart'},
    {value: 'BubbleMap', title: 'Bubble Map'}
  ];
  public ddfChartType: string = this.ddfChartTypes[0].value;
  public isChromeApp: boolean = false;
  public isChromeExternalDdfPath: boolean = false;
  public expertMode = false;
  public ddfError: string;
  public ddfUrl: string = '';
  public ddfMetadataUrl: string = '';
  public ddfTranslationsUrl: string = '';
  public mainQuery: any = {};
  public expectedMeasuresQuery: string = '';
  public measures: any[] = [];
  public dimensions: any[] = [];
  public isDiagnostic: boolean = false;
  public xAxis: string = 'income_per_person_gdppercapita_ppp_inflation_adjusted';
  public yAxis: string = 'life_expectancy_years';
  public sizeAxis: string = 'population_total';
  public startTime: string = '1990';
  public currentTime: string = '2015';
  public endTime: string = '2015';
  public chromeFs: any;
  public chromeFsRootPath: string = '';
  public electronUrl: string = '';
  public progress: boolean = false;
  public metadataContent: string = '';
  public translationsContent: string = '';

  private done: EventEmitter<any> = new EventEmitter();

  constructor(private _ngZone: NgZone) {
  }

  ngOnInit() {
    this.defaults();
    this.loadMeasures(null);
  }

  onSelect(expectedVariableName, ddfChartType) {
    this._ngZone.run(() => {
      this[expectedVariableName] = ddfChartType;
    });
  }

  public defaults() {
    this.chromeFs = null;
    this.chromeFsRootPath = '';

    if (!this.isChromeApp) {
      this.ddfUrl = this.electronUrl + 'ddf';
      this.ddfMetadataUrl = this.electronUrl + 'vizabi/metadata.json';
      this.ddfTranslationsUrl = this.electronUrl + 'vizabi/en.json';
    }

    if (this.isChromeApp && !this.isChromeExternalDdfPath) {
      this.ddfUrl = '../data/sg/ddf';
      this.ddfMetadataUrl = '../data/sg/vizabi/metadata.json';
      this.ddfTranslationsUrl = '../data/sg/vizabi/en.json';
    }

    if (this.isChromeApp && this.isChromeExternalDdfPath) {
      this.ddfUrl = 'ddf';
      this.ddfMetadataUrl = 'vizabi/metadata.json';
      this.ddfTranslationsUrl = 'vizabi/en.json';
    }

    this.expectedMeasuresQuery = formatJson.plain(entitiesQueryTemplate);
    this.mainQuery = {};
    Object.keys(mainQueryTemplate).forEach(key => {
      this.mainQuery[key] = formatJson.plain(mainQueryTemplate[key]);
    });

    if (!this.isChromeApp || (this.isChromeApp && !this.isChromeExternalDdfPath)) {
      this.loadMeasures(null);
    }
  }

  public getDdfCsvReaderObject() {
    return ddfCsvReaderLib;
  }

  public loadMeasures(onMeasuresLoaded) {
    if (!onMeasuresLoaded) {
      onMeasuresLoaded = () => {
      };
    }


    this.ddfError = '';
    this.dimensions = [];
    this.measures = [];

    let query = {};

    try {
      query = JSON.parse(this.expectedMeasuresQuery);
    } catch (e) {
      this.ddfError = e;
    }

    if (this.ddfError) {
      onMeasuresLoaded(this.ddfError);
      return;
    }

    this.fileReader = this.chromeFs ? new ChromeFileReader(this.chromeFs) : new FrontendFileReader();

    const ddf = new Ddf(this.ddfUrl, this.fileReader);

    ddf.getIndex(err => {
      if (err) {
        this.ddfError = 'Wrong DDF index: ' + err;
        onMeasuresLoaded(this.ddfError);
        return;
      }

      ddf.getConceptsAndEntities(query, (err, concepts) => {
        if (err) {
          this.ddfError = 'Wrong DDF concepts: ' + err;
          onMeasuresLoaded(this.ddfError);
          return;
        }

        concepts.forEach(concept => {
          if (concept.concept_type === 'measure') {
            this.measures.push(concept);
          }

          if (concept.concept_type !== 'measure') {
            this.dimensions.push(concept);
          }
        });

        var metadataLoader = this.prepareMetadataByFiles();

        this.progress = true;
        metadataLoader((error, metadata, translations) => {
          this._ngZone.run(() => {
            this.progress = false;

            if (error) {
              this.ddfError = error;
              onMeasuresLoaded(this.ddfError);
              return;
            }

            this.metadataContent = metadata;
            this.translationsContent = translations;

            onMeasuresLoaded();
          });
        });
      });
    });
  }

  public getQuery(): any {
    let queryObj = {
      data: {
        ddfPath: '',
        path: ''
      },
      state: {
        marker: {
          axis_y: {which: ''},
          axis_x: {which: ''},
          size: {which: ''}
        },
        time: {
          start: '',
          end: '',
          value: ''
        }
      }
    };

    this.ddfError = '';

    try {
      queryObj = JSON.parse(this.mainQuery[this.ddfChartType]);
    } catch (e) {
      this.ddfError = 'Wrong JSON format for main query';
    }

    if (this.ddfError) {
      return;
    }

    if (this.ddfChartType === 'BubbleChart' || this.ddfChartType === 'MountainChart') {
      queryObj.data.path = this.ddfUrl;
      queryObj.state.marker.axis_y.which = this.yAxis;
      queryObj.state.marker.axis_x.which = this.xAxis;
      queryObj.state.marker.size.which = this.sizeAxis;
    }

    if (this.ddfChartType === 'BubbleMap') {
      queryObj.data.path = this.ddfUrl;
      queryObj.state.marker.size.which = this.sizeAxis;
    }

    queryObj.state.time.start = this.startTime;
    queryObj.state.time.end = this.endTime;
    queryObj.state.time.value = this.currentTime;

    queryObj.data.ddfPath = this.ddfUrl;

    return queryObj;
  }

  loadChromeFs() {
  }

  hasChromeFs(): boolean {
    return false;
  }

  setExternalDdfPath(isChromeExternalDdfPath) {
    this.isChromeExternalDdfPath = isChromeExternalDdfPath;
    this.defaults();
  }

  prepareMetadataByFiles() {
    return onMetadataLoaded => {
      const loader = this.chromeFs ? this.chromeLoad : this.xhrLoad;

      loader(this.ddfMetadataUrl, metadata => {
        loader(this.ddfTranslationsUrl, translations => {
          let ddfError = '';
          let metadataContent = null;
          let translationsContent = null;

          try {
            metadataContent = JSON.parse(metadata);
          } catch (e) {
            ddfError = 'Wrong JSON format for metadata: ' + e;
          }

          try {
            translationsContent = JSON.parse(translations);
          } catch (e) {
            ddfError += '\nWrong JSON format for translations: ' + e;
          }

          onMetadataLoaded(ddfError, metadataContent, translationsContent);
        });
      });
    };
  }

  xhrLoad(path, onDataLoaded) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', path, true);
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onDataLoaded(xhr.responseText);
        }
      }
    };
    xhr.send(null);
  }

  chromeLoad(path, onDataLoaded) {
    this.chromeFs.readFile(path, '', (err, file) => {
      if (err) {
        console.log(err);
      }

      onDataLoaded(file);
    });
  }

  chromeAppIsBadForGo() {
    return this.isChromeApp && this.isChromeExternalDdfPath && !this.hasChromeFs();
  }

  areMeasuresBadForGo() {
    const areMeasuresBadForGoForBubbleMap = () => this.ddfChartType === 'BubbleMap' && !this.sizeAxis;
    const areMeasuresBadForGoForBubbleAndMountainCharts = () =>
      ((this.ddfChartType === 'BubbleChart' || this.ddfChartType === 'MountainChart') &&
      (!this.xAxis || !this.yAxis || !this.sizeAxis));

    return areMeasuresBadForGoForBubbleMap() || areMeasuresBadForGoForBubbleAndMountainCharts();
  }

  cantGo() {
    return this.ddfError || this.areMeasuresBadForGo() || this.chromeAppIsBadForGo();
  }

  openDdf() {
    this.done.emit({ddfFolderForm: this});
  }

  close() {
    this.done.emit({});
  }
}
