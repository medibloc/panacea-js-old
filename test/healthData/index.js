import { expect } from 'chai';
import fs from 'fs';
import jsonfile from 'jsonfile';
import path from 'path';
import healthData from 'healthData';

describe('healthData', () => {
  describe('#returned object', () => {
    it('should be a object', () => {
      return expect(healthData)
        .to.be.an('object');
    });

    it('should have a decodeData', () => {
      return expect(healthData)
        .to.be.property('decodeData')
        .to.be.an('function');
    });

    it('should have a decodeDataFromFile', () => {
      return expect(healthData)
        .to.be.property('decodeDataFromFile')
        .to.be.an('function');
    });

    it('should have a encodeData', () => {
      return expect(healthData)
        .to.be.property('encodeData')
        .to.be.an('function');
    });

    it('should have a encodeDataFromFile', () => {
      return expect(healthData)
        .to.be.property('encodeDataFromFile')
        .to.be.an('function');
    });
  });

  describe('#encode and decode', () => {
    it('should be work well for medical-fhir patient', () => {
      return healthData.encodeDataFromFile(
        'samples/patient_sample.json',
        'medical-fhir',
        'patient',
      ).then((encodedData) => {
        return healthData.decodeData(encodedData).then((decodedData) => {
          const data = jsonfile.readFileSync(path.resolve(__dirname, '../../src/healthData/samples/patient_sample.json'));
          return expect(decodedData)
            .to.be.deep.equal(data);
        });
      });
    });

    it('should be work well for medical-fhir observation', () => {
      return healthData.encodeDataFromFile(
        'samples/observation_sample.json',
        'medical-fhir',
        'observation',
      ).then((encodedData) => {
        return healthData.decodeData(encodedData).then((decodedData) => {
          const data = jsonfile.readFileSync(path.resolve(__dirname, '../../src/healthData/samples/observation_sample.json'));
          return expect(decodedData)
            .to.be.deep.equal(data);
        });
      });
    });

    it('should be work well for pghd txt format', () => {
      return healthData.encodeDataFromFile(
        'samples/pghd.txt',
        'pghd',
        null,
      ).then((encodedData) => {
        return healthData.decodeData(encodedData).then((decodedData) => {
          const data = fs.readFileSync(path.resolve(__dirname, '../../src/healthData/samples/pghd.txt'), 'utf-8');
          return expect(decodedData)
            .to.be.deep.equal(data);
        });
      });
    });

    it('should be work well for pghd json format', () => {
      return healthData.encodeDataFromFile(
        'samples/pghd.json',
        'pghd',
        null,
      ).then((encodedData) => {
        return healthData.decodeData(encodedData).then((decodedData) => {
          const data = jsonfile.readFileSync(path.resolve(__dirname, '../../src/healthData/samples/pghd.json'));
          return expect(JSON.parse(decodedData))
            .to.be.deep.equal(data);
        });
      });
    });
  });
});
