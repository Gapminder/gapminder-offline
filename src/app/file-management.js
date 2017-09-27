const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const _ = require('lodash');
const async = require('async');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const zipdir = require('zip-dir');
const packageJSON = require('./package.json');
const GoogleAnalytics = require('./google-analytics');
const ga = new GoogleAnalytics(packageJSON.googleAnalyticsId, app.getVersion());

const DATA_PATH = {
  win32: app.getAppPath() + '\\ddf--gapminder--systema_globalis',
  linux: app.getAppPath() + '/ddf--gapminder--systema_globalis',
  darwin: app.getAppPath() + '/ddf--gapminder--systema_globalis'
};

const WEB_RESOURCE_PATH = {
  win32: app.getAppPath() + '\\export-template',
  linux: app.getAppPath() + '/export-template',
  darwin: app.getAppPath() + '/export-template'
};

const WEB_PATH = {
  win32: app.getAppPath() + '\\web',
  linux: app.getAppPath() + '/../../web',
  darwin: app.getAppPath() + '/../../../../web'
};

const getPathCorrectFunction = brokenPathObject => onPathReady => {
  const parsed = path.parse(brokenPathObject.path);

  dialog.showMessageBox({
    type: 'question',
    buttons: ['OK', 'Cancel'],
    title: 'Confirm',
    message: `The chart you are about to open depends on the external file ${parsed.base}, which was not found because it was moved or renamed or left on some other computer. Press OK to help locate the file or Cancel to ignore and just open the app.`
  }, function (response) {
    if (response === 0) {
      dialog.showOpenDialog({
        title: `Choose correct location for "${parsed.base}"...`,
      }, dirPaths => {
        if (!dirPaths || dirPaths.length < 0) {
          brokenPathObject.__abandoned = true;
          onPathReady();
          return;
        }

        brokenPathObject.path = dirPaths[0];
        onPathReady();
      });
    } else {
      brokenPathObject.__abandoned = true;

      onPathReady();
    }
  });
};

const isPathInternalWin = path => path.endsWith(DATA_PATH.win32);
const isPathInternalLin = path => path.endsWith(DATA_PATH.linux);
const isPathInternalMac = path => path.endsWith(DATA_PATH.darwin);
const isPathInternal = path => isPathInternalWin(path) || isPathInternalLin(path) || isPathInternalMac(path);
const normalizeModelToSave = (model, chartType) => {
  Object.keys(model).forEach(key => {
    if ((key === 'data' || key.indexOf('data_') === 0) && typeof model[key] === 'object') {
      if (isPathInternal(model[key].path)) {
        model[key].path = `@internal`;
      } else {
        model[key].path = path.resolve(__dirname, '..', '..', model[key].path);
      }

      model[key].ddfPath = model[key].path;
    }
  });

  model.chartType = chartType;
};
const normalizeModelToOpen = (model, currentDir, brokenFileActions) => {
  Object.keys(model).forEach(key => {
    if ((key === 'data' || key.indexOf('data_') === 0) && typeof model[key] === 'object') {
      if (model[key].__abandoned) {
        return;
      }

      if (model[key].path.indexOf('@internal') >= 0) {
        model[key].path = DATA_PATH[process.platform];
      } else {
        model[key].path = path.resolve(__dirname, '..', '..', model[key].path);

        if (!fs.existsSync(model[key].path)) {
          brokenFileActions.push(getPathCorrectFunction(model[key]));
        }
      }

      model[key].ddfPath = model[key].path;
    }
  });
};
const getConfigWithoutAbandonedData = config => {
  const newConfig = [];
  const processConfigItem = item => {
    if (!item) {
      return;
    }

    const model = item.model || item;
    const keys = Object.keys(model);

    let isAbandoned = false;

    for (let key of keys) {
      if ((key === 'data' || key.indexOf('data_') === 0) && typeof model[key] === 'object') {
        if (model[key].__abandoned) {
          isAbandoned = true;
          break;
        }
      }
    }

    if (!isAbandoned) {
      newConfig.push(item);
    }
  };

  if (_.isArray(config)) {
    for (let item of config) {
      processConfigItem(item);
    }
  } else {
    processConfigItem(config);
  }

  return newConfig;
};
const openFile = (event, fileName, currentDir, fileNameOnly) => {
  const sender = event.sender || event.webContents;

  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      dialog.showErrorBox('File reading error', err.message);
      return;
    }

    const config = JSON.parse(data);
    const brokenFileActions = [];

    if (config.length) {
      config.forEach(configItem => {
        normalizeModelToOpen(configItem.model, currentDir, brokenFileActions);
      });

      async.waterfall(brokenFileActions, () => {
        const newConfig = getConfigWithoutAbandonedData(config);

        if (!_.isEmpty(newConfig)) {
          sender.send('do-open-all-completed', newConfig);
        }

        setTimeout(() => {
          sender.send('check-tab-by-default');
        }, 500);
      });
    }

    if (!config.length) {
      normalizeModelToOpen(config, currentDir, brokenFileActions);

      async.waterfall(brokenFileActions, () => {
        const newConfigAsArray = getConfigWithoutAbandonedData(config);

        if (!_.isEmpty(newConfigAsArray)) {
          const newConfig = _.head(newConfigAsArray);

          if (!_.isEmpty(newConfig)) {
            sender.send('do-open-completed', {tab: newConfig, file: fileNameOnly});
          }
        }

        setTimeout(() => {
          sender.send('check-tab-by-default');
        }, 500);
      });
    }
  });
};

exports.openFileWithDialog = event => {
  dialog.showOpenDialog({
    title: 'Open chart state ...',
    filters: [{name: 'Gapminder stat document', extensions: ['gmstat']}],
    properties: ['openFile']
  }, fileNames => {

    if (!fileNames || fileNames.length <= 0) {
      return;
    }

    const fileName = fileNames[0];
    const parseFileData = path.parse(fileName);
    const currentDir = parseFileData.dir;
    const fileNameOnly = parseFileData.name;

    openFile(event, fileName, currentDir, fileNameOnly);
  });
};

exports.openFileWhenDoubleClick = (event, fileName) => {
  const parseFileData = path.parse(fileName);
  const currentDir = parseFileData.dir;
  const fileNameOnly = parseFileData.name;

  if (fs.existsSync(fileName) && fileName.indexOf('-psn_') === -1) {
    openFile(event, fileName, currentDir, fileNameOnly);
  }
};

exports.saveFile = (event, params) => {
  dialog.showSaveDialog({
    title: 'Save current chart as ...',
    defaultPath: `${params.title}.gmstat`,
    filters: [{name: 'Gapminder stat document', extensions: ['gmstat']}]
  }, fileName => {
    if (!fileName) {
      return;
    }

    normalizeModelToSave(params.model, params.chartType);

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

exports.saveAllTabs = (event, tabsDescriptor) => {
  const timeLabel = (new Date()).toISOString().replace(/[\/\\:]/g, '');

  dialog.showSaveDialog({
    title: 'Save charts as ...',
    defaultPath: `charts-${timeLabel}.gmstat`,
    filters: [{name: 'Gapminder stat document', extensions: ['gmstat']}]
  }, fileName => {
    if (!fileName) {
      return;
    }

    tabsDescriptor.forEach(tabDescriptor => {
      normalizeModelToSave(tabDescriptor.model, tabDescriptor.type);
    });

    fs.writeFile(fileName, JSON.stringify(tabsDescriptor, null, ' '), err => {
      if (err) {
        dialog.showErrorBox('File save error', err.message);
        ga.error('Charts was NOT saved: ' + err.toString());
        return;
      }

      ga.error('Charts successfully saved');
      console.info('Charts successfully saved');
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
