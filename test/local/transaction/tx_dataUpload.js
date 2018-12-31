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
    payload,
  };
  const tx = dataUploadTx(fields);
  const txHashFromGo = '0d61ed6b9f36b31073e4be48632803b119ebc73d6b26146309e32cdca5b3a7e9';

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
