'use strict';
const os = require('os');
const platform = os.platform();
const arch = os.arch();
const progExtension = platform === 'win32' ? '.exe' : '';

let dirPostfix = 'linux';

if (platform === 'win32') {
  dirPostfix = arch === 'ia32' ? 'win32' : 'win64';
}

let binary = `${__dirname}/../app-builds/Gapminder Offline-${platform}/Gapminder Offline${progExtension}`;

if (platform === 'darwin') {
  binary = `${__dirname}/../app-builds/mac/Gapminder Offline.app/Contents/MacOS/Gapminder Offline`;
}

exports.config = {
  seleniumAddress: 'http://localhost:9515/', // default port for electron-chromedriver

  specs: [
    './**/*.e2e-spec.ts'
  ],

  framework: 'jasmine',

  allScriptsTimeout: 60000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 60000,
    print: function () {
    }
  },

  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        binary: `${binary}`,
        args: ['no-sandbox', 'disable-infobars']
      }
    }
  ],

  onPrepare: function () {
    browser.waitForAngularEnabled(false);

    require('ts-node').register({project: `${__dirname}/../e2e/tsconfig.json`});

    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
};
