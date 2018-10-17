const path = require('path');
const fs = require('fs');
const {hashElement} = require('folder-hash');

const dirName = process.argv[2];
const filePath = process.argv[3];
const os = process.argv[4];
const exclude = os.indexOf('win') >= 0 || os.indexOf('ia32') >= 0 ? ['**.zip'] : ['*.zip', '**/*.zip'];

hashElement(path.resolve('.', dirName), {files: {exclude}, ignoreRootName: true}).then(hash => {
  fs.writeFileSync(path.resolve('.', filePath), JSON.stringify(hash.children, null, 2));
}).catch(error => {
  return console.error('hashing failed:', error);
});
