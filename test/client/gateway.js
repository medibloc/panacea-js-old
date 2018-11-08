import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import gateway from 'client/gateway';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import proxyquire from 'proxyquire';
import httpRequest from 'client/httpRequest';
import nodeBucket from 'client/nodeBucket';
import { GET, MAX_REQUEST_RETRY_COUNT } from 'client/constants';

[sinonChai, chaiAsPromised].forEach(plugin => chai.use(plugin));

describe('gateway', () => {
  const invalidNodes = ['first_invalid_url', 'second_invalid_node'];
  const validNodes = ['first_valid_node', 'second_valid_node'];
  const combinedNodes = invalidNodes.concat(validNodes);

  const defaultReqConfig = {
    method: GET,
    path: 'v1/user/account',
    payload: {
      address: 'address',
      height: 0,
    },
  };

  const defaultReqResult = {
    balance: 1000,
    nonce: '0',
    type: 0,
  };

  describe('#returned object', () => {
    let validGateway;
    beforeEach(() => {
      const bucket = nodeBucket(validNodes.slice());
      validGateway = gateway(bucket);
      return Promise.resolve();
    });

    it('should be a object', () => {
      return expect(validGateway)
        .to.be.an('object');
    });

    it('should have a sendRequest function', () => {
      return expect(validGateway)
        .to.be.property('sendRequest')
        .to.be.an('function');
    });

    it('should throw an error if bucket argument is empty', () => {
      return expect(() => gateway())
        .to.throw(Error, 'gateway requires bucket for initialization.');
    });
  });

  describe('#sendRequest', () => {
    let combinedGateway;
    let invalidGateway;
    let proxyGateway;
    let requestStub;
    let sendRequestSpyCG;
    let sendRequestSpyIG;
    let sendRequestSpyVG;
    let validGateway;
    beforeEach(() => {
      requestStub = sinon.stub(httpRequest, 'request');

      requestStub.withArgs(sinon.match((object) => {
        return object.baseURL === validNodes[0];
      })).resolves({ ...defaultReqResult });
      requestStub.withArgs(sinon.match((object) => {
        return object.baseURL === validNodes[1];
      })).resolves({ ...defaultReqResult });
      requestStub.withArgs(sinon.match((object) => {
        return object.baseURL === invalidNodes[0];
      })).throws();
      requestStub.withArgs(sinon.match((object) => {
        return object.baseURL === invalidNodes[1];
      })).throws();
      proxyGateway = proxyquire('../../src/client/gateway', {
        '/.httpRequest': {
          request: requestStub,
        },
      });

      const combinedBucket = nodeBucket(combinedNodes.slice());
      combinedGateway = proxyGateway(combinedBucket);
      sendRequestSpyCG = sinon.spy(combinedGateway, 'sendRequest');

      const invalidBucket = nodeBucket(invalidNodes.slice());
      invalidGateway = proxyGateway(invalidBucket);
      sendRequestSpyIG = sinon.spy(invalidGateway, 'sendRequest');

      const validBucket = nodeBucket(validNodes.slice());
      validGateway = proxyGateway(validBucket);
      sendRequestSpyVG = sinon.spy(validGateway, 'sendRequest');

      return Promise.resolve();
    });

    afterEach(() => {
      requestStub.restore();
      sendRequestSpyCG.restore();
      sendRequestSpyIG.restore();
      sendRequestSpyVG.restore();
    });

    it('should be correct', () => {
      return validGateway.sendRequest(defaultReqConfig).then((res) => {
        expect(requestStub).to.be.calledWith;
        expect(sendRequestSpyVG).to.be.calledOnce;
        return expect(res).to.be.eql(defaultReqResult);
      });
    });

    it('should throw an error if retry count exceed MAX_REQUEST_RETRY_COUNT', () => {
      return validGateway.sendRequest(defaultReqConfig, {}, MAX_REQUEST_RETRY_COUNT + 1)
        .catch((err) => {
          expect(requestStub).not.to.be.called;
          expect(sendRequestSpyVG).to.be.calledOnce;
          return expect(err.message).to.be.eql('send request failed.');
        });
    });

    it('should throw an error if retry count exceed bucket size', () => {
      return invalidGateway.sendRequest(defaultReqConfig).catch((err) => {
        expect(requestStub).not.to.be.calledThrice;
        // expect(sendRequestSpyIG).to.be.calledThrice;
        return expect(err.message).to.be.eql('send request failed.');
      });
    });

    it('should be correct although if some nodes are invalid', () => {
      return combinedGateway.sendRequest(defaultReqConfig).then((res) => {
        expect(requestStub).to.be.calledThrice;
        // expect(sendRequestSpyCG).to.be.calledThrice;
        return expect(res).to.be.eql(defaultReqResult);
      });
    });
  });
});
