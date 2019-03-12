import { expect } from 'chai';
import {
  init,
  client,
  cryptography,
  healthData,
  identification,
  local,
  utils,
} from 'index';

describe('panacea-js', () => {
  const defaultNodes = ['http://localhost:10000'];

  describe('#should export a init', () => {
    let panaceajs;
    beforeEach(() => {
      panaceajs = init(defaultNodes);
      return Promise.resolve();
    });

    it('should be a object', () => {
      return expect(panaceajs)
        .to.be.an('object');
    });

    it('should have a client object', () => {
      return expect(panaceajs)
        .to.be.property('client')
        .to.be.a('object');
    });

    it('should have a cryptography object', () => {
      return expect(panaceajs)
        .to.be.property('cryptography')
        .to.be.an('object');
    });

    it('should have a healthData object', () => {
      return expect(panaceajs)
        .to.be.property('healthData')
        .to.be.an('object');
    });

    it('should have a identification object', () => {
      return expect(panaceajs)
        .to.be.property('identification')
        .to.be.an('object');
    });

    it('should have a local object', () => {
      return expect(panaceajs)
        .to.be.property('local')
        .to.be.an('object');
    });

    it('should have a utils object', () => {
      return expect(panaceajs)
        .to.be.property('utils')
        .to.be.an('object');
    });
  });

  it('should export a client object', () => {
    return expect(client)
      .to.be.an('function');
  });

  it('should export a cryptography object', () => {
    return expect(cryptography)
      .to.be.an('object');
  });

  it('should export a healthData object', () => {
    return expect(healthData)
      .to.be.an('object');
  });

  it('should export a identification object', () => {
    return expect(identification)
      .to.be.an('object');
  });

  it('should export a local object', () => {
    return expect(local)
      .to.be.an('object');
  });

  it('should export a utils object', () => {
    return expect(utils)
      .to.be.an('object');
  });
});
