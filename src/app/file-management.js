const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const zipdir = require('zip-dir');
const request = require('request');
const packageJSON = require('./package.json');
const GoogleAnalytics = require('./google-analytics');
const ga = new GoogleAnalytics(packageJSON.googleAnalyticsId, app.getVersion());

const DATA_PATH = {
  win32: '.\\resources\\app\\ddf--gapminder--systema_globalis',
  linux: app.getAppPath() + '/ddf--gapminder--systema_globalis',
  darwin: app.getAppPath() + '/ddf--gapminder--systema_globalis'
};

const WEB_RESOURCE_PATH = {
  win32: '.\\resources\\app\\export-template',
  linux: app.getAppPath() + '/export-template',
  darwin: app.getAppPath() + '/export-template'
};

const WEB_PATH = {
  win32: '.\\web',
  linux: app.getAppPath() + '/../../web',
  darwin: app.getAppPath() + '/../../../../web'
};

const pathToRelative = (from, to) => path.relative(path.parse(from).dir, to);
const getPathCorrectFunction = brokenPathObject => new Promise((resolve, reject) => {
  const parsed = path.parse(brokenPathObject.path);

  dialog.showOpenDialog({
    title: `Choose correct location for "${parsed.base}"...`,
    properties: parsed.ext ? [] : ['openDirectory']
  }, dirPaths => {
    if (!dirPaths || dirPaths.length < 0) {
      reject();
      return;
    }

    brokenPathObject.path = dirPaths[0];
    resolve();
  });
});
const isPathInternalWin = path => path.endsWith(DATA_PATH.win32);
const isPathInternalLin = path => path.endsWith(DATA_PATH.linux);
const isPathInternalMac = path => path.endsWith(DATA_PATH.darwin);
const isPathInternal = path => isPathInternalWin(path) || isPathInternalLin(path) || isPathInternalMac(path);

exports.openFile = event => {
  dialog.showOpenDialog({
    title: 'Open chart state ...',
    filters: [{name: 'JSON', extensions: ['json']}],
    properties: ['openFile']
  }, fileNames => {

    if (!fileNames || fileNames.length <= 0) {
      return;
    }

    const fileName = fileNames[0];
    const parseFileData = path.parse(fileName);
    const currentDir = parseFileData.dir;
    const fileNameOnly = parseFileData.name;

    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        dialog.showErrorBox("File reading error", err.message);
        return;
      }

      const config = JSON.parse(data);
      const brokenFileActions = [];

      Object.keys(config).forEach(key => {
        if ((key === 'data' || key.indexOf('data_') === 0) && typeof config[key] === 'object') {
          if (config[key].path.indexOf('@internal') >= 0) {
            config[key].path = DATA_PATH[process.platform];
          } else {
            config[key].path = path.resolve(currentDir, config[key].path);

            if (!fs.existsSync(config[key].path)) {
              brokenFileActions.push(getPathCorrectFunction(config[key]));
            }
          }
        }
      });

      Promise.all(brokenFileActions).then(() => {
        event.sender.send('do-open-completed', {tab: config, file: fileNameOnly});
      });
    });
  });
};


exports.saveFile = (event, params) => {
  dialog.showSaveDialog({
    title: 'Save current chart as ...',
    defaultPath: `${params.title}.json`,
    filters: [{name: 'JSON', extensions: ['json']}]
  }, fileName => {
    if (!fileName) {
      return;
    }

    Object.keys(params.model).forEach(key => {
      if ((key === 'data' || key.indexOf('data_') === 0) && typeof params.model[key] === 'object') {
        if (isPathInternal(params.model[key].path)) {
          params.model[key].path = `@internal`
        } else {
          params.model[key].path = pathToRelative(fileName, params.model[key].path);
        }
      }
    });

    params.model.chartType = params.chartType;

    fs.writeFile(fileName, JSON.stringify(params.model, null, ' '), err => {
      if (err) {
        dialog.showErrorBox('File save error', err.message);
        ga.error('Chart state was NOT saved: ' + err.toString());
        return;
      }

      ga.error('Chart state successfully saved');
      console.info('Chart state successfully saved');
    });
  });
};

exports.exportForWeb = (event, params) => {
  fsExtra.removeSync(`${WEB_PATH[process.platform]}`);

  Object.keys(params.model).forEach(key => {
    if ((key === 'data' || key.indexOf('data_') === 0) && typeof params.model[key] === 'object') {
      const pathKeys = params.model[key].path.split(path.sep);
      const pathKey = pathKeys[pathKeys.length - 1];

      fsExtra.copySync(params.model[key].path, `${WEB_PATH[process.platform]}/data/${pathKey}`);

      params.model[key].path = `./data/${pathKey}`;
      params.model[key].ddfPath = `./data/${pathKey}`;

      if (params.model[key].reader === 'ddf1-csv-ext') {
        params.model[key].reader = 'ddf';
      }
    }
  });

  params.model.chartType = params.chartType;
  params.model.locale.filePath = 'assets/translation/';

  const config = `var CONFIG = ${JSON.stringify(params.model, null, ' ')};`;

  fsExtra.copySync(`${WEB_RESOURCE_PATH[process.platform]}`, `${WEB_PATH[process.platform]}`);
  fsExtra.outputFileSync(`${WEB_PATH[process.platform]}/config.js`, config);

  let indexContent = fs.readFileSync(`${WEB_RESOURCE_PATH[process.platform]}/index.html`).toString();

  indexContent = indexContent.replace(/#chartType#/, params.chartType);

  fs.writeFileSync(`${WEB_PATH[process.platform]}/index.html`, indexContent, 'utf8');

  dialog.showSaveDialog({
    title: 'Export current chart as ...',
    filters: [{name: 'ZIP', extensions: ['zip']}]
  }, fileName => {
    if (!fileName) {
      return;
    }

    zipdir(`${WEB_PATH[process.platform]}`, {saveTo: fileName}, err => {
      if (err) {
        dialog.showMessageBox({message: 'This chart has NOT been exported.', buttons: ['OK']});
        ga.error('Export for Web was NOT completed: ' + err.toString());
        return;
      }

      dialog.showMessageBox({message: 'This chart has been exported.', buttons: ['OK']});
    });
  });
};
