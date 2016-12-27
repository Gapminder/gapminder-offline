const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const request = require('request');
const autoUpdateConfig = require('./auto-update-config.json');
const electronEasyUpdater = require('electron-easy-updater');
const childProcess = require('child_process');

const spawn = childProcess.spawn;
const dirs = {
  linux: './',
  darwin: __dirname + '/../../../../',
  win32: '.\\'
};

process.noAsar = true;

const RELEASE_ARCHIVE = 'release.zip';
const FEED_VERSION_URL = autoUpdateConfig.FEED_VERSION_URL;
const FEED_URL = autoUpdateConfig.FEED_URL.replace(/#os#/g, process.platform);
const PRESETS_FILE = __dirname + '/presets.json';
const UPDATE_FLAG_FILE = `${dirs[process.platform]}update-required`;
const CACHE_DIR = `${dirs[process.platform]}cache`;

let mainWindow = null;
let newVersion = null;

function finishUpdate() {
  if (process.platform !== 'win32') {
    const updateCommand = dirs[process.platform] + 'update-' + process.platform;

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
      ['/s', '/c', '"update-win32.bat"'],
      {
        windowsVerbatimArguments: true,
        stdio: 'ignore',
        detached: true
      }
    ).unref();
  }

  app.quit();
}

function startUpdate(event, version) {
  const releaseUrl = FEED_URL.replace('#version#', version);

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
          fs.writeFile(UPDATE_FLAG_FILE, '0', () => {
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

          event.sender.send('got-supported-versions', config.supported);
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
    setTimeout(() => {
      electronEasyUpdater.versionCheck({
        url: FEED_VERSION_URL,
        version: app.getVersion()
      }, (err, actualVersion) => {
        if (!err && actualVersion) {
          newVersion = actualVersion;
          event.sender.send('request-to-update', actualVersion);
        }
      });
    }, 10000);
  });

  ipc.on('prepare-update', (event, version) => {
    startUpdate(event, version || newVersion);
  });

  ipc.on('new-version-ready-flag', () => {
    fs.writeFile(UPDATE_FLAG_FILE, '0', err => null);
  });

  ipc.on('do-open', (event, params) => {

    dialog.showOpenDialog({
      title: 'Open chart state ...',
      filters: [{name: 'JSON', extensions: ['json']}],
      properties: ['openFile']
    }, function(fileNames){

      if(!fileNames) {
        return;
      }

      fs.readFile(fileNames[0], 'utf-8', function (err, data) {

        if(err) {
          dialog.showErrorBox("File reading error", err.message);
        } else {
          const chartTab = JSON.parse(data);
          const dataPath = chartTab.model.data.path;

          if(fs.existsSync(dataPath)) {
            // complete successfully
            event.sender.send('do-open-completed', {tab: chartTab});
          } else {
            // fix path
            const brokenPath = path.basename(dataPath);
            dialog.showErrorBox("Broken path detected.", 'Choose correct location for "'+brokenPath+'"');

            dialog.showOpenDialog({
              title: 'Select location for "'+brokenPath+'"...',
              properties: ['openDirectory']
            }, function(dirPaths){

              if(!dirPaths) {
                return;
              }

              const dirPath = dirPaths[0];

              // update model fith correct path
              chartTab.model.data.path = dirPath;
              chartTab.model.data.ddfPath = dirPath;
              chartTab.modelFull.data.path = dirPath;
              chartTab.modelFull.data.ddfPath = dirPath;

              event.sender.send('do-open-completed', {tab: chartTab});
            });
          }
        }

      });

    });

  });

  ipc.on('do-save', (event, params) => {

    dialog.showSaveDialog({
      title: 'Save current chart as ...',
      filters: [{name: 'JSON', extensions: ['json']}]
    }, function(fileName){

      if (!fileName) {
        return;
      }

      fs.writeFile(fileName, JSON.stringify(params.tab), function (err) {

        if(err) {
          dialog.showErrorBox("File save error", err.message);
        } else {
          dialog.showMessageBox({
            message: "Chart state successfully saved",
            buttons: ["OK"]
          });
        }
      });
    });
  });

  ipc.on('exit-and-update', () => {
    finishUpdate(() => {
      process.exit(0);
    });
  });
}

app.on('window-all-closed', () => {
  app.quit();
  process.exit(0);
});

app.on('ready', () => {
  fs.readFile(UPDATE_FLAG_FILE, 'utf8', err => {
    if (err) {
      fsExtra.removeSync(CACHE_DIR);
      startMainApplication();
      return;
    }

    finishUpdate();
  });
});
