"use strict";

const packager = require('electron-packager');
const pkg = require('./package.json');
const argv = require('minimist')(process.argv.slice(2));
const devDeps = Object.keys(pkg.devDependencies);

const appName = 'Gapminder Offline';
const companyName = 'Gapminder';
const arch = argv.arch || 'x64';
const platform = argv.platform || 'linux';
const icon = './src/app/app-icon';
const year = 2017;

const DEFAULT_OPTS = {
  dir: './src/app',
  name: appName,
  asar: false,
  ignore: devDeps.map(name => `/node_modules/${name}($|/)`)
};

if (icon) {
  DEFAULT_OPTS.icon = icon;
}

pack(platform, arch, err => {
  const exec = require('child_process').exec;
  const cmd = {
    'x64': {
      linux: 'cp ./updater-linux \"./release/Gapminder Offline-linux-x64/updater\" && cd \"./release/Gapminder Offline-linux-x64/resources/app\" && npm i electron-easy-updater fs-extra zip-dir semver universal-analytics is-online',
      darwin: 'cp ./updater-darwin \"./release/Gapminder Offline-darwin-x64/Gapminder Offline.app/Contents/Resources/app/updater\" && cd \"./release/Gapminder Offline-darwin-x64/Gapminder Offline.app/Contents/Resources/app\" && npm i electron-easy-updater fs-extra zip-dir semver universal-analytics is-online',
      win32: 'copy invisible.vbs \"release\\Gapminder Offline-win32-x64\\invisible.vbs\" && copy updater-win64.exe \"release\\Gapminder Offline-win32-x64\\updater-win64.exe\" && cd \"release\\Gapminder Offline-win32-x64\\resources\\app\" && npm i electron-easy-updater fs-extra zip-dir semver universal-analytics is-online'
    },
    'ia32': {
      win32: 'copy invisible.vbs \"release\\Gapminder Offline-win32-ia32\\invisible.vbs\" && copy updater-win32.exe \"release\\Gapminder Offline-win32-ia32\\updater-win32.exe\" && cd \"release\\Gapminder Offline-win32-ia32\\resources\\app\" && npm i electron-easy-updater fs-extra zip-dir semver universal-analytics is-online'
    }
  };

  exec(cmd[arch][platform], error => {
    console.log(err || error || 'Ok...');
  });
});

function pack(plat, arch, cb) {
  const iconObj = {
    icon: DEFAULT_OPTS.icon + (() => {
      let extension = '.png';

      if (plat === 'darwin') {
        extension = '.icns';
      }

      if (plat === 'win32') {
        extension = '.ico';
      }

      return extension;
    })()
  };

  const opts = Object.assign({}, DEFAULT_OPTS, iconObj, {
    platform: plat,
    arch,
    prune: true,
    'appVersion': pkg.version || DEFAULT_OPTS.version,
    'version-string': {
      CompanyName: companyName,
      ProductName: appName,
      FileVersion: pkg.version || DEFAULT_OPTS.version,
      ProductVersion: pkg.version || DEFAULT_OPTS.version,
      LegalCopyright: `© ${companyName} ${year}`
    },
    out: `release`
  });

  if (plat === 'darwin') {
    opts['extend-info'] = 'dmg-builder/Info.plist';
  }

  packager(opts, cb);
}
