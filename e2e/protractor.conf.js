'use strict';
const os = require('os');
const platform = os.platform();
const arch = os.arch();

let binary;

if (platform === 'linux') {
  binary = `${__dirname}/../app-builds/linux-unpacked/gapminder-offline`;
} else if (platform === 'win32' && arch === 'x64') {
  binary = `${__dirname}\\..\\app-builds\\win-unpacked\\Gapminder Offline.exe`;
} else if (platform === 'win32' && arch === 'ia32') {
  binary = `${__dirname}\\..\\app-builds\\win-ia32-unpacked\\Gapminder Offline.exe`;
} else {
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
