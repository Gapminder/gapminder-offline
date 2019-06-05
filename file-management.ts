import * as _ from 'lodash';
import * as async from 'async';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as zipdir from 'zip-dir';
import { promisify } from 'util';
import { app, remote } from 'electron';
import { GoogleAnalytics } from './google-analytics';
import './glob-const';

const dialog = require('electron').dialog;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fsExtra.copy);
const removeFileOrDir = promisify(fsExtra.remove);
const unlink = promisify(fs.unlink);

const packageJSON = require('./package.json');
const ga = new GoogleAnalytics(packageJSON.googleAnalyticsId, app.getVersion());
const nonAsarAppPath = app.getAppPath().replace(/app\.asar/, '');
const userDataPath = (app || remote.app).getPath('userData');
const bookmarkFile = path.resolve(userDataPath, 'bookmarks.json');
const bookmarkCopyFile = path.resolve(userDataPath, 'bookmarks-copy.json');
const bookmarkUndoFile = path.resolve(userDataPath, 'bookmarks-undo.json');
const bookmarksThumbnailsPath = path.resolve(userDataPath, 'bookmarks-thumbnails');
const bookmarksThumbnailsUndoPath = path.resolve(userDataPath, 'bookmarks-thumbnails-undo');
const DATA_PATH = path.resolve(nonAsarAppPath, 'ddf--gapminder--systema_globalis');
const PREVIEW_DATA_PATH = path.resolve(nonAsarAppPath, 'preview-data');
const WEB_RESOURCE_PATH = path.resolve(nonAsarAppPath, 'export-template');
const WEB_PATH = path.resolve(userDataPath, 'web');
const previouslyOpened = {};
const globConst = (global as any).globConst;

const initBookmarksThumbnailsCache = async () => {
  return fsExtra.ensureDir(bookmarksThumbnailsUndoPath);
};

const clearBookmarksThumbnailsCache = async () => new Promise((resolve, reject) => {
  fs.readdir(bookmarksThumbnailsUndoPath, async (readErr, files) => {
    if (readErr) {
      return reject(readErr);
    }

    for (const file of files) {
      await unlink(path.join(bookmarksThumbnailsUndoPath, file));
    }

    resolve();
  });
});

const restoreBookmarksThumbnails = async () => new Promise((resolve, reject) => {
  fs.readdir(bookmarksThumbnailsUndoPath, async (readErr, files) => {
    if (readErr) {
      return reject(readErr);
    }

    for (const file of files) {
      await copyFile(path.resolve(bookmarksThumbnailsUndoPath, file), path.resolve(bookmarksThumbnailsPath, file));
    }

    resolve();
  });
});

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

export class QueueProcessor {
  active = true;
  private i = null;
  private queue = [];
  private working = false;

  executeRequest(fun, event, params) {
    if (this.active) {
      if (this.i === null) {
        this.i = setInterval(async () => {
          await this.queueProcessor();
        }, 1000);
      }
      this.queue.push({fun, event, params});
    }
  }

  isAlive(): boolean {
    return this.working || !_.isEmpty(this.queue);
  }

  private async queueProcessor() {
    if (this.queue.length > 0) {
      if (!this.working) {
        const exec = this.queue.shift();
        this.working = true;
        try {
          await exec.fun(exec.event, exec.params);
        } catch (e) {
          throw e;
        } finally {
          this.working = false;
        }
      }
    } else {
      clearInterval(this.i);
      this.i = null;
    }
  }
}

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

export const getBookmarksObject = async (filePar?: string) => {
  const _file = filePar;

  async function initFile(filename) {
    return new Promise((resolve, reject) => {
      fs.open(filename, 'r', (openErr) => {
        if (openErr) {
          fs.writeFile(filename, '{"content": [], "folders": []}', (writeErr) => {
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
      await initFile(_file);
      const content = await readFile(_file, 'utf-8');
      const data = JSON.parse(content);
      await writeFile(bookmarkCopyFile, content);

      if (!data || !data.content || !data.folders || !_.isArray(data.content) || !_.isArray(data.folders)) {
        return reject('wrong bookmark file format');
      }

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

export const addBookmark = async (event, params) => {
  try {
    const allBookmarksData: any = await getBookmarksObject(bookmarkFile);

    normalizeModelToSave(params.bookmark.content.model, params.bookmark.content.chartType);
    allBookmarksData.content.unshift(params.bookmark);
    await writeFile(bookmarkFile, JSON.stringify(allBookmarksData, null, 2));
    const originalImageData = Buffer.from(params.image, 'base64');

    if (!fs.existsSync(bookmarksThumbnailsPath)) {
      fs.mkdirSync(bookmarksThumbnailsPath);
    }

    const thumbnailPath = path.resolve(bookmarksThumbnailsPath, `${params.bookmark.id}.png`);
    const imageData = originalImageData.toString('binary');

    await writeFile(thumbnailPath, imageData, 'binary');

    event.sender.send(globConst.BOOKMARK_ADDED, {bookmarkFile, bookmark: params.bookmark});
  } catch (e) {
    event.sender.send(globConst.BOOKMARK_ADDED, {error: e.toString(), bookmarkFile, bookmark: params.bookmark});
  }
};

export const updateBookmark = async (event, params) => {
  try {
    const allBookmarksData: any = await getBookmarksObject(bookmarkFile);

    for (const bookmark of allBookmarksData.content) {
      if (params.bookmark.id === bookmark.id) {
        bookmark.name = params.bookmark.name;
        bookmark.date = params.bookmark.date;
        bookmark.folder = params.bookmark.folder;
        break;
      }
    }
    await writeFile(bookmarkFile, JSON.stringify(allBookmarksData, null, 2));
    event.sender.send(globConst.BOOKMARK_UPDATED, {bookmarkFile, bookmark: params.bookmark});
  } catch (e) {
    event.sender.send(globConst.BOOKMARK_UPDATED, {error: e.toString(), bookmarkFile, bookmark: params.bookmark});
  }
};

export const updateBookmarksFolder = async (event, params) => {
  try {
    if (params.newFolderName === params.oldFolderName) {
      event.sender.send(globConst.BOOKMARK_FOLDER_UPDATED, {bookmarkFile, params});
      return;
    }

    const allBookmarksData: any = await getBookmarksObject(bookmarkFile);
    const related = allBookmarksData.folders.filter(folder => folder === params.newFolderName);

    if (related.length > 0 && params.newFolderName) {
      event.sender.send(globConst.BOOKMARK_FOLDER_UPDATED,
        {error: true, transData: {template: 'Impossible to rename folder already exists', params}, bookmarkFile, params});
      return;
    }

    const index = allBookmarksData.folders.indexOf(params.oldFolderName);
    allBookmarksData.folders[index] = params.newFolderName;
    const state = allBookmarksData.settings.folders[params.oldFolderName];

    delete allBookmarksData.settings.folders[params.oldFolderName];

    allBookmarksData.settings.folders[params.newFolderName] = state;
    for (const bookmark of allBookmarksData.content) {
      if (bookmark.folder === params.oldFolderName) {
        bookmark.folder = params.newFolderName;
      }
    }
    await writeFile(bookmarkFile, JSON.stringify(allBookmarksData, null, 2));
    event.sender.send(globConst.BOOKMARK_FOLDER_UPDATED, {bookmarkFile, params});
  } catch (e) {
    event.sender.send(globConst.BOOKMARK_FOLDER_UPDATED, {error: e.toString(), bookmarkFile, params});
  }
};

export const removeBookmark = async (event, params) => {
  try {
    await initBookmarksThumbnailsCache();
    await clearBookmarksThumbnailsCache();
    const allBookmarksData: any = await getBookmarksObject(bookmarkFile);
    await writeFile(bookmarkUndoFile, JSON.stringify(allBookmarksData, null, 2));
    const thumbnailPath = path.resolve(bookmarksThumbnailsPath, `${params.bookmark.id}.png`);
    const thumbnailUndoPath = path.resolve(bookmarksThumbnailsUndoPath, `${params.bookmark.id}.png`);
    await copyFile(thumbnailPath, thumbnailUndoPath);
    const newBookmarks = allBookmarksData.content.filter(bookmark => params.bookmark.id !== bookmark.id);
    await writeFile(bookmarkFile, JSON.stringify({content: newBookmarks, folders: allBookmarksData.folders}, null, 2));
    await unlink(thumbnailPath);
    event.sender.send(globConst.BOOKMARK_REMOVED, {bookmarkFile, bookmark: params.bookmark});
  } catch (e) {
    event.sender.send(globConst.BOOKMARK_REMOVED, {error: e.toString(), bookmarkFile, bookmark: params.bookmark});
  }
};

const commitBookmarks = async () => {
  await removeFileOrDir(bookmarkUndoFile);
  await clearBookmarksThumbnailsCache();
};

export const restoreBookmarks = async (event) => {
  try {
    await restoreBookmarksThumbnails();
    const content = await readFile(bookmarkUndoFile);
    await writeFile(bookmarkFile, content);
  } catch (e) {
    event.sender.send(globConst.BOOKMARKS_REMOVE_RESTORED, {error: e.toString(), bookmarkFile});
  } finally {
    await commitBookmarks();
    event.sender.send(globConst.BOOKMARKS_REMOVE_RESTORED, {bookmarkFile});
  }
};

export const moveBookmark = async (event, params) => {
  try {
    const allBookmarksData: any = await getBookmarksObject(bookmarkFile);
    const elIdPos = allBookmarksData.content.map(bm => bm.id).indexOf(params.elId);
    const el = _.cloneDeep(allBookmarksData.content[elIdPos]);
    const todo: { action: string, position?: number } = {action: 'nop'};
    allBookmarksData.content[elIdPos].old = true;

    for (let i = 0; i < allBookmarksData.content.length; i++) {
      if (params.leftId === allBookmarksData.content[i].id) {
        if (i + 1 < allBookmarksData.content.length - 2) {
          todo.action = 'insert';
          todo.position = i + 1;
        } else {
          todo.action = 'push';
        }
        break;
      } else if (params.rightId === allBookmarksData.content[i].id) {
        if (i - 1 > 0) {
          todo.action = 'insert';
          todo.position = i - 1;
        } else {
          todo.action = 'unshift';
        }
        break;
      }
    }

    el.folder = params.targetFolder || '';

    if (todo.action === 'insert') {
      allBookmarksData.content.splice(todo.position, 0, el);
    } else if (todo.action === 'push') {
      allBookmarksData.content.push(el);
    } else if (todo.action === 'unshift') {
      allBookmarksData.content.unshift(el);
    }

    if (todo.action !== 'nop') {
      const elIdPosToDelete = allBookmarksData.content.map(bm => bm.old).indexOf(true);
      allBookmarksData.content.splice(elIdPosToDelete, 1);
    } else {
      delete allBookmarksData.content[elIdPos].old;
      allBookmarksData.content[elIdPos].folder = params.targetFolder || '';
    }

    await writeFile(bookmarkFile, JSON.stringify({content: allBookmarksData.content, folders: allBookmarksData.folders}, null, 2));
    event.sender.send(globConst.BOOKMARK_MOVED, {bookmarkFile});
  } catch (e) {
    event.sender.send(globConst.BOOKMARK_MOVED, {error: e.toString(), bookmarkFile});
  }
};

export const removeBookmarksFolder = async (event, params) => {
  try {
    await initBookmarksThumbnailsCache();
    await clearBookmarksThumbnailsCache();
    const allBookmarksData: any = await getBookmarksObject(bookmarkFile);
    await writeFile(bookmarkUndoFile, JSON.stringify(allBookmarksData, null, 2));
    const index = allBookmarksData.folders.indexOf(params.folderName);

    if (index < 0) {
      event.sender.send(globConst.BOOKMARK_FOLDER_REMOVED, {
        error: true,
        transData: {template: 'Impossible to remove:folder does not exist', params},
        bookmarkFile, params
      });
      return;
    }

    allBookmarksData.folders.splice(index, 1);
    delete allBookmarksData.settings.folders[params.folderName];
    const newContent = [];
    for (let i = 0; i < allBookmarksData.content.length; i++) {
      const bookmark = allBookmarksData.content[i];
      if (bookmark.folder === params.folderName) {
        const thumbnailPath = path.resolve(bookmarksThumbnailsPath, `${bookmark.id}.png`);
        const thumbnailUndoPath = path.resolve(bookmarksThumbnailsUndoPath, `${bookmark.id}.png`);
        await copyFile(thumbnailPath, thumbnailUndoPath);
        await unlink(thumbnailPath);
      } else {
        newContent.push(bookmark);
      }
    }
    allBookmarksData.content = newContent;
    await writeFile(bookmarkFile, JSON.stringify(allBookmarksData, null, 2));
    event.sender.send(globConst.BOOKMARK_FOLDER_REMOVED, {bookmarkFile, params});
  } catch (e) {
    event.sender.send(globConst.BOOKMARK_FOLDER_REMOVED, {error: e.toString(), bookmarkFile, params});
  }
};

export const createNewBookmarksFolder = async (event, params) => {
  try {
    const allBookmarksData: any = await getBookmarksObject(bookmarkFile);
    if (allBookmarksData.folders.indexOf(params.folder) < 0) {
      allBookmarksData.folders.unshift(params.folder);
    } else {
      event.sender.send(globConst.BOOKMARKS_FOLDER_CREATED, {
        error: true,
        transData: {template: 'Folder already exists', params},
        bookmarkFile
      });
      return;
    }
    await writeFile(bookmarkFile, JSON.stringify(allBookmarksData, null, 2));
    event.sender.send(globConst.BOOKMARKS_FOLDER_CREATED, {bookmarkFile, allBookmarksData});
  } catch (e) {
    event.sender.send(globConst.BOOKMARKS_FOLDER_CREATED, {error: e.toString(), bookmarkFile});
  }
};

export const switchBookmarksFolderVisibility = async (event, params) => {
  try {
    const allBookmarksData: any = await getBookmarksObject(bookmarkFile);
    const settings = _.defaultsDeep(allBookmarksData.settings, {folders: {}});
    settings.folders[params.folder.name] = {};
    allBookmarksData.settings = settings;
    allBookmarksData.settings.folders[params.folder.name].collapsed = params.folder.collapsed;
    await writeFile(bookmarkFile, JSON.stringify(allBookmarksData, null, 2));
    event.sender.send(globConst.BOOKMARKS_FOLDER_VISIBILITY_SWITCHED, {bookmarkFile, allBookmarksData});
  } catch (e) {
    event.sender.send(globConst.BOOKMARKS_FOLDER_VISIBILITY_SWITCHED, {error: e.toString(), bookmarkFile});
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
