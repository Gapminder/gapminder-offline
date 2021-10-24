import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as ddfCsvReader from '@vizabi/reader-ddfcsv';
import * as excelReader from '@vizabi/reader-excel';
import * as ddfValidation from 'ddf-validation';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  shell: typeof shell;
  childProcess: typeof childProcess;
  fs: typeof fs;
  path: typeof path;
  process: typeof process;
  ddfCsvReader: typeof ddfCsvReader;
  ExcelReader: typeof excelReader;
  ddfValidation: typeof ddfValidation;
  vizabi: any;
  Vizabi: any;
  VizabiSharedComponents: any;
  BubbleChart: any;
  BubbleMap: any;
  LineChart: any;
  MountainChart: any;
  BarRank: any;
  d3: any;
  mobx: any;
  SETTINGS_FILE: string;
  appPath: string;
  userDataPath: string;
  devMode: boolean;
  isServe: boolean;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.process = window.process;
      this.ddfCsvReader = window.require('@vizabi/reader-ddfcsv');
      this.ExcelReader = window.require('@vizabi/reader-excel');
      this.ddfValidation = window.require('ddf-validation');
      this.vizabi = (window as any).Vizabi;
      this.Vizabi = (window as any).Vizabi;
      this.VizabiSharedComponents = (window as any).VizabiSharedComponents;
      this.BubbleChart = (window as any).BubbleChart;
      this.BubbleMap = (window as any).BubbleMap;
      this.LineChart = (window as any).LineChart;
      this.BarRank = (window as any).BarRank;
      this.MountainChart = (window as any).MountainChart;      
      this.mobx = (window as any).mobx;
      this.d3 = (window as any).d3;
      const currentWindow: any = this.remote.getCurrentWindow();
      this.appPath = currentWindow.appPath;
      this.userDataPath = currentWindow.userDataPath;
      this.devMode = currentWindow.devMode;
      this.isServe = currentWindow.serve;
      this.SETTINGS_FILE = this.path.resolve(this.userDataPath, 'gapminder-offline-settings.json');
    }
  }

  readSettings() {
    if (!this.fs.existsSync(this.SETTINGS_FILE)) {
      return {};
    }

    return JSON.parse(this.fs.readFileSync(this.SETTINGS_FILE, 'utf8'));
  }

  writeSettings(settings) {
    try {
      this.fs.writeFileSync(this.SETTINGS_FILE, JSON.stringify(settings), 'utf8');
    } catch (e) {
      alert('Can not write settings!');
    }
  }

  isElectron() {
    return window && window.process && window.process.type;
  }
}
