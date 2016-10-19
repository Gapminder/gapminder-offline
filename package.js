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

pack(platform, arch, err => console.log(err || 'Ok...'));

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
