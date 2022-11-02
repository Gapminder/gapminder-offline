import {updateDataset, getLatestGithubTag} from "./dataset-update";
import * as path from 'path';
import * as fsp from 'fs/promises';
import { diff } from 'semver';

const dsConfigs = require('./datasources.config.json');

async function update_datasets() {
  const dsGithubOwner = 'open-numbers';

  const tags = (await Promise.all(Object.keys(dsConfigs).map(async ds => {
    const tagVersion = await getLatestGithubTag(`github.com/${dsGithubOwner}/${dsConfigs[ds].path}`);
    return {
      path: dsConfigs[ds].path,
      version: tagVersion,
      versionPrev: "",
      datasetPath: "",
    }      
  }))).filter(tag => {
    tag.datasetPath = path.resolve(tag.path);
    try {
      const dataPackage = require(path.resolve(tag.datasetPath, 'datapackage.json'));
      tag.versionPrev = dataPackage.version;
    } catch {}

    return diff(tag.version || "0.0.0", tag.versionPrev || "0.0.0-a");
  })

  if (tags.length) {
    const tmpPath = path.resolve("tmp");
    await fsp.mkdir(tmpPath);

    for (const tag of tags) {
      console.log("update", tag.path, tag.versionPrev, "=>", tag.version);
      await updateDataset(tag, tag.datasetPath, tmpPath);
    }    

    await fsp.rmdir(tmpPath);
  } else {
    console.log("Nothing to update");
  }

}

update_datasets();





