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
  openFileWithDialog, getBookmarksObject, removeBookmark,
  saveAllTabs,
  saveFile, updateBookmark,
  QueueProcessor, createNewBookmarksFolder, updateBookmarksFolder, removeBookmarksFolder
} from './file-management';
import { GoogleAnalytics } from './google-analytics';
import { getLatestGithubTag, updateDataset } from './dataset-update';
import * as os from 'os';
import './glob-const';

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
const bookmarkFile = path.resolve(userDataPath, 'bookmarks.json');
const datasetPath = path.resolve(nonAsarAppPath, 'ddf--gapminder--systema_globalis');
const serve = args.some(val => val === '--serve');
const queueProcessor = new QueueProcessor();
const globConst = (global as any).globConst;

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

  ipc.on(globConst.START_DOWNLOAD, () => {
    autoUpdater.downloadUpdate();
  });

  function requireUncached(module) {
    delete require.cache[require.resolve(module)];

    return require(module);
  }

  ipc.on(globConst.DATASET_RELOAD, () => {
    dataPackage = requireUncached(path.resolve(datasetPath, 'datapackage.json'));
    mainWindow.setTitle(`Gapminder Tools Offline v.${app.getVersion()} (dataset v.${dataPackage.version})`);
    mainWindow.reload();
  });

  ipc.on(globConst.START_DATASET_UPDATE, async (event, tagVersion) => {
    try {
      await updateDataset(tagVersion, datasetPath, userDataPath);
      mainWindow.webContents.send(globConst.DATASET_UPDATED);
    } catch (e) {
      mainWindow.webContents.send(globConst.DATASET_NOT_UPDATED, e);
    }
  });

  ipc.on(globConst.START_UPDATE, () => {
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

  ipc.on(globConst.GET_VERSIONS_INFO, () => {
    mainWindow.setTitle(`Gapminder Tools Offline v.${app.getVersion()} (dataset v.${dataPackage.version})`);
  });

  ipc.on(globConst.RELOAD_MAIN_WINDOW, () => {
    mainWindow.reload();
  });

  ipc.on(globConst.GET_APP_ARGUMENTS, event => {
    if (!devMode && (process.argv.length > 1 || currentFile)) {
      const fileName = currentFile || process.argv[1];

      if (isFileArgumentValid(fileName)) {
        event.sender.send(globConst.GOT_APP_FILE_ARGUMENT, {fileName});
        return;
      }
    }

    event.sender.send(globConst.GOT_APP_FILE_ARGUMENT, {});
  });

  ipc.on(globConst.OPEN_FILE_AFTER_START, event => {
    if (!devMode && (process.argv.length > 1 || currentFile)) {
      const fileName = currentFile || process.argv[1];

      if (isFileArgumentValid(fileName)) {
        openFileWhenDoubleClick(event, fileName);
      }
    }
  });

  ipc.on(globConst.GET_SUPPORTED_VERSIONS, event => {
    request.get(FEED_VERSION_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        try {
          const config = JSON.parse(body);
          const links = getUpdateLinks(config);

          event.sender.send(globConst.GOT_SUPPORTED_VERSIONS, links.supported, links.currentVersion, app.getVersion());
        } catch (e) {
        }
      }
    });
  });

  ipc.on(globConst.OPEN_DEV_TOOLS, () => {
    mainWindow.webContents.openDevTools();
  });

  ipc.on(globConst.DO_OPEN, openFileWithDialog);
  ipc.on(globConst.DO_SAVE, saveFile);
  ipc.on(globConst.ADD_BOOKMARK, async (event, params) => {
    queueProcessor.executeRequest(addBookmark, event, params);
  });
  ipc.on(globConst.UPDATE_BOOKMARK, async (event, params) => {
    queueProcessor.executeRequest(updateBookmark, event, params);
  });
  ipc.on(globConst.UPDATE_BOOKMARKS_FOLDER, async (event, params) => {
    queueProcessor.executeRequest(updateBookmarksFolder, event, params);
  });
  ipc.on(globConst.REMOVE_BOOKMARKS_FOLDER, async (event, params) => {
    queueProcessor.executeRequest(removeBookmarksFolder, event, params);
  });
  ipc.on(globConst.REMOVE_BOOKMARK, async (event, params) => {
    queueProcessor.executeRequest(removeBookmark, event, params);
  });
  ipc.on(globConst.OPEN_BOOKMARK, openBookmark);
  ipc.on(globConst.GET_BOOKMARKS, async (event) => {
    try {
      const data = await getBookmarksObject(bookmarkFile);
      event.sender.send(globConst.GOT_BOOKMARKS, {data});
    } catch (e) {
      event.sender.send(globConst.GOT_BOOKMARKS, {error: e.toString()});
    }
  });
  ipc.on(globConst.CREATE_NEW_BOOKMARKS_FOLDER, async (event, params) => {
    queueProcessor.executeRequest(createNewBookmarksFolder, event, params);
  });
  ipc.on(globConst.DO_SAVE_ALL_TABS, saveAllTabs);
  ipc.on(globConst.DO_EXPORT_FOR_WEB, exportForWeb);
  ipc.on(globConst.NEW_CHART, (event, chartType) => {
    ga.chartEvent(chartType);
  });

  ipc.on(globConst.MODIFY_CHART, (event, action) => {
    ga.chartChangingEvent(action);
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
