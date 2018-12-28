import { expect } from 'chai';
import {
  becomeCandidateTx,
  recoverPayload,
} from 'local/transaction';
import { constants } from 'local/transaction/utils';

const {
  REQUIRED_TX_PARAMS,
  BECOME_CANDIDATE,
} = constants;

describe('# becomeCandidateTx', () => {
  const fields = {
    from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
    nonce: 1,
    value: '100000000',
  };
  const tx = becomeCandidateTx(fields);

  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('hash');
  });
  it('should return transaction contains rawTx', () => {
    expect(tx).to.have.property('rawTx')
      .to.contain.all.keys(REQUIRED_TX_PARAMS[BECOME_CANDIDATE].map(param => param.split('.')[0]));
  });
  it('should return transaction not contains signature', () => {
    expect(tx).to.have.property('sign')
      .to.equal(null);
  });

  describe('# recoverPayload', () => {
    it('should recover expected transaction payload', () => {
      expect(recoverPayload(tx)).to.eql(null);
    });
  });
});
