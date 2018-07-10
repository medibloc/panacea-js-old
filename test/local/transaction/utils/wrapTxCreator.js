import { expect } from 'chai';
import wrapTxCreator from 'local/transaction/utils/wrapTxCreator';

describe('# wrapTxCreator', () => {
  const creator = rawTx => rawTx;
  const rawTxFields = {
    alg: 1,
    chain_id: 1,
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    nonce: 3,
    data: { type: 'binary' },
    timestamp: 1530854902566,
    to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    value: '55',
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
