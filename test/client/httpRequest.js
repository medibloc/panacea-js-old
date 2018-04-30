import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';
// import sinon from 'sinon';
import { GET } from 'client/constants';
import { request } from 'client/httpRequest';

chai.use(chaiAsPromised);

describe('httpRequest', () => {
  const defaultConfig = {
    baseURL: 'http://localhost:10000',
    method: GET,
    params: {
      address: 'abcd',
      height: 1,
    },
    url: '/v1/user/accountstate',
    validateStatus(status) {
      return status >= 200 && status < 500;
    },
  };
  const defaultResponseData = {
    balance: 10,
    nonce: 0,
    type: 0,
  };

  describe('#request', () => {
    let mock;
    beforeEach(() => {
      mock = new MockAdapter(axios);
    });

    afterEach(() => {
      mock.reset();
    });

    after(() => {
      mock.restore();
    });

    it('should resolves data', async () => {
      mock.onGet(defaultConfig.url).reply(200, {
        ...defaultResponseData,
      });
      return expect(request(defaultConfig))
        .to.eventually.eql(defaultResponseData);
    });

    it('should rejects if status is invalid', async () => {
      mock.onGet('/invalid/status').reply(500, {});
      return expect(request('/invalid/status'))
        .to.be.rejectedWith(Error, 'Request failed with status code 500');
    });

    it('should rejects if timeout', async () => {
      mock.onGet('/timeout').timeout();
      return expect(request('/timeout'))
        .to.be.rejectedWith(Error, 'timeout of 0ms exceeded');
    });

    it('should rejects if network error', async () => {
      mock.onGet('/network/error').networkError();
      return expect(request('/network/error'))
        .to.be.rejectedWith(Error, 'Network Error');
    });
  });
});
