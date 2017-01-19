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
const year = 2016;

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
      linux: 'cp ./update-linux \"./release/Gapminder Offline-linux-x64\" && cd \"./release/Gapminder Offline-linux-x64/resources/app\" && npm i electron-easy-updater fs-extra zip-dir',
      darwin: 'cp ./init-macos-sierra \"./release/Gapminder Offline-darwin-x64\" && cp ./update-darwin \"./release/Gapminder Offline-darwin-x64\" && cd \"./release/Gapminder Offline-darwin-x64/Gapminder Offline.app/Contents/Resources/app\" && npm i electron-easy-updater fs-extra zip-dir',
      win32: 'copy update-win32.bat \"release\\Gapminder Offline-win32-x64\" && cd \"release\\Gapminder Offline-win32-x64\\resources\\app\" && npm i electron-easy-updater fs-extra zip-dir'
    },
    'ia32': {
      win32: 'copy update-win32.bat \"release\\Gapminder Offline-win32-ia32\" && cd \"release\\Gapminder Offline-win32-ia32\\resources\\app\" && npm i electron-easy-updater fs-extra zip-dir'
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
    'app-version': pkg.version || DEFAULT_OPTS.version,
    /*'osx-sign': {
     identity: 'Stiftelsen Gapminder'
     },*/
    'version-string': {
      CompanyName: companyName,
      ProductName: appName,
      FileVersion: pkg.version || DEFAULT_OPTS.version,
      ProductVersion: pkg.version || DEFAULT_OPTS.version,
      LegalCopyright: `© ${companyName} ${year}`
    },
    out: `release`
  });

  packager(opts, cb);
}
