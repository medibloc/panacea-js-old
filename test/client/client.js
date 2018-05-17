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
  });
});
