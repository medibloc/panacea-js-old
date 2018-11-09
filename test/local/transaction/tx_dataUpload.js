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
    nonce: 1,
    chain_id: 1,
    payload,
    timestamp: 1540000000,
  };
  const tx = dataUploadTx(fields);
  const txHashFromGo = '8b09e36a6174d799e48b6eb0aea48d62070f4d4626c27fcbb9fd4e778e77e834';

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
