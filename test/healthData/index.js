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

  describe('#hashDataFromFile', () => {
    it('should be work well for medical-fhir patient', () => {
      return healthData.hashDataFromFile(
        'samples/patient_sample.json',
        'medical-fhir',
        'patient',
      ).then((hash) => {
        return expect(hash)
          .to.be.equal('9eca7128409f609b2a72fc24985645665bbb99152b4b14261c3c3c93fb17cf54');
      });
    });

    it('should be work well for medical-fhir observation', () => {
      return healthData.hashDataFromFile(
        'samples/observation_sample.json',
        'medical-fhir',
        'observation',
      ).then((hash) => {
        return expect(hash)
          .to.be.equal('eb36d0606ff84bba5ae84e2af0f2197b2ff4272c3d22c46ffa27ca17851cea7f');
      });
    });

    it('should be work well for pghd txt format', () => {
      return healthData.hashDataFromFile(
        'samples/pghd.txt',
        'pghd',
        null,
      ).then((hash) => {
        return expect(hash)
          .to.be.equal('1d805ad9f40442aaf7376a7d11287a4a669a8ca1c70756fd0329aef00b139b83');
      });
    });

    it('should be work well for pghd json format', () => {
      return healthData.hashDataFromFile(
        'samples/pghd.json',
        'pghd',
        null,
      ).then((hash) => {
        return expect(hash)
          .to.be.equal('559e6fd3a29685fbe1e27b55d716ea78372fd9ce4583e07ae92dce6264ee83c6');
      });
    });
  });
});
