import { expect } from 'chai';
import quitCandidacyTx from 'local/transaction/tx_quitCandidacy';
import { constants } from 'local/transaction/utils';

const {
  REQUIRED_TX_PARAMS,
  QUIT_CANDIDATE,
} = constants;

describe('# quitCandidacyTx', () => {
  const fields = {
    from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
    nonce: 1,
    timestamp: 1524549462850,
  };
  const tx = quitCandidacyTx(fields);

  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('hash');
  });
  it('should return transaction contains rawTx', () => {
    console.log(tx.rawTx);
    expect(tx).to.have.property('rawTx')
      .to.contain.all.keys(REQUIRED_TX_PARAMS[QUIT_CANDIDATE].map(param => param.split('.')[0]));
  });
  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('sign')
      .to.equal(null);
  });
});
