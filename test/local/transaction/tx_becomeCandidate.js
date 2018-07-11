import { expect } from 'chai';
import becomeCandidate from 'local/transaction/tx_becomeCandidate';
import { constants } from 'local/transaction/utils';

const {
  REQUIRED_TX_PARAMS,
  BECOME_CANDIDATE,
} = constants;

describe('# becomeCandidate', () => {
  const fields = {
    from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
    nonce: 1,
    timestamp: 1524549462850,
    value: '100000000',
  };
  const tx = becomeCandidate(fields);

  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('hash');
  });
  it('should return transaction contains rawTx', () => {
    console.log(tx.rawTx);
    expect(tx).to.have.property('rawTx')
      .to.contain.all.keys(REQUIRED_TX_PARAMS[BECOME_CANDIDATE].map(param => param.split('.')[0]));
  });
  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('sign')
      .to.equal(null);
  });
});
