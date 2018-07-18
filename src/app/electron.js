const electron = require('electron');
const path = require('path');
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const fsExtra = require('fs-extra');
const request = require('request');
const autoUpdateConfig = require('./auto-update-config.json');
const fileManagement = require('./file-management');
const dataPackage = require(app.getAppPath() + '/ddf--gapminder--systema_globalis/datapackage.json');
const devMode = process.argv.length > 1 && process.argv.indexOf('dev') > 0;
const autoUpdateTestMode = process.argv.length > 1 && process.argv.indexOf('au-test') > 0;

const DdfValidatorWrapper = require('./validator-wrapper').DdfValidatorWrapper;
const packageJSON = require('./package.json');
const GoogleAnalytics = require('./google-analytics');
const ga = new GoogleAnalytics(packageJSON.googleAnalyticsId, app.getVersion());

const currentDir = path.resolve(__dirname, '..', '..');
const dirs = {
  linux: currentDir + path.sep,
  darwin: __dirname + path.sep,
  win32: currentDir + path.sep
};

process.noAsar = true;
const FEED_VERSION_URL = autoUpdateTestMode ? autoUpdateConfig.FEED_VERSION_URL_TEST : autoUpdateConfig.FEED_VERSION_URL;
const PRESETS_FILE = __dirname + '/presets.json';
const UPDATE_FLAG_FILE = `${dirs[process.platform]}update-required`;
const UPDATE_PROCESS_FLAG_FILE = `${dirs[process.platform]}updating`;
const CACHE_APP_DIR = `${dirs[process.platform]}cache-app`;
const CACHE_DS_DIR = `${dirs[process.platform]}cache-ds`;
const rollback = () => {
  try {
    fsExtra.removeSync(CACHE_APP_DIR);
    fsExtra.removeSync(CACHE_DS_DIR);
  } catch (e) {
  }
};

let mainWindow = null;
let currentFile;
let ddfValidatorWrapper;

function startMainApplication() {
  const isFileArgumentValid = fileName => fs.existsSync(fileName) && fileName.indexOf('-psn_') === -1;

  mainWindow = new BrowserWindow({width: 1200, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  if (devMode) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow.destroy();
  });

  ipc.on('get-dev-mode', event => {
    event.sender.send('got-dev-mode', devMode);
  });

  ipc.on('get-versions-info', () => {
    mainWindow.setTitle(`Gapminder Tools Offline v.${app.getVersion()} (dataset v.${dataPackage.version})`);
  });

  ipc.on('get-app-path', event => {
    event.sender.send('got-app-path', app.getAppPath());
  });

  ipc.on('get-app-arguments', event => {
    if (!devMode && !autoUpdateTestMode && (process.argv.length > 1 || currentFile)) {
      const fileName = currentFile || process.argv[1];

      if (isFileArgumentValid(fileName)) {
        event.sender.send('got-app-file-argument', {fileName});
        return;
      }
    }

    event.sender.send('got-app-file-argument', {});
  });

  ipc.on('open-file-after-start', event => {
    if (!devMode && !autoUpdateTestMode && (process.argv.length > 1 || currentFile)) {
      const fileName = currentFile || process.argv[1];

      if (isFileArgumentValid(fileName)) {
        fileManagement.openFileWhenDoubleClick(event, fileName);
      }
    }
  });

  ipc.on('get-supported-versions', event => {
    request.get(FEED_VERSION_URL, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        try {
          const config = JSON.parse(body);

          event.sender.send('got-supported-versions', config.modern.supported, config.modern.version, app.getVersion());
        } catch (e) {
        }
      }
    });
  });

  ipc.on('request-custom-update', (event, actualVersionGenericUpdate) => {
    event.sender.send('request-and-update', {actualVersionGenericUpdate, os: process.platform, arch: process.arch});
  });

  ipc.on('presets-export', (event, content) => {
    fs.writeFile(PRESETS_FILE, content, err => {
      event.sender.send('presets-export-end', err);
    });
  });

  ipc.on('do-presets-import', event => {
    fs.readFile(PRESETS_FILE, 'utf8', (err, content) => {
      event.sender.send('presets-import', {err, content});
    });
  });

  ipc.on('do-open-validation-window', event => {
    event.sender.send('open-validation-window', 'open-validation-window');
  });

  ipc.on('open-dev-tools', () => {
    mainWindow.webContents.openDevTools();
  });

  ipc.on('do-open', fileManagement.openFileWithDialog);
  ipc.on('do-save', fileManagement.saveFile);
  ipc.on('do-save-all-tabs', fileManagement.saveAllTabs);
  ipc.on('do-export-for-web', fileManagement.exportForWeb);

  ipc.on('new-chart', (event, chartType) => {
    ga.chartEvent(chartType);
  });
  ipc.on('new-chart', (event, chartType) => {
    ga.chartEvent(chartType);
  });

  ipc.on('modify-chart', (event, action) => {
    ga.chartChangingEvent(action);
  });

  ipc.on('exit-and-update', () => {
  });

  ipc.on('start-validation', (event, params) => {
    if (ddfValidatorWrapper) {
      ddfValidatorWrapper.abandon();
    }

    ddfValidatorWrapper = new DdfValidatorWrapper();
    ddfValidatorWrapper.start(event, params);
  });

  ipc.on('abandon-validation', () => {
    if (ddfValidatorWrapper) {
      ddfValidatorWrapper.abandon();
    }
  });
}

app.on('window-all-closed', () => {
  app.quit();
});

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.focus();

    if (commandLine.length > 1) {
      fileManagement.openFileWhenDoubleClick(mainWindow, commandLine[1]);
    }
  }
});

if (isSecondInstance) {
  app.quit();
}

app.on('ready', () => {
  fs.readFile(UPDATE_PROCESS_FLAG_FILE, 'utf8', updatingFileDoesNotExist => {
    if (updatingFileDoesNotExist) {
      fs.readFile(UPDATE_FLAG_FILE, 'utf8', updateFileDoesNotExist => {
        if (updateFileDoesNotExist) {
          rollback();

          ga.runEvent(false);

          startMainApplication();
          return;
        }

        ga.runEvent(true);
      });
    } else {
      // don't run during update process!
      app.quit();
    }
  });
});

app.on('open-file', (event, filePath) => {
  event.preventDefault();

  if (mainWindow && mainWindow.webContents) {
    fileManagement.openFileWhenDoubleClick(mainWindow, filePath);
  } else {
    if (!devMode && !autoUpdateTestMode) {
      currentFile = filePath;
    }
  }
});
