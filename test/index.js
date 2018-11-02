import { expect } from 'chai';
import Medjs, {
  init,
  client,
  cryptography,
  healthData,
  identification,
  local,
  utils,
} from 'index';

describe('medjs', () => {
  const defaultNodes = ['http://localhost:10000'];

  describe('#should export medjs', () => {
    const medjs = Medjs.init(defaultNodes);

    it('should be a object', () => {
      return expect(medjs)
        .to.be.an('object');
    });

    it('should have a client object', () => {
      return expect(medjs)
        .to.be.property('client')
        .to.be.a('object');
    });

    it('should have a cryptography object', () => {
      return expect(medjs)
        .to.be.property('cryptography')
        .to.be.an('object');
    });

    it('should have a healthData object', () => {
      return expect(medjs)
        .to.be.property('healthData')
        .to.be.an('object');
    });

    it('should have a identification object', () => {
      return expect(medjs)
        .to.be.property('identification')
        .to.be.an('object');
    });

    it('should have a local object', () => {
      return expect(medjs)
        .to.be.property('local')
        .to.be.an('object');
    });

    it('should have a utils object', () => {
      return expect(medjs)
        .to.be.property('utils')
        .to.be.an('object');
    });
  });

  describe('#should export a init', () => {
    const medjsFromInit = init(defaultNodes);

    it('should be a object', () => {
      return expect(medjsFromInit)
        .to.be.an('object');
    });

    it('should have a client object', () => {
      return expect(medjsFromInit)
        .to.be.property('client')
        .to.be.a('object');
    });

    it('should have a cryptography object', () => {
      return expect(medjsFromInit)
        .to.be.property('cryptography')
        .to.be.an('object');
    });

    it('should have a healthData object', () => {
      return expect(medjsFromInit)
        .to.be.property('healthData')
        .to.be.an('object');
    });

    it('should have a identification object', () => {
      return expect(medjsFromInit)
        .to.be.property('identification')
        .to.be.an('object');
    });

    it('should have a local object', () => {
      return expect(medjsFromInit)
        .to.be.property('local')
        .to.be.an('object');
    });

    it('should have a utils object', () => {
      return expect(medjsFromInit)
        .to.be.property('utils')
        .to.be.an('object');
    });
  });

  it('should export a init object', () => {
    return expect(init)
      .to.be.a('function');
  });

  it('should export a client object', () => {
    return expect(client)
      .to.be.a('function');
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
