import { expect } from 'chai';
import nodeBucket from 'client/nodeBucket';

describe('nodeBucket', () => {
  const defaultNodes = ['http://localhost:10000', 'http://localhost:10001'];
  let newNodeBucket;
  let expectedNodes;
  beforeEach(() => {
    expectedNodes = defaultNodes.slice();
    newNodeBucket = nodeBucket(defaultNodes.slice());
    return Promise.resolve();
  });

  describe('#returned object', () => {
    it('should be a object', () => {
      return expect(newNodeBucket)
        .to.be.an('object');
    });

    it('should have a getNodes function', () => {
      return expect(newNodeBucket)
        .to.be.property('getNodes')
        .to.be.an('function');
    });

    it('should have a getSize function', () => {
      return expect(newNodeBucket)
        .to.be.property('getSize')
        .to.be.an('function');
    });

    it('should have a getRequestNode function', () => {
      return expect(newNodeBucket)
        .to.be.property('getRequestNode')
        .to.be.an('function');
    });

    it('should have a replaceRequestNode function', () => {
      return expect(newNodeBucket)
        .to.be.property('replaceRequestNode')
        .to.be.an('function');
    });

    it('should throw an error if nodes argument is empty', () => {
      return expect(() => nodeBucket())
        .to.throw(Error, 'nodeBucket requires array of nodes for initialization.');
    });

    it('should throw an error if nodes argument is not array', () => {
      return expect(() => nodeBucket('http://localhost:10000'))
        .to.throw(Error, 'nodeBucket requires array of nodes for initialization.');
    });

    it('should throw an error if nodes argument is empty array', () => {
      return expect(() => nodeBucket([]))
        .to.throw(Error, 'nodeBucket requires not empty array of nodes for initialization.');
    });
  });

  describe('#getNodes', () => {
    it('should return the nodes', () => {
      return expect(newNodeBucket.getNodes())
        .to.be.eql(expectedNodes);
    });
  });

  describe('#getSize', () => {
    it('should return the nodes count', () => {
      return expect(newNodeBucket.getSize())
        .to.be.eql(expectedNodes.length);
    });
  });

  describe('#getRequestNode', () => {
    it('should return the request node', () => {
      return expect(newNodeBucket.getRequestNode())
        .to.be.eql(expectedNodes[0]);
    });
  });

  describe('#replaceRequestNode', () => {
    it('should replace the request node', () => {
      newNodeBucket.replaceRequestNode();
      expect(newNodeBucket.getRequestNode())
        .to.be.eql(expectedNodes[1]);
      newNodeBucket.replaceRequestNode();
      return expect(newNodeBucket.getRequestNode())
        .to.be.eql(expectedNodes[0]);
    });
  });
});
