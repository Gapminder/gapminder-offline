const fs = require('fs');
const csvParse = require('csv-parse');

export class BackendFileReader {
  private cache: any;
  private recordTransformer: any;

  constructor() {
    this.cache = {};
  }

  setRecordTransformer(recordTransformer: any) {
    this.recordTransformer = recordTransformer;
  }

  read(filePath, onFileRead, isCacheNeeded = true) {
    const fileStream = fs.createReadStream(filePath);
    const parser = csvParse({columns: true}, (err, contentSource) => {
      const content =
        this.recordTransformer ? contentSource.map(record => this.recordTransformer(record)) : contentSource;

      if (isCacheNeeded) {
        this.cache[filePath] = content;
      }

      onFileRead(err, content);
    });

    fileStream.pipe(parser);
  }
}
