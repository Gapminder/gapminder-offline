import * as _ from 'lodash';
import * as async from 'async';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as zipdir from 'zip-dir';
import { promisify } from 'util';
import { app, remote } from 'electron';
import { GoogleAnalytics } from './google-analytics';

const dialog = require('electron').dialog;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const packageJSON = require('./package.json');
const ga = new GoogleAnalytics(packageJSON.googleAnalyticsId, app.getVersion());
const nonAsarAppPath = app.getAppPath().replace(/app\.asar/, '');
const userDataPath = (app || remote.app).getPath('userData');
const bookmarkFile = path.resolve(userDataPath, 'bookmarks.json');
const DATA_PATH = path.resolve(nonAsarAppPath, 'ddf--gapminder--systema_globalis');
const PREVIEW_DATA_PATH = path.resolve(nonAsarAppPath, 'preview-data');
const WEB_RESOURCE_PATH = path.resolve(nonAsarAppPath, 'export-template');
const WEB_PATH = path.resolve(userDataPath, 'web');
const previouslyOpened = {};

const getPathCorrectFunction = brokenPathObject => onPathReady => {
  const parsed = path.parse(brokenPathObject.path);

  if (previouslyOpened[parsed.base]) {
    brokenPathObject.path = previouslyOpened[parsed.base];

    onPathReady();
    return;
  }

  dialog.showMessageBox({
    type: 'question',
    buttons: ['OK', 'Cancel'],
    title: 'Confirm',
    message: `The chart you are about to open depends on the external file ${parsed.base}, which was not found because it was moved or
    renamed or left on some other computer. Press OK to help locate the file or Cancel to ignore and just open the app.`
  }, function (response) {
    if (response === 0) {
      dialog.showOpenDialog({
        title: `Choose correct location for "${parsed.base}"...`,
        properties: brokenPathObject.reader.indexOf('ddf') === 0 ? ['openDirectory'] : ['openFile']
      }, dirPaths => {
        if (!dirPaths || dirPaths.length < 0) {
          brokenPathObject.__abandoned = true;
          onPathReady();
          return;
        }

        brokenPathObject.path = dirPaths[0];
        previouslyOpened[parsed.base] = brokenPathObject.path;

        onPathReady();
      });
    } else {
      brokenPathObject.__abandoned = true;

      onPathReady();
    }
  });
};

const isPathInternal = (_path: string, template: string) => _path.startsWith(template);
const normalizeModelToSave = (model, chartType) => {
  Object.keys(model).forEach(key => {
    if ((key === 'data' || key.indexOf('data_') === 0) && typeof model[key] === 'object') {
      if (isPathInternal(model[key].path, DATA_PATH)) {
        model[key].path = `@internal`;
        model[key].assetsPath = `@internal`;
      }

      model[key].ddfPath = model[key].path;
    }

    if (key === 'locale' && typeof model[key] === 'object') {
      if (isPathInternal(model[key].filePath, PREVIEW_DATA_PATH)) {
        model[key].filePath = `@internal`;
      } else {
        model[key].filePath = path.resolve(__dirname, '..', '..', model[key].filePath);
      }
    }
  });

  model.chartType = chartType;
};
const normalizeModelToOpen = (model, brokenFileActions) => {
  Object.keys(model).forEach(key => {
    if ((key === 'data' || key.indexOf('data_') === 0) && typeof model[key] === 'object') {
      if (model[key].__abandoned) {
        return;
      }

      if (model[key].path.indexOf('@internal') >= 0) {
        model[key].path = DATA_PATH;
        model[key].assetsPath = PREVIEW_DATA_PATH + path.sep;
      } else {
        if (!fs.existsSync(model[key].path)) {
          brokenFileActions.push(getPathCorrectFunction(model[key]));
        }
      }

      model[key].ddfPath = model[key].path;
    }

    if (key === 'locale' && typeof model[key] === 'object') {
      if (model[key].filePath.indexOf('@internal') >= 0) {
        model[key].filePath = path.resolve(PREVIEW_DATA_PATH, 'translation') + path.sep;
      }
    }
  });
};
const getConfigWithoutAbandonedData = config => {
  const newConfig = [];
  const processConfigItem = item => {
    if (!item) {
      return;
    }

    const model = item.model || item;
    const keys = Object.keys(model);

    let isAbandoned = false;

    for (const key of keys) {
      if ((key === 'data' || key.indexOf('data_') === 0) && typeof model[key] === 'object') {
        if (model[key].__abandoned) {
          isAbandoned = true;
          break;
        }
      }
    }

    if (!isAbandoned) {
      newConfig.push(item);
    }
  };

  if (_.isArray(config)) {
    for (const item of config) {
      processConfigItem(item);
    }
  } else {
    processConfigItem(config);
  }

  return newConfig;
};
const openFile = (event, fileName, fileNameOnly) => {
  const sender = event.sender || event.webContents;

  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      dialog.showErrorBox('File reading error', err.message);
      return;
    }

    const config = JSON.parse(data);
    const brokenFileActions = [];

    if (config.length) {
      config.forEach(configItem => {
        normalizeModelToOpen(configItem.model, brokenFileActions);
      });

      async.waterfall(brokenFileActions, () => {
        const newConfig = getConfigWithoutAbandonedData(config);

        if (!_.isEmpty(newConfig)) {
          sender.send('do-open-all-completed', newConfig);
        }

        setTimeout(() => {
          sender.send('check-tab-by-default');
        }, 500);
      });
    }

    if (!config.length) {
      normalizeModelToOpen(config, brokenFileActions);

      async.waterfall(brokenFileActions, () => {
        const newConfigAsArray = getConfigWithoutAbandonedData(config);

        if (!_.isEmpty(newConfigAsArray)) {
          const newConfig = _.head(newConfigAsArray);

          if (!_.isEmpty(newConfig)) {
            sender.send('do-open-completed', {tab: newConfig, file: fileNameOnly});
          }
        }

        setTimeout(() => {
          sender.send('check-tab-by-default');
        }, 500);
      });
    }
  });
};

export const openBookmark = (event, bookmark) => {
  const sender = event.sender || event.webContents;
  const brokenFileActions = [];

  normalizeModelToOpen(bookmark.content.model, brokenFileActions);

  async.waterfall(brokenFileActions, () => {
    const newConfigAsArray = getConfigWithoutAbandonedData(bookmark.content.model);

    if (!_.isEmpty(newConfigAsArray)) {
      const newConfig = _.head(newConfigAsArray);

      if (!_.isEmpty(newConfig)) {
        sender.send('do-bookmark-open-completed', {tab: newConfig, file: bookmark.name});
      }
    }
  });
};

export const openFileWithDialog = event => {
  dialog.showOpenDialog({
    title: 'Open chart state ...',
    filters: [{name: 'Gapminder stat document', extensions: ['gmstat']}],
    properties: ['openFile']
  }, fileNames => {

    if (!fileNames || fileNames.length <= 0) {
      return;
    }

    const fileName = fileNames[0];
    const parseFileData = path.parse(fileName);
    const fileNameOnly = parseFileData.name;

    openFile(event, fileName, fileNameOnly);
  });
};

export const openFileWhenDoubleClick = (event, fileName) => {
  const parseFileData = path.parse(fileName);
  const fileNameOnly = parseFileData.name;

  if (fs.existsSync(fileName) && fileName.indexOf('-psn_') === -1) {
    openFile(event, fileName, fileNameOnly);
  }
};

export const saveFile = (event, params) => {
  dialog.showSaveDialog({
    title: 'Save current chart as ...',
    defaultPath: `${params.title}.gmstat`,
    filters: [{name: 'Gapminder stat document', extensions: ['gmstat']}]
  }, fileName => {
    if (!fileName) {
      return;
    }

    normalizeModelToSave(params.model, params.chartType);

    fs.writeFile(fileName, JSON.stringify(params.model, null, ' '), err => {
      if (err) {
        dialog.showErrorBox('File save error', err.message);
        ga.error('Chart state was NOT saved: ' + err.toString());
        return;
      }

      ga.error('Chart state successfully saved');
    });
  });
};

export const readBookmarks = async (bookmarkFilePar?: string) => {
  const _bookmarkFile = bookmarkFilePar || bookmarkFile;

  async function initFile(filename) {
    return new Promise((resolve, reject) => {
      fs.open(filename, 'r', (openErr) => {
        if (openErr) {
          fs.writeFile(filename, '[]', (writeErr) => {
            if (writeErr) {
              return reject(writeErr);
            }

            return resolve();
          });
        }

        resolve();
      });
    });
  }

  return new Promise<any[]>(async (resolve, reject) => {
    try {
      await initFile(_bookmarkFile);
      const content = JSON.parse(await readFile(_bookmarkFile, 'utf-8'));

      if (!_.isArray(content)) {
        return reject('wrong bookmark file format');
      }

      resolve(content);
    } catch (e) {
      reject(e);
    }
  });
};

export const addBookmark = async (event, params) => {

  try {
    const content: any[] = await readBookmarks(bookmarkFile);

    normalizeModelToSave(params.bookmark.content.model, params.bookmark.content.chartType);
    content.push(params.bookmark);
    await writeFile(bookmarkFile, JSON.stringify(content, null, 2));
    event.sender.send('bookmark-added', {bookmarkFile});
  } catch (e) {
    event.sender.send('bookmark-not-added', {error: e.toString(), bookmarkFile});
  }
};

export const saveAllTabs = (event, tabsDescriptor) => {
  const timeLabel = (new Date()).toISOString().replace(/[\/\\:]/g, '');

  dialog.showSaveDialog({
    title: 'Save charts as ...',
    defaultPath: `charts-${timeLabel}.gmstat`,
    filters: [{name: 'Gapminder stat document', extensions: ['gmstat']}]
  }, fileName => {
    if (!fileName) {
      return;
    }

    tabsDescriptor.forEach(tabDescriptor => {
      normalizeModelToSave(tabDescriptor.model, tabDescriptor.type);
    });

    fs.writeFile(fileName, JSON.stringify(tabsDescriptor, null, ' '), err => {
      if (err) {
        dialog.showErrorBox('File save error', err.message);
        ga.error('Charts was NOT saved: ' + err.toString());
        return;
      }

      ga.error('Charts successfully saved');
    });
  });
};

export const exportForWeb = (event, params) => {
  fsExtra.removeSync(WEB_PATH);

  Object.keys(params.model).forEach(key => {
    if ((key === 'data' || key.indexOf('data_') === 0) && typeof params.model[key] === 'object') {
      const pathKeys = params.model[key].path.split(path.sep);
      const pathKey = pathKeys[pathKeys.length - 1];

      fsExtra.copySync(params.model[key].path, path.resolve(WEB_PATH, 'data', pathKey));

      params.model[key].path = `./data/${pathKey}`;
      params.model[key].ddfPath = `./data/${pathKey}`;

      if (params.model[key].reader === 'ddf1-csv-ext') {
        params.model[key].reader = 'ddf';
      }
    }
  });

  params.model.chartType = params.chartType;
  params.model.locale.filePath = 'assets/translation/';

  const config = `var CONFIG = ${JSON.stringify(params.model, null, ' ')};`;

  fsExtra.copySync(WEB_RESOURCE_PATH, WEB_PATH);
  fsExtra.outputFileSync(path.resolve(WEB_PATH, 'config.js'), config);

  let indexContent = fs.readFileSync(path.resolve(WEB_RESOURCE_PATH, 'index.html')).toString();

  indexContent = indexContent.replace(/#chartType#/, params.chartType);

  fs.writeFileSync(path.resolve(WEB_PATH, 'index.html'), indexContent, 'utf8');

  dialog.showSaveDialog({
    title: 'Export current chart as ...',
    filters: [{name: 'ZIP', extensions: ['zip']}]
  }, fileName => {
    if (!fileName) {
      return;
    }

    zipdir(WEB_PATH, {saveTo: fileName}, err => {
      if (err) {
        dialog.showMessageBox({message: 'This chart has NOT been exported.', buttons: ['OK']});
        ga.error('Export for Web was NOT completed: ' + err.toString());
        return;
      }

      dialog.showMessageBox({message: 'This chart has been exported.', buttons: ['OK']});
    });
  });
};


export const getUpdateLinks = (versionsConfig) => {
  const oldVersions = versionsConfig.modern3.supported.concat(versionsConfig.modern.supported).concat(versionsConfig.supported)
    .map(version => ({
      win32: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/${version}/Install+Gapminder+Offline-32.exe`,
      win64: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/${version}/Install+Gapminder+Offline-64.exe`,
      win32Port: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/${version}/Gapminder+Offline-win32.zip`,
      win64Port: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/${version}/Gapminder+Offline-win64.zip`,
      lin: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/${version}/Gapminder+Offline-linux.zip`,
      mac: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/${version}/Install+Gapminder+Offline.dmg`,
      version
    }));
  const newVersions = versionsConfig.modern4.supported.map(version => ({
    win32: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/new-version/Gapminder+Offline+Setup+${version}.exe`,
    win64: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/new-version/Gapminder+Offline+Setup+${version}.exe`,
    win32Port: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/new-version/Gapminder+Offline-${version}-ia32-win.zip`,
    win64Port: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/new-version/Gapminder+Offline-${version}-win.zip`,
    lin: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/new-version/Gapminder+Offline+${version}.AppImage`,
    mac: `https://s3-eu-west-1.amazonaws.com/gapminder-offline/new-version/Gapminder+Offline-${version}.dmg`,
    version
  }));
  const supported = newVersions.concat(oldVersions);
  const currentVersion = versionsConfig.modern4.version;

  return {supported, currentVersion};
};
