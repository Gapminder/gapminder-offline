const electron = require('electron');
const path = require('path');
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const fsExtra = require('fs-extra');
const async = require('async');
const request = require('request');
const semver = require('semver');
const onlineBranchExist = require('online-branch-exist');
const autoUpdateConfig = require('./auto-update-config.json');
const electronEasyUpdater = require('electron-easy-updater');
const fileManagement = require('./file-management');
const childProcess = require('child_process');
const dataPackage = require(app.getAppPath() + '/ddf--gapminder--systema_globalis/datapackage.json');
const devMode = process.argv.length > 1 && process.argv.indexOf('dev') > 0;
const autoUpdateTestMode = process.argv.length > 1 && process.argv.indexOf('au-test') > 0;

const packageJSON = require('./package.json');
const GoogleAnalytics = require('./google-analytics');
const ga = new GoogleAnalytics(packageJSON.googleAnalyticsId, app.getVersion());

const currentDir = path.resolve(__dirname, '..', '..');
const spawn = childProcess.spawn;
const dirs = {
  linux: currentDir + path.sep,
  darwin: __dirname + path.sep,
  win32: currentDir + path.sep
};

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
const RELEASE_APP_ARCHIVE = 'release-app.zip';
const RELEASE_DS_ARCHIVE = 'release-ds.zip';
const FEED_VERSION_URL = autoUpdateTestMode ? autoUpdateConfig.FEED_VERSION_URL_TEST : autoUpdateConfig.FEED_VERSION_URL;
const FEED_URL = autoUpdateConfig.FEED_URL.replace(/#type#/g, getTypeByOsAndArch(process.platform, process.arch));
const PARTIAL_FEED_URL = autoUpdateConfig.PARTIAL_FEED_URL.replace(/#type#/g, getTypeByOsAndArch(process.platform, process.arch));
const DS_FEED_VERSION_URL = autoUpdateConfig.DS_FEED_VERSION_URL;
const DS_FEED_URL = autoUpdateConfig.DS_FEED_URL;
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

let updateProcessAppDescriptor;
let updateProcessDsDescriptor;

let mainWindow = null;

let currentFile;

const DdfValidatorWrapper = require('./validator-wrapper').DdfValidatorWrapper;
const ddfValidatorWrapper = new DdfValidatorWrapper();

class UpdateProcessDescriptor {
  constructor(version, url) {
    this.version = version;
    this.url = url || FEED_URL;
  }
}

function finishUpdate() {
  fs.writeFileSync(UPDATE_PROCESS_FLAG_FILE, 'updating');

  if (process.platform !== 'win32') {
    const updateCommand = dirs[process.platform] + 'updater';

    spawn(
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
    spawn(
      'wscript.exe',
      ['"invisible.vbs"', '"updater-' + getTypeByOsAndArch(process.platform, process.arch) + '.exe"'],
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
          err => {
            if (err) {
              ga.error('auto update -> unpacking error: ' + err);
              event.sender.send('auto-update-error', err);
            }

            cb(err);
          });
      }
    );
  };

  async.parallel([
    getLoader(CACHE_APP_DIR, RELEASE_APP_ARCHIVE, updateProcessAppDescriptor),
    getLoader(CACHE_DS_DIR, RELEASE_DS_ARCHIVE, updateProcessDsDescriptor)
  ], err => {
    if (err) {
      rollback();
      return;
    }

    fs.writeFile(UPDATE_FLAG_FILE, 'need-to-update', () => {
      event.sender.send('unpack-complete', null);
    });
  });
}

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

  ipc.on('request-custom-update', (event, version) => {
    event.sender.send('request-and-update', version);
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

  ipc.on('check-version', event => {
    electronEasyUpdater.versionCheck({
      url: FEED_VERSION_URL,
      version: app.getVersion()
    }, (errGenericUpdate, actualVersionGenericUpdate, versionDiffType) => {
      if (errGenericUpdate) {
        return;
      }

      if (actualVersionGenericUpdate) {
        const url = versionDiffType === 'patch' ? PARTIAL_FEED_URL : FEED_URL;

        updateProcessAppDescriptor = new UpdateProcessDescriptor(actualVersionGenericUpdate, url);
      }

      electronEasyUpdater.versionCheck({
        url: DS_FEED_VERSION_URL,
        version: dataPackage.version
      }, (errDsUpdate, actualVersionDsUpdateParam) => {
        if (errDsUpdate) {
          return;
        }

        let actualVersionDsUpdate = null;

        if (actualVersionDsUpdateParam || actualVersionGenericUpdate) {
          if (actualVersionDsUpdateParam && semver.valid(actualVersionDsUpdateParam)) {
            const tagVersion = autoUpdateConfig.DS_TAG.replace(/#version#/, actualVersionDsUpdateParam);

            onlineBranchExist.tag(tagVersion, (err, res) => {
              if (res) {
                actualVersionDsUpdate = actualVersionDsUpdateParam;
              }

              updateProcessDsDescriptor = new UpdateProcessDescriptor(actualVersionDsUpdate, DS_FEED_URL);

              event.sender.send('request-to-update', {actualVersionDsUpdate, actualVersionGenericUpdate});
            });
          } else {
            event.sender.send('request-to-update', {actualVersionGenericUpdate});
          }
        }
      });
    });
  });

  ipc.on('prepare-update', (event, version) => {
    if (version) {
      const url = semver.diff(app.getVersion(), version) === 'patch' ? PARTIAL_FEED_URL : FEED_URL;

      updateProcessAppDescriptor = new UpdateProcessDescriptor(version, url);
    }

    startUpdate(event);
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
    finishUpdate();
  });

  ipc.on('start-validation', (event, params) => {
    ddfValidatorWrapper.start(event, params);
  });

  ipc.on('abandon-validation', () => {
    ddfValidatorWrapper.abandon();
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

        finishUpdate();
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
