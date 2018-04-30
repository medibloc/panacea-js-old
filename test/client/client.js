import { expect } from 'chai';
import client from 'client/client';

describe('client', () => {
  const defaultNodes = ['http://localhost:10000'];

  describe('#returned object', () => {
    let newClient;
    beforeEach(() => {
      newClient = client(defaultNodes);
      return Promise.resolve();
    });

    it('should be a object', () => {
      return expect(newClient)
        .to.be.an('object');
    });

    it('should have a nodeBucket object', () => {
      return expect(newClient)
        .to.be.property('nodeBucket')
        .to.be.an('object');
    });

    it('should throw an error if nodes argument is empty', () => {
      return expect(() => client())
        .to.throw(Error, 'client requires array of nodes for initialization.');
    });

    it('should throw an error if nodes argument is empty', () => {
      return expect(() => client('http://localhost:10000'))
        .to.throw(Error, 'client requires array of nodes for initialization.');
    });
  });
});
