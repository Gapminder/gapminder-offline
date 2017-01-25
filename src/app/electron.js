const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const request = require('request');
const semver = require('semver');
const autoUpdateConfig = require('./auto-update-config.json');
const electronEasyUpdater = require('electron-easy-updater');
const fileManagement = require('./file-management');
const childProcess = require('child_process');

const spawn = childProcess.spawn;
const dirs = {
  linux: './',
  darwin: __dirname + '/../../../../',
  win32: '.\\'
};
const DATA_PACKAGE_PATH = {
  win32: '.\\resources\\app\\ddf--gapminder--systema_globalis\\datapackage.json',
  linux: app.getAppPath() + '/ddf--gapminder--systema_globalis/datapackage.json',
  darwin: app.getAppPath() + '/ddf--gapminder--systema_globalis/datapackage.json'
};

process.noAsar = true;

const RELEASE_ARCHIVE = 'release.zip';
const FEED_VERSION_URL = autoUpdateConfig.FEED_VERSION_URL;
const FEED_URL = autoUpdateConfig.FEED_URL
  .replace(/#os#/g, process.platform)
  .replace(/#arch#/g, process.arch);
const PARTIAL_FEED_URL = autoUpdateConfig.PARTIAL_FEED_URL
  .replace(/#os#/g, process.platform)
  .replace(/#arch#/g, process.arch);
const DS_FEED_VERSION_URL = autoUpdateConfig.DS_FEED_VERSION_URL;
const DS_FEED_URL = autoUpdateConfig.DS_FEED_URL;
const PRESETS_FILE = __dirname + '/presets.json';
const UPDATE_FLAG_FILE = `${dirs[process.platform]}update-required`;
const CACHE_DIR = `${dirs[process.platform]}cache`;

let mainWindow = null;
let updateProcessDescriptor;

class UpdateProcessDescriptor {
  constructor(type, version, url) {
    this.type = type;
    this.version = version;
    this.url = url || FEED_URL;
  }
}

function finishUpdate(type) {
  if (process.platform !== 'win32') {
    const updateCommand = dirs[process.platform] + 'update-' + type + '-' + process.platform;

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
      'cmd.exe',
      ['/s', '/c', '"update-' + type + '-win32.bat"'],
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
        event.sender.send('unpack-complete', err);
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
          fs.writeFile(UPDATE_FLAG_FILE, updateProcessDescriptor.type, () => {
            event.sender.send('unpack-complete', err);
          });
        });
    }
  );
}

function startMainApplication() {
  mainWindow = new BrowserWindow({width: 1200, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipc.on('get-app-path', event => {
    event.sender.send('got-app-path', app.getAppPath());
  });

  ipc.on('get-supported-versions', event => {
    request.get(FEED_VERSION_URL, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        try {
          const config = JSON.parse(body);

          event.sender.send('got-supported-versions', config.supported, config.version);
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

        updateProcessDescriptor = new UpdateProcessDescriptor('full', actualVersionGenericUpdate, url);

        event.sender.send('request-to-update', actualVersionGenericUpdate);
        return;
      }

      const dataPackage = require(DATA_PACKAGE_PATH[process.platform]);

      electronEasyUpdater.versionCheck({
        url: DS_FEED_VERSION_URL,
        version: dataPackage.version
      }, (errDsUpdate, actualVersionDsUpdate) => {
        if (!errDsUpdate && actualVersionDsUpdate) {
          updateProcessDescriptor = new UpdateProcessDescriptor('dataset', actualVersionDsUpdate, DS_FEED_URL);

          event.sender.send('request-to-update', actualVersionDsUpdate);
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

  ipc.on('do-open', fileManagement.openFile);
  ipc.on('do-save', fileManagement.saveFile);
  ipc.on('do-export-for-web', fileManagement.exportForWeb);

  ipc.on('exit-and-update', () => {
    finishUpdate(updateProcessDescriptor.type, () => {
      process.exit(0);
    });
  });
}

app.on('window-all-closed', () => {
  app.quit();
  process.exit(0);
});

app.on('ready', () => {
  fs.readFile(UPDATE_FLAG_FILE, 'utf8', (err, content) => {
    if (err) {
      fsExtra.removeSync(CACHE_DIR);
      startMainApplication();
      return;
    }

    finishUpdate(content);
  });
});
