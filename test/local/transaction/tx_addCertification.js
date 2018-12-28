import { expect } from 'chai';
import {
  addCertificationTx,
  createAddCertificationPayload,
  recoverPayload,
} from 'local/transaction';
import { constants } from 'local/transaction/utils';

const {
  REQUIRED_TX_PARAMS,
  ADD_CERTIFICATION,
} = constants;

describe('# addCertificationCandidateTx', () => {
  const payload = createAddCertificationPayload({
    issueTime: 1540000000,
    expirationTime: 1600000000,
    hash: '487b69767e201f485a67b915f1726e39a9d84d72ce3753dfdc824ebdf22e9b33',
  });
  const fields = {
    from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
    nonce: 1,
    payload,
    to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
  };
  const tx = addCertificationTx(fields);

  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('hash');
  });
  it('should return transaction contains rawTx', () => {
    expect(tx).to.have.property('rawTx')
      .to.contain.all.keys(REQUIRED_TX_PARAMS[ADD_CERTIFICATION].map(param => param.split('.')[0]));
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
