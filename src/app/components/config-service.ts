import {Injectable} from '@angular/core';
import configTemplate from './config-template';

const async = require('async');
const _ = require('lodash');
const ddfCsvReaderLib = require('vizabi-ddfcsv-reader');
const Ddf = ddfCsvReaderLib.Ddf;
const BackendFileReader = ddfCsvReaderLib.BackendFileReader;

const getMeasureFromHeader = (header, ddfDataDescriptor) => {
  const measures = ddfDataDescriptor.concepts
    .filter(concept => concept.concept_type === 'measure')
    .map(concept => concept.concept);

  return _.head(header.filter(record => _.includes(measures, record)));
};
const getNameProperty = ddfDataDescriptor => {
  const conceptTypeHash = _.reduce(
    ddfDataDescriptor.concepts,
    (hash, concept) => {
      hash[concept.concept] = concept.concept_type;

      return hash;
    },
    {});
  const entityHeaderIntersection =
    _.intersection(...ddfDataDescriptor.entitiesSchema
      .map(entityDescriptor => entityDescriptor.header));

  return _.head(
    entityHeaderIntersection
      .filter(entity => conceptTypeHash[entity] === 'string')
  );
};
const getTimeConcept = concepts => _.head(concepts
  .filter(concept => concept.concept_type === 'time')
  .map(concept => concept.concept));
const getAppropriateHeader =
  (headerHolder, order) => headerHolder.length - 1 < order ?
    _.last(headerHolder).header : headerHolder[order].header;
const chartTypeAdapters: any = ddfDataDescriptor => ({
  BubbleChart: [
    config => config.replace(/#domain#/g, ddfDataDescriptor.expectedDomain),
    config => config.replace(/#entity#/g, _.head(_.head(ddfDataDescriptor.entitiesSchema).header)),
    config => config.replace(
      /#entityMinimap#/g,
      _.head(
        ddfDataDescriptor.entitiesSchema[ddfDataDescriptor.entitiesSchema > 1 ? 1 : 0].header
      )
    ),
    config => config.replace(/#timeDim#/g, getTimeConcept(ddfDataDescriptor.concepts)),
    config => config.replace(/#nameProperty#/g, getNameProperty(ddfDataDescriptor)),
    config => config.replace(/#yAxis#/g,
      getMeasureFromHeader(getAppropriateHeader(ddfDataDescriptor.dataPointsSchema, 0), ddfDataDescriptor)),
    config => config.replace(/#xAxis#/g,
      getMeasureFromHeader(getAppropriateHeader(ddfDataDescriptor.dataPointsSchema, 1), ddfDataDescriptor)),
    config => config.replace(/#size#/g,
      getMeasureFromHeader(getAppropriateHeader(ddfDataDescriptor.dataPointsSchema, 2), ddfDataDescriptor))
  ]
});
const getCorrectedSchemaRecord = (record, field = 'header') => {
  try {
    record[field] = JSON.parse(record[field]);
  } catch (e) {
  }

  return record;
};
const getExpectedEntitySets = (concepts, domain) => concepts
  .filter(concept => concept.domain === domain)
  .map(concept => concept.concept);
const getExpectedEntityDomain = concepts => _.head(concepts
  .filter(concept => concept.concept_type === 'entity_domain')
  .map(concept => ({
    concept: concept.concept,
    entitySetCount: getExpectedEntitySets(concepts, concept.concept).length
  }))
  .sort((concept1, concept2) => concept2.entitySetCount - concept1.entitySetCount)
  .map(concept => concept.concept));
const prepareConcepts = (ddf: any, onProgress: Function) =>
  onConceptsReady =>
    ddf
      .getIndex(err => {
        onProgress(10);
        return onConceptsReady(err, {}, ddf.getContentManager().concepts);
      });
const prepareEntitiesSchema = (ddf: any, onProgress: Function) =>
  (aggregatedData, concepts, onEntitiesSchemaReady) => {
    const expectedDomain = getExpectedEntityDomain(concepts);
    const expectedEntitySets = getExpectedEntitySets(concepts, expectedDomain);
    const request = {
      from: 'entitiesSchema',
      select: {
        key: _.concat([expectedDomain], expectedEntitySets),
        value: []
      },
      where: {},
      grouping: {},
      orderBy: null
    };

    ddf.ddfRequest(request, (err, data) => {
      aggregatedData.expectedDomain = expectedDomain;
      aggregatedData.concepts = concepts.map(concept => getCorrectedSchemaRecord(concept, 'scales'));
      aggregatedData.entitiesSchema = data
        .sort((entity1, entity2) => entity2.recordCount - entity1.recordCount)
        .map(record => getCorrectedSchemaRecord(record));

      onProgress(20);
      onEntitiesSchemaReady(err, aggregatedData);
    });
  };
const prepareDataPointsSchema = (ddf: any, onProgress: Function) =>
  (aggregatedData, onDataPointsSchemaReady) => {
    const expectedDomain = getExpectedEntityDomain(aggregatedData.concepts);
    const timeConcept = getTimeConcept(aggregatedData.concepts);
    const request = {
      from: 'datapointsSchema',
      select: {
        key: [expectedDomain, timeConcept],
        value: []
      },
      where: {},
      grouping: {},
      orderBy: null
    };

    ddf.ddfRequest(request, (err, data) => {
      aggregatedData.dataPointsSchema = data
        .map(record => getCorrectedSchemaRecord(record))
        .sort((record1, record2) => record2.recordCount - record1.recordCount);

      onProgress(20);
      onDataPointsSchemaReady(err, aggregatedData);
    });
  };
const normalizeArray = arr => arr.map(element => _.trim(element.normalize()));

@Injectable()
export class ConfigService {
  public getConfig(parameters, onConfigReady: any) {
    const fileReader = new BackendFileReader();
    const ddf = new Ddf(parameters.ddfPath, fileReader);

    async.waterfall([
      prepareConcepts(ddf, parameters.onProgress),
      prepareEntitiesSchema(ddf, parameters.onProgress),
      prepareDataPointsSchema(ddf, parameters.onProgress),
    ], (err, ddfDataDescriptor) => {
      ddfDataDescriptor.entitiesSchema.forEach(entityDescriptor => {
        entityDescriptor.header = normalizeArray(entityDescriptor.header);
      });
      ddfDataDescriptor.dataPointsSchema.forEach(dataPointDescriptor => {
        dataPointDescriptor.header = normalizeArray(dataPointDescriptor.header);
      });

      const chartTypeAdapter = chartTypeAdapters(ddfDataDescriptor)[parameters.chartType];

      let configStr = JSON.stringify(configTemplate.BubbleChart);

      for (const configTransformer of chartTypeAdapter) {
        configStr = configTransformer(configStr);
      }

      const configObj = JSON.parse(configStr);
      // console.log(ddfDataDescriptor);
      // console.log('config', configObj);

      // onConfigReady(configTemplate.BubbleChart);
      onConfigReady(configObj);
    });
  }
}
