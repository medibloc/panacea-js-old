import { expect } from 'chai';
import index from 'index';

describe('medjs', () => {
  const defaultNodes = ['http://localhost:10000'];

  describe('#returned object', () => {
    let medjs;
    beforeEach(() => {
      medjs = index(defaultNodes);
      return Promise.resolve();
    });

    it('should be a object', () => {
      return expect(medjs)
        .to.be.an('object');
    });

    it('should have a client object', () => {
      return expect(medjs)
        .to.be.property('client')
        .to.be.an('object');
    });

    it('should have a cryptography object', () => {
      return expect(medjs)
        .to.be.property('cryptography')
        .to.be.an('object');
    });

    it('should have a local object', () => {
      return expect(medjs)
        .to.be.property('local')
        .to.be.an('object');
    });

    it('should have a storage object', () => {
      return expect(medjs)
        .to.be.property('storage')
        .to.be.an('object');
    });

    it('should have a util object', () => {
      return expect(medjs)
        .to.be.property('util')
        .to.be.an('object');
    });

    it('should throw an error if nodes argument is empty', () => {
      return expect(() => index())
        .to.throw(Error, 'medjs requires array of nodes for initialization.');
    });

    it('should throw an error if nodes argument is empty', () => {
      return expect(() => index('http://localhost:10000'))
        .to.throw(Error, 'medjs requires array of nodes for initialization.');
    });
  });
});
