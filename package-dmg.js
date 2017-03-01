const appdmg = require('appdmg');
const ee = appdmg({source: 'dmg-builder/dmg-config.json', target: 'dmg-builder/test.dmg'});

ee.on('progress', info => {

  // info.current is the current step
  // info.total is the total number of steps
  // info.type is on of 'step-begin', 'step-end'

  console.log(info.current, info.total, info.type);

  // 'step-begin'
  // info.title is the title of the current step

  // 'step-end'
  // info.status is one of 'ok', 'skip', 'fail'

});

ee.on('finish', () => {
  // There now is a `test.dmg` file
  console.log('DMG was created');
});

ee.on('error', (err) => {
  console.log('DMG creation error: ', err);
  // An error occurred
});
