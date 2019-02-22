import { app, BrowserWindow, ipcMain as ipc, session } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as net from 'net';
import * as urlLib from 'url';
import * as ps from 'ps-node';
import * as request from 'request';
import * as semver from 'semver';
import * as semverSort from 'semver-sort';
import * as gitclient from 'git-fetch-pack';
import * as transport from 'git-transport-protocol';
import * as fsExtra from 'fs-extra';
import * as childProcess from 'child_process';
import * as electronEasyUpdater from 'electron-easy-updater';
import { parallel } from 'async';
import { exportForWeb, openFileWhenDoubleClick, openFileWithDialog, saveAllTabs, saveFile } from './file-management';
import { GoogleAnalytics } from './google-analytics';
import { hashElement } from 'folder-hash';
import {
  DS_FEED_URL_TEMP,
  DS_FEED_VERSION_URL_TEMP,
  FEED_VERSION_URL_TEMP,
  FEED_VERSION_URL_TEST_TEMP,
  FEED_FULL_URL_TEMP,
  FEED_URL_TEMP,
  FEED_HASH_URL,
  FEED_PARTIAL_HASH_URL
} from './auto-update-config';

require('node-fetch');

process.noAsar = true;

const getTypeByOsAndArch = (os, arch) => {
  if (os === 'win32' && arch === 'x64') {
    return 'win64';
  }

  if (os === 'win32' && arch === 'ia32') {
    return 'win32';
  }

  if (os === 'darwin') {
    return 'mac';
  }

  return os;
};

const currentDir = path.resolve(__dirname, '..', '..');
const dirs = {
  linux: currentDir,
  darwin: path.resolve(__dirname.replace(/\/app\.asar/, '')),
  win32: path.resolve(__dirname.replace(/\/app\.asar/, ''), '..', '..')
};

const autoUpdateLog = message => {
  const date = new Date().toISOString();

  fs.appendFileSync('./auto-update-err.log', `${date}: ${message}\n`);
};

const packageJSON = require('./package.json');
const ga = new GoogleAnalytics(packageJSON.googleAnalyticsId, app.getVersion());

const args = process.argv.slice(1);
const devMode = process.argv.length > 1 && process.argv.indexOf('dev') > 0;
const autoUpdateTestMode = process.argv.length > 1 && process.argv.indexOf('au-test') > 0;
const quickAutoUpdateTestMode = process.argv.length > 1 && process.argv.indexOf('au-q-test') > 0;
const versionToQuickUpdate = quickAutoUpdateTestMode ? args[1] : '';
const quickUpdateType = versionToQuickUpdate ? args[2] : '';
const nonAsarAppPath = app.getAppPath().replace(/app\.asar/, '');
const dataPackage = require(path.resolve(nonAsarAppPath, 'ddf--gapminder--systema_globalis/datapackage.json'));
const serve = args.some(val => val === '--serve');

const RELEASE_APP_ARCHIVE = 'release-app.zip';
const RELEASE_DS_ARCHIVE = 'release-ds.zip';
const FEED_VERSION_URL = autoUpdateTestMode ? FEED_VERSION_URL_TEST_TEMP : FEED_VERSION_URL_TEMP;
const FEED_URL = FEED_URL_TEMP.replace(/#type#/g, getTypeByOsAndArch(process.platform, process.arch));
const FEED_FULL_URL = FEED_FULL_URL_TEMP.replace(/#type#/g, getTypeByOsAndArch(process.platform, process.arch));
const DS_FEED_VERSION_URL = DS_FEED_VERSION_URL_TEMP;
const DS_FEED_URL = DS_FEED_URL_TEMP;
const CACHE_APP_DIR = `${dirs[process.platform]}/cache-app`;
const CACHE_DS_DIR = `${dirs[process.platform]}/cache-ds`;

let mainWindow;
let updateProcessAppDescriptor;
let updateProcessDsDescriptor;
let currentFile;

function isRunAllowed(reason, cb) {
  ps.lookup({}, (err, resultLists) => {
    if (err) {
      return cb(false);
    }

    for (const rec of resultLists) {
      if (rec.command && rec.command.indexOf(reason) >= 0) {
        return cb(false);
      }

      if (rec.arguments && rec.arguments.length > 0) {
        for (const aRec of rec.arguments) {
          if (aRec.indexOf(reason) >= 0) {
            return cb(false);
          }
        }
      }
    }

    cb(true);
  });
}

function isChecksumAppropriate(isCacheAppExists, cb) {
  if (!isCacheAppExists) {
    return cb(true);
  }

  electronEasyUpdater.versionCheck({
    url: FEED_VERSION_URL,
    version: app.getVersion()
  }, (versionErr, actualVersion) => {
    if (versionErr) {
      autoUpdateLog('can not get actualVersion during auto-update: ' + versionErr);
    }

    const feedHashUrl = FEED_HASH_URL
      .replace(/#type#/g, getTypeByOsAndArch(process.platform, process.arch))
      .replace(/#version#/g, actualVersion);
    const feedPartialHashUrl = FEED_PARTIAL_HASH_URL
      .replace(/#type#/g, getTypeByOsAndArch(process.platform, process.arch))
      .replace(/#version#/g, actualVersion);

    electronEasyUpdater.fileLoad({url: feedHashUrl, json: false}, (hashFileErr, hashFile) => {
      if (hashFileErr) {
        autoUpdateLog(`can not get hash during auto-update by url ${feedHashUrl}: ` + hashFileErr);
      }

      electronEasyUpdater.fileLoad({url: feedPartialHashUrl, json: false}, (partialHashFileErr, partialHashFile) => {
        if (partialHashFileErr) {
          autoUpdateLog(`can not get hash during auto-update by url ${feedPartialHashUrl}: ` + partialHashFileErr);
        }

        const cacheDirs = {
          linux: CACHE_APP_DIR + '/Gapminder Offline-linux/',
          win32: CACHE_APP_DIR,
          darwin: CACHE_APP_DIR + '/Gapminder Offline.app/'
        };

        const exclude = process.platform.indexOf('win') >= 0 ? ['**.zip'] : ['*.zip', '**/*.zip'];

        hashElement(cacheDirs[process.platform], {files: {exclude}, ignoreRootName: true}).then(hash => {
          try {
            const hashString = JSON.stringify(hash.children, null, 2);
            const isPartialHashEqual = !partialHashFileErr && hashString === partialHashFile;
            const isHashEqual = !hashFileErr && hashString === hashFile;

            cb(isHashEqual || isPartialHashEqual);
          } catch (parseErr) {
            console.log(parseErr);
            cb(false);
          }
        }).catch(localHashErr => {
          autoUpdateLog(`can not get local hash during auto-update: ` + localHashErr);

          cb(false);
        });
      });
    });
  });
}

function getLatestGithubTag(inputParam: string, onTagReady: Function) {
  const input = inputParam.replace(/^(?!(?:https|git):\/\/)/, 'https://');
  const tcp = net.connect({host: urlLib.parse(input).host, port: 9418});
  const client = gitclient(input);
  const tags = [];

  client.refs.on('data', ref => {
    const name = ref.name;

    if (/^refs\/tags/.test(name)) {
      tags.push(name.split('/')[2].replace(/\^\{\}$/, '').substr(1));
    }
  });

  client
    .pipe(transport(tcp))
    .on('error', err => onTagReady(err))
    .pipe(client)
    .on('error', err => onTagReady(err))
    .once('end', () => {
      if (tags.length === 0) {
        return onTagReady(Error('Tags are missing'));
      }

      onTagReady(null, semverSort.desc(tags)[0]);
    });
}

class UpdateProcessDescriptor {
  constructor(public version: string, public url: string = FEED_URL) {
  }
}

function rollback() {
  try {
    fsExtra.removeSync(CACHE_APP_DIR);
    fsExtra.removeSync(CACHE_DS_DIR);
  } catch (e) {
    console.log(e);
  }
}

function finishUpdate() {
  if (process.platform !== 'win32') {
    const updateCommand = dirs[process.platform] + '/gapminder-updater';

    childProcess.spawn(
      updateCommand,
      [],
      {
        cwd: dirs[process.platform],
        stdio: 'ignore',
        detached: true
      }
    ).unref();
  }

  if (process.platform === 'win32') {
    childProcess.spawn(
      'wscript.exe',
      ['"invisible.vbs"', '"gapminder-updater-' + getTypeByOsAndArch(process.platform, process.arch) + '.exe"'],
      {
        windowsVerbatimArguments: true,
        cwd: dirs[process.platform],
        stdio: 'ignore',
        detached: true
      }
    ).unref();
  }

  app.quit();
}

function startUpdate(event) {
  const getLoader = (cacheDir, releaseArchive, updateProcessDescriptor) => cb => {
    if (!updateProcessDescriptor || !updateProcessDescriptor.version) {
      cb();
      return;
    }

    const releaseUrl = updateProcessDescriptor.url.replace('#version#', updateProcessDescriptor.version);

    ga.event('Run', `starting and trying auto update from ${app.getVersion()} to ${updateProcessDescriptor.version}`);

    electronEasyUpdater.download({
        url: releaseUrl,
        version: app.getVersion(),
        path: cacheDir,
        file: releaseArchive
      }, progress => {
        event.sender.send('download-progress', {progress, cacheDir});
      },
      err => {
        if (err) {
          event.sender.send('auto-update-error', err);
          ga.error('auto update -> download error: ' + err);

          cb(err);
          return;
        }

        electronEasyUpdater.unpack({
            directory: cacheDir,
            file: releaseArchive
          },
          progress => {
            event.sender.send('unpack-progress', {progress, cacheDir});
          },
          unpackErr => {
            if (unpackErr) {
              ga.error('auto update -> unpacking error: ' + unpackErr);
              event.sender.send('auto-update-error', unpackErr);
            }

            cb(unpackErr);
          });
      }
    );
  };

  parallel([
    getLoader(CACHE_APP_DIR, RELEASE_APP_ARCHIVE, updateProcessAppDescriptor),
    getLoader(CACHE_DS_DIR, RELEASE_DS_ARCHIVE, updateProcessDsDescriptor)
  ], err => {
    if (err) {
      rollback();
      return;
    }

    event.sender.send('unpack-complete', null);
  });
}

function createWindow(showError = false) {
  const isFileArgumentValid = fileName => fs.existsSync(fileName) && fileName.indexOf('-psn_') === -1;

  mainWindow = new BrowserWindow({width: 1200, height: 800});
  mainWindow.appPath = nonAsarAppPath;
  mainWindow.devMode = devMode;

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

  if (showError) {
    mainWindow.webContents.send('auto-update-error', 'wrong checksum');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('will-navigate', (event) => {
    event.preventDefault();
  });

  ipc.on('get-dev-mode', event => {
    event.sender.send('got-dev-mode', devMode);
  });

  ipc.on('get-versions-info', () => {
    mainWindow.setTitle(`Gapminder Tools Offline v.${app.getVersion()} (dataset v.${dataPackage.version})`);
  });

  ipc.on('get-app-path', event => {
    event.sender.send('got-app-path', nonAsarAppPath);
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
        openFileWhenDoubleClick(event, fileName);
      }
    }
  });

  ipc.on('get-supported-versions', event => {
    request.get(FEED_VERSION_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        try {
          const config = JSON.parse(body);

          event.sender.send('got-supported-versions', config.modern3.supported, config.modern3.version, app.getVersion());
        } catch (e) {
        }
      }
    });
  });

  ipc.on('request-custom-update', (event, actualVersionGenericUpdate) => {
    event.sender.send('request-and-update', {actualVersionGenericUpdate, os: process.platform, arch: process.arch});
  });

  ipc.on('do-open-validation-window', event => {
    event.sender.send('open-validation-window', 'open-validation-window');
  });

  ipc.on('open-dev-tools', () => {
    mainWindow.webContents.openDevTools();
  });

  ipc.on('check-version', event => {
    electronEasyUpdater.versionCheck({
      url: FEED_VERSION_URL,
      version: app.getVersion()
    }, (errGenericUpdate, actualVersionGenericUpdate, versionDiffType) => {
      if (errGenericUpdate) {
        return;
      }

      actualVersionGenericUpdate = quickAutoUpdateTestMode ? versionToQuickUpdate : actualVersionGenericUpdate;
      versionDiffType = quickAutoUpdateTestMode ? quickUpdateType : versionDiffType;

      if (actualVersionGenericUpdate) {
        if (versionDiffType === 'major') {
          event.sender.send('full-update-request', {
            actualVersionGenericUpdate,
            os: process.platform,
            arch: process.arch
          });
        }

        if (versionDiffType === 'minor') {
          updateProcessAppDescriptor = new UpdateProcessDescriptor(actualVersionGenericUpdate, FEED_FULL_URL);
        }

        if (versionDiffType === 'patch') {
          updateProcessAppDescriptor = new UpdateProcessDescriptor(actualVersionGenericUpdate, FEED_URL);
        }
      }

      const [, , , dsGithubOwner, dsGithubRepo] = DS_FEED_VERSION_URL.split('/');
      const requestToUpdate = (actualVersionDsUpdateParam?: string) => {
        let actualVersionDsUpdate = null;

        if (actualVersionDsUpdateParam || actualVersionGenericUpdate) {
          if (actualVersionDsUpdateParam && semver.valid(actualVersionDsUpdateParam)) {
            if (actualVersionDsUpdateParam) {
              actualVersionDsUpdate = actualVersionDsUpdateParam;
            }

            updateProcessDsDescriptor = new UpdateProcessDescriptor(actualVersionDsUpdate, DS_FEED_URL);

            event.sender.send('request-to-update', {
              actualVersionDsUpdate,
              actualVersionGenericUpdate,
              os: process.platform,
              arch: process.arch
            });
          } else {
            event.sender.send('request-to-update', {
              actualVersionGenericUpdate,
              os: process.platform,
              arch: process.arch
            });
          }
        }
      };

      getLatestGithubTag(`github.com/${dsGithubOwner}/${dsGithubRepo}`, (tagError, tagVersion) => {
        const tagToUpdate = semver.gt(tagVersion, dataPackage.version) ? tagVersion : null;

        requestToUpdate(tagToUpdate);
      });
    });
  });

  ipc.on('prepare-update', (event, version) => {
    if (version) {
      updateProcessAppDescriptor = new UpdateProcessDescriptor(version, FEED_FULL_URL);
    }

    startUpdate(event);
  });

  ipc.on('exit-and-update', () => {
    finishUpdate();
  });

  ipc.on('do-open', openFileWithDialog);
  ipc.on('do-save', saveFile);
  ipc.on('do-save-all-tabs', saveAllTabs);
  ipc.on('do-export-for-web', exportForWeb);

  ipc.on('new-chart', (event, chartType) => {
    ga.chartEvent(chartType);
  });
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
  const isCacheAppExists = fs.existsSync(CACHE_APP_DIR);
  const isCacheDsExists = fs.existsSync(CACHE_DS_DIR);

  if ((isCacheAppExists || isCacheDsExists)) {
    isRunAllowed('gapminder-updater', (yes) => {
      if (yes) {
        isChecksumAppropriate(isCacheAppExists, (isUpdateAllowed) => {
          if (!isUpdateAllowed) {
            rollback();

            ga.runEvent(false);

            autoUpdateLog('wrong checksum');

            createWindow(true);
            return;
          }

          ga.runEvent(true);

          finishUpdate();
        });
      } else {
        autoUpdateLog('update process is running');

        app.quit();
      }
    });
  } else {
    createWindow();
  }
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
    if (!devMode && !autoUpdateTestMode) {
      currentFile = filePath;
    }
  }
});

process.on('uncaughtException', function (error) {
  fs.appendFileSync('./error.log', `${new Date().toISOString()}- ${error.name}: ${error.stack}\n`);
});
