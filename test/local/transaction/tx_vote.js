import { expect } from 'chai';
import voteTx from 'local/transaction/tx_vote';
import { constants } from 'local/transaction/utils';

const {
  REQUIRED_TX_PARAMS,
  VOTE,
} = constants;

describe('# voteTx', () => {
  const fields = {
    from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
    nonce: 1,
    timestamp: 1524549462850,
    to: '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939',
  };
  const tx = voteTx(fields);

  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('hash');
  });
  it('should return transaction contains rawTx', () => {
    console.log(tx.rawTx);
    expect(tx).to.have.property('rawTx')
      .to.contain.all.keys(REQUIRED_TX_PARAMS[VOTE].map(param => param.split('.')[0]));
  });
  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('sign')
      .to.equal(null);
  });
});
