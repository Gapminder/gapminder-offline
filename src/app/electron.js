const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 1200, height: 900});
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
});
