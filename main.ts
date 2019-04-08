import { app, BrowserWindow, ipcMain as ipc, remote } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as urlLib from 'url';
import * as log from 'electron-log';
import * as request from 'request';
import { diff } from 'semver';
import { autoUpdater } from 'electron-updater';
import {
  addBookmark,
  exportForWeb,
  getUpdateLinks, openBookmark,
  openFileWhenDoubleClick,
  openFileWithDialog, readBookmarks,
  saveAllTabs,
  saveFile
} from './file-management';
import { GoogleAnalytics } from './google-analytics';
import { getLatestGithubTag, updateDataset } from './dataset-update';
import * as os from 'os';

require('node-fetch');

export const FEED_VERSION_URL = 'http://s3-eu-west-1.amazonaws.com/gapminder-offline/auto-update.json';
const packageJSON = require('./package.json');
const dsGithubOwner = 'open-numbers';
const dsGithubRepo = 'ddf--gapminder--systema_globalis';
const isPortable = !!process.env.PORTABLE_EXECUTABLE_DIR;
const ga = new GoogleAnalytics(packageJSON.googleAnalyticsId, app.getVersion());

autoUpdater.logger = log as any;
(autoUpdater.logger as any).transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;

const args = process.argv.slice(1);
const devMode = process.argv.length > 1 && process.argv.indexOf('dev') > 0;
const nonAsarAppPath = app.getAppPath().replace(/app\.asar/, '');
const userDataPath = (app || remote.app).getPath('userData');
const datasetPath = path.resolve(nonAsarAppPath, 'ddf--gapminder--systema_globalis');
const serve = args.some(val => val === '--serve');

let dataPackage = require(path.resolve(datasetPath, 'datapackage.json'));

let mainWindow;
let currentFile;
let isVersionCheckPassed = false;

function createWindow() {
  const isFileArgumentValid = fileName => fs.existsSync(fileName) && fileName.indexOf('-psn_') === -1;

  mainWindow = new BrowserWindow({width: 1200, height: 800});
  mainWindow.appPath = nonAsarAppPath;
  mainWindow.devMode = devMode;
  mainWindow.userDataPath = userDataPath;

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadURL(urlLib.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (devMode) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.once('did-finish-load', () => {
    if (!isPortable) {
      autoUpdater.checkForUpdates();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('will-navigate', (event) => {
    event.preventDefault();
  });

  ipc.on('start-download', () => {
    autoUpdater.downloadUpdate();
  });

  function requireUncached(module) {
    delete require.cache[require.resolve(module)];

    return require(module);
  }

  ipc.on('dataset-reload', () => {
    dataPackage = requireUncached(path.resolve(datasetPath, 'datapackage.json'));
    mainWindow.setTitle(`Gapminder Tools Offline v.${app.getVersion()} (dataset v.${dataPackage.version})`);
    mainWindow.reload();
  });

  ipc.on('start-dataset-update', async (event, tagVersion) => {
    try {
      await updateDataset(tagVersion, datasetPath, userDataPath);
      mainWindow.webContents.send('dataset-updated');
    } catch (e) {
      mainWindow.webContents.send('dataset-not-updated', e);
    }
  });

  ipc.on('start-update', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('update-available', async (ev) => {
    isVersionCheckPassed = true;
    mainWindow.webContents.send('update-available', ev);
  });

  autoUpdater.on('update-not-available', async () => {
    isVersionCheckPassed = true;

    if (os.platform() !== 'linux' && !isPortable) {
      const tagVersion = await getLatestGithubTag(`github.com/${dsGithubOwner}/${dsGithubRepo}`);

      if (diff(tagVersion, dataPackage.version)) {
        mainWindow.webContents.send('dataset-update-available', tagVersion);
      }
    }
  });

  autoUpdater.on('error', (err) => {
    if (isVersionCheckPassed) {
      mainWindow.webContents.send('update-error', err);
    }
  });

  autoUpdater.on('download-progress', (ev) => {
    mainWindow.webContents.send('download-progress', ev);
  });

  autoUpdater.on('update-downloaded', (ev) => {
    mainWindow.webContents.send('update-downloaded', ev);
  });

  ipc.on('get-versions-info', () => {
    mainWindow.setTitle(`Gapminder Tools Offline v.${app.getVersion()} (dataset v.${dataPackage.version})`);
  });

  ipc.on('reload-main-window', () => {
    mainWindow.reload();
  });

  ipc.on('get-app-arguments', event => {
    if (!devMode && (process.argv.length > 1 || currentFile)) {
      const fileName = currentFile || process.argv[1];

      if (isFileArgumentValid(fileName)) {
        event.sender.send('got-app-file-argument', {fileName});
        return;
      }
    }

    event.sender.send('got-app-file-argument', {});
  });

  ipc.on('open-file-after-start', event => {
    if (!devMode && (process.argv.length > 1 || currentFile)) {
      const fileName = currentFile || process.argv[1];

      if (isFileArgumentValid(fileName)) {
        openFileWhenDoubleClick(event, fileName);
      }
    }
  });

  ipc.on('get-supported-versions', event => {
    request.get(FEED_VERSION_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        try {
          const config = JSON.parse(body);
          const links = getUpdateLinks(config);

          event.sender.send('got-supported-versions', links.supported, links.currentVersion, app.getVersion());
        } catch (e) {
        }
      }
    });
  });

  ipc.on('do-open-validation-window', event => {
    event.sender.send('open-validation-window', 'open-validation-window');
  });

  ipc.on('open-dev-tools', () => {
    mainWindow.webContents.openDevTools();
  });

  ipc.on('do-open', openFileWithDialog);
  ipc.on('do-save', saveFile);
  ipc.on('add-bookmark', addBookmark);
  ipc.on('open-bookmark', openBookmark);
  ipc.on('get-bookmarks', async (event) => {
    const content = await readBookmarks();
    event.sender.send('got-bookmarks', {content});
  });
  ipc.on('do-save-all-tabs', saveAllTabs);
  ipc.on('do-export-for-web', exportForWeb);

  ipc.on('new-chart', (event, chartType) => {
    ga.chartEvent(chartType);
  });

  ipc.on('modify-chart', (event, action) => {
    ga.chartChangingEvent(action);
  });

  ipc.on('write-settings', (event, settings) => {
    console.log('save settings', settings);
  });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }

      mainWindow.focus();

      if (commandLine.length > 1) {
        openFileWhenDoubleClick(mainWindow, commandLine[1]);
      }
    }
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('open-file', (event, filePath) => {
  event.preventDefault();

  if (mainWindow && mainWindow.webContents) {
    openFileWhenDoubleClick(mainWindow, filePath);
  } else {
    if (!devMode) {
      currentFile = filePath;
    }
  }
});

process.on('uncaughtException', function (error) {
  fs.appendFileSync('./error.log', `${new Date().toISOString()}- ${error.name}: ${error.stack}\n`);
});
