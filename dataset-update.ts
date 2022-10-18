import * as os from 'os';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as net from 'net';
import * as path from 'path';
import * as events from 'events';
import * as urlLib from 'url';
import * as semverSort from 'semver-sort';
import { getRemoteInfo } from 'isomorphic-git';
import httpGit from "isomorphic-git/http/node";

import * as extract from 'extract-zip';
import * as DecompressZip from 'decompress-zip';
import { http, https } from 'follow-redirects';


export async function updateDataset(tag: any, destDir: string, userDataPath: string, em?: events.EventEmitter) {
  const dsFeedUrl = `https://github.com/open-numbers/${tag.path}/archive/v${tag.version}.zip`;
  const tempPath = path.resolve(userDataPath, `gapminder-offline-dataset-temp_${tag.ds}`);
  await removeDir(tempPath);

  if (em) {
    em.emit('ds-update-status', `Downloading ${tag.path} dataset archive...`);
  }

  const dlFile = await download({url: dsFeedUrl, path: tempPath, file: 'dl.zip'});
  const unpackFun = os.platform() === 'win32' ? unpackWin : unpackNix;

  if (em) {
    em.emit('ds-update-status', `Unpacking  ${tag.path} dataset archive...`);
  }

  const unpacked = await unpackFun({fullPath: dlFile, target: path.resolve(tempPath, 'unpacked')});
  const contentDir = await getFirstDir(unpacked);

  if (em) {
    em.emit('ds-update-status', `Updating existing  ${tag.path} dataset...`);
  }

  await copy(contentDir, destDir);
  await removeDir(tempPath);
}

async function copy(source: string, dest: string): Promise<void> {
  return new Promise<void>((resolve: Function, reject: Function) => {
    fse.copy(source, dest, err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

async function getFirstDir(baseDir: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readdir(baseDir, (err, files) => {
      if (err) {
        return reject(err);
      }

      if (files.length !== 1) {
        return reject();
      }

      resolve(path.resolve(baseDir, files[0]));
    });
  });
}

export async function getLatestGithubTag(inputParam: string): Promise<string> {
  return new Promise<string>((resolve: Function, reject: Function) => {
    const input = inputParam.replace(/^(?!(?:https|git):\/\/)/, 'https://');
    getRemoteInfo({ http: httpGit, url: input }).then(info => {
      const tags = info?.refs?.tags;
      if (tags) {
        resolve(semverSort.desc(Object.keys(tags).map(tag => tag.replace(/\^\{\}$/, '').substr(1)))[0]);
      }
      return reject('Tags are missing');
    });
  });
}

async function removeDir(what: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fse.remove(what, err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

async function unpackWin(options: { fullPath: string, target: string }): Promise<string> {
  const unzipper = new DecompressZip(options.fullPath);
  const targetPath = path.resolve(options.target);

  return new Promise<string>((resolve: Function, reject: Function) => {
    unzipper.on('error', reject);
    unzipper.on('extract', () => {
      resolve(targetPath);
    });

    unzipper.extract({
      path: targetPath,
      follow: true
    });
  });
}

async function unpackNix(options): Promise<string> {
  const targetPath = path.resolve(options.target);

  return new Promise<string>((resolve: Function, reject: Function) => {
    extract(options.fullPath, {dir: targetPath}, err => {
      if (err) {
        return reject(err);
      }

      resolve(targetPath);
    });
  });
}

async function download(options: { url: string, path: string, file: string }): Promise<string> {
  const TIMEOUT = 240000;
  const mode = parseInt('0777', 8) & (~process.umask());

  return new Promise<string>((resolve: Function, reject: Function) => {
    fs.mkdir(options.path, mode, pathErr => {
      if (pathErr) {
        return reject(pathErr);
      }

      const filePath = path.resolve(options.path, options.file);
      const file = fs.createWriteStream(filePath);
      const timeoutWrapper = req => () => {
        req.abort();
        reject('File transfer timeout!');
      };

      const relatedLib = options.url.indexOf('https://') === 0 ? https : http;
      const request = relatedLib.get(options.url)
        .on('response', res => {
          res.on('data', chunk => {
            file.write(chunk);

            clearTimeout(timeoutId);
            timeoutId = setTimeout(timeoutAction, TIMEOUT);
          }).on('end', () => {
            clearTimeout(timeoutId);
            file.end();

            resolve(filePath);
          }).on('error', err => {
            clearTimeout(timeoutId);

            reject(err);
          });
        });

      const timeoutAction = timeoutWrapper(request);

      let timeoutId = setTimeout(timeoutAction, TIMEOUT);
    });
  });
}
