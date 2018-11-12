import { expect } from 'chai';
import wrapTxCreator from 'local/transaction/utils/wrapTxCreator';

describe('# wrapTxCreator', () => {
  const creator = rawTx => rawTx;
  const rawTxFields = {
    alg: 1,
    chain_id: 1,
    from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
    nonce: 3,
    timestamp: 1530854902566,
    to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    value: '55',
    tx_type: 'transfer',
  };
  let tx;

  beforeEach(() => {
    const wtc = wrapTxCreator(creator);
    tx = wtc(rawTxFields);
    return Promise.resolve();
  });

  it('should return object with hash', () => {
    expect(tx).to.have.property('hash');
  });
  it('should return object with rawTx', () => {
    expect(tx).to.have.property('rawTx')
      .to.eql(creator(rawTxFields));
  });
  it('should return object with sign', () => {
    expect(tx).to.have.property('sign')
      .to.equal(null);
  });
});
