const appdmg = require('appdmg');
const ee = appdmg({source: 'dmg-builder/dmg-config.json', target: 'release/Install Gapminder Offline.dmg'});

ee.on('progress', info => {
  console.log('Build DMG: step ', info.current, ' of ', info.total);
});

ee.on('finish', () => {
  console.log('DMG was created...');
});

ee.on('error', (err) => {
  console.log('DMG creation error: ', err);
});
