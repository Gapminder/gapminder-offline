const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const path = require('path');
const fs = require('fs');
const request = require('request');

const DATA_PATH = {
  win32: '.\\resources\\app\\ddf--gapminder--systema_globalis',
  linux: './resources/app/ddf--gapminder--systema_globalis',
  darwin: app.getAppPath() + '/ddf--gapminder--systema_globalis'
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
    const currentDir = path.parse(fileName).dir;

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
        event.sender.send('do-open-completed', {tab: config});
      });
    });
  });
};


exports.saveFile = (event, params) => {
  dialog.showSaveDialog({
    title: 'Save current chart as ...',
    filters: [{name: 'JSON', extensions: ['json']}]
  }, fileName => {
    if (!fileName) {
      return;
    }

    Object.keys(params.tab.modelFull).forEach(key => {
      if ((key === 'data' || key.indexOf('data_') === 0) && typeof params.tab.modelFull[key] === 'object') {
        if (isPathInternal(params.tab.modelFull[key].path)) {
          const parsed = path.parse(params.tab.modelFull[key].path);

          params.tab.modelFull[key].path = `@internal`
        } else {
          params.tab.modelFull[key].path = pathToRelative(fileName, params.tab.modelFull[key].path);
        }
      }
    });

    params.tab.modelFull.chartType = params.tab.chartType;

    fs.writeFile(fileName, JSON.stringify(params.tab.modelFull, null, ' '), err => {
      if (err) {
        dialog.showErrorBox('File save error', err.message);
        return;
      }

      dialog.showMessageBox({
        message: 'Chart state successfully saved',
        buttons: ['OK']
      });
    });
  });
};
