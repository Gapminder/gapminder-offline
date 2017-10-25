const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const fsExtra = require('fs-extra');
const request = require('request');
const semver = require('semver');
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

const spawn = childProcess.spawn;
const dirs = {
  linux: './',
  darwin: __dirname + '/',
  win32: '.\\'
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
const RELEASE_ARCHIVE = 'release.zip';
const FEED_VERSION_URL = autoUpdateTestMode ? autoUpdateConfig.FEED_VERSION_URL_TEST : autoUpdateConfig.FEED_VERSION_URL;
const FEED_URL = autoUpdateConfig.FEED_URL.replace(/#type#/g, getTypeByOsAndArch(process.platform, process.arch));
const PARTIAL_FEED_URL = autoUpdateConfig.PARTIAL_FEED_URL.replace(/#type#/g, getTypeByOsAndArch(process.platform, process.arch));
const DS_FEED_VERSION_URL = autoUpdateConfig.DS_FEED_VERSION_URL;
const DS_FEED_URL = autoUpdateConfig.DS_FEED_URL;
const PRESETS_FILE = __dirname + '/presets.json';
const UPDATE_FLAG_FILE = `${dirs[process.platform]}update-required`;
const CACHE_DIR = `${dirs[process.platform]}cache`;

let mainWindow = null;
let updateProcessDescriptor;
let currentFile;

class UpdateProcessDescriptor {
  constructor(type, version, url) {
    this.type = type;
    this.version = version;
    this.url = url || FEED_URL;
  }
}

function finishUpdate(type) {
  if (process.platform !== 'win32') {
    const updateCommand = dirs[process.platform] + 'update-' + type;

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
      ['"invisible.vbs"', '"update-' + type + '-' + getTypeByOsAndArch(process.platform, process.arch) + '.exe"'],
      {
        windowsVerbatimArguments: true,
        stdio: 'ignore',
        detached: true
      }
    ).unref();
  }

  app.quit();
}

function startUpdate(event) {
  const releaseUrl = updateProcessDescriptor.url.replace('#version#', updateProcessDescriptor.version);

  electronEasyUpdater.download({
      url: releaseUrl,
      version: app.getVersion(),
      path: CACHE_DIR,
      file: RELEASE_ARCHIVE
    }, progress => {
      event.sender.send('download-progress', progress);
    },
    err => {
      if (err) {
        event.sender.send('auto-update-error', err);
        ga.error('auto update -> download error: ' + err);
        return;
      }

      electronEasyUpdater.unpack({
          directory: CACHE_DIR,
          file: RELEASE_ARCHIVE
        },
        progress => {
          event.sender.send('unpack-progress', progress);
        },
        err => {
          if (err) {
            ga.error('auto update -> unpacking error: ' + err);
            event.sender.send('auto-update-error', err);
            return;
          }

          fs.writeFile(UPDATE_FLAG_FILE, updateProcessDescriptor.type, () => {
            ga.event('Run', `starting and trying auto update from ${app.getVersion()} to ${updateProcessDescriptor.version}`);
            event.sender.send('unpack-complete', null);
          });
        });
    }
  );
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

  ipc.on('get-versions-info', event => {
    event.sender.send('got-versions-info', {dataset: dataPackage.version, app: app.getVersion()});
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

  ipc.on('open-dev-tools', () => {
    mainWindow.webContents.openDevTools();
  });

  ipc.on('check-version', event => {
    electronEasyUpdater.versionCheck({
      url: FEED_VERSION_URL,
      version: app.getVersion()
    }, (errGenericUpdate, actualVersionGenericUpdate, versionDiffType) => {
      if (!errGenericUpdate && actualVersionGenericUpdate) {
        const url = versionDiffType === 'major' ? FEED_URL : PARTIAL_FEED_URL;

        updateProcessDescriptor = new UpdateProcessDescriptor('app', actualVersionGenericUpdate, url);

        event.sender.send('request-to-update', actualVersionGenericUpdate);
        return;
      }

      electronEasyUpdater.versionCheck({
        url: DS_FEED_VERSION_URL,
        version: dataPackage.version
      }, (errDsUpdate, actualVersionDsUpdate) => {
        if (!errDsUpdate && actualVersionDsUpdate) {
          updateProcessDescriptor = new UpdateProcessDescriptor('dataset', actualVersionDsUpdate, DS_FEED_URL);

          event.sender.send('request-to-ds-update', actualVersionDsUpdate);
        }
      });
    });
  });

  ipc.on('prepare-update', (event, version, type) => {
    if (version) {
      const url = semver.diff(app.getVersion(), version) === 'major' ? FEED_URL : PARTIAL_FEED_URL;

      updateProcessDescriptor = new UpdateProcessDescriptor(type, version, url);
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
    finishUpdate(updateProcessDescriptor.type, () => {
      app.quit();
    });
  });
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  fs.readFile(UPDATE_FLAG_FILE, 'utf8', (err, content) => {
    if (err) {
      fsExtra.removeSync(CACHE_DIR);

      ga.runEvent(false);

      startMainApplication();
      return;
    }

    ga.runEvent(true);

    finishUpdate(content);
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
