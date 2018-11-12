import { expect } from 'chai';
import {
  createDataPayload,
  dataUploadTx,
  recoverPayload,
} from 'local/transaction';
import { constants } from 'local/transaction/utils';

const {
  REQUIRED_TX_PARAMS,
  DATA_UPLOAD,
} = constants;

describe('# dataUploadTx', () => {
  const payload = createDataPayload('487b69767e201f485a67b915f1726e39a9d84d72ce3753dfdc824ebdf22e9b33');
  const fields = {
    from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
    nonce: 1,
    chain_id: 1,
    payload,
    timestamp: 1540000000,
  };
  const tx = dataUploadTx(fields);
  const txHashFromGo = '5b2bc1d1e6993e2c940db51d5947d537988385b1416c4fc9ade11e678491b5ab';

  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('hash')
      .to.equal(txHashFromGo);
  });
  it('should return transaction contains rawTx', () => {
    expect(tx).to.have.property('rawTx')
      .to.contain.all.keys(REQUIRED_TX_PARAMS[DATA_UPLOAD].map(param => param.split('.')[0]));
  });
  it('should return transaction not contains signature', () => {
    expect(tx).to.have.property('sign')
      .to.equal(null);
  });

  describe('# recoverPayload', () => {
    it('should recover expected transaction payload', () => {
      expect(recoverPayload(tx)).to.eql(payload);
    });
  });
});
