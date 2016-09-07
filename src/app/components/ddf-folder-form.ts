import {Component, OnInit, NgZone, Injectable, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {mainQueryTemplate} from './templates/main-query-template';
import {entitiesQueryTemplate} from './templates/entities-query-template';
import {BackendFileReader} from './backend-file-reader';

const formatJson = require('format-json');
const ddfCsvReaderLib = require('vizabi-ddfcsv-reader');
const Ddf = ddfCsvReaderLib.Ddf;

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
  public electronUrl: string = '';
  public progress: boolean = false;
  public metadataContent: string = '';
  public translationsContent: string = '';

  private done: EventEmitter<any> = new EventEmitter();

  constructor(private _ngZone: NgZone) {
    this.fileReader = new BackendFileReader();
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
    this.ddfUrl = './resources/app/ddf';
    this.ddfTranslationsUrl = 'vizabi/en.json';
    this.expectedMeasuresQuery = formatJson.plain(entitiesQueryTemplate);
    this.mainQuery = {};
    Object.keys(mainQueryTemplate).forEach(key => {
      this.mainQuery[key] = formatJson.plain(mainQueryTemplate[key]);
    });

    this.loadMeasures(null);
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

    const ddf = new Ddf(this.ddfUrl, this.fileReader);

    ddf.getIndex(err => {
      if (err) {
        this.ddfError = 'Wrong DDF index: ' + err;
        onMeasuresLoaded(this.ddfError);
        return;
      }

      ddf.getConcepts((err, concepts) => {
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

  prepareMetadataByFiles() {
    return onMetadataLoaded => {
      const loader = this.xhrLoad;

      loader(this.ddfTranslationsUrl, translations => {
        let ddfError = '';
        let translationsContent = null;

        try {
          translationsContent = JSON.parse(translations);
        } catch (e) {
          ddfError += '\nWrong JSON format for translations: ' + e;
        }

        onMetadataLoaded(ddfError, null, translationsContent);
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

  areMeasuresBadForGo() {
    const areMeasuresBadForGoForBubbleMap = () => this.ddfChartType === 'BubbleMap' && !this.sizeAxis;
    const areMeasuresBadForGoForBubbleAndMountainCharts = () =>
      ((this.ddfChartType === 'BubbleChart' || this.ddfChartType === 'MountainChart') &&
      (!this.xAxis || !this.yAxis || !this.sizeAxis));

    return areMeasuresBadForGoForBubbleMap() || areMeasuresBadForGoForBubbleAndMountainCharts();
  }

  cantGo() {
    return this.ddfError || this.areMeasuresBadForGo();
  }

  openDdf() {
    this.done.emit({ddfFolderForm: this});
  }

  close() {
    this.done.emit({});
  }
}
