import { expect } from 'chai';
import validateTx from 'local/transaction/utils/validateTx';

describe('# validateTx', () => {
  const tx = {
    alg: 1,
    chain_id: 1,
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    nonce: 3,
    data: { type: 'binary' },
    timestamp: 1530854902566,
    to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    value: 1,
  };

  it('should return error when tx is not an object', () => {
    expect(() => validateTx('not object')).to.throw(Error, 'Transaction format should be object.');
  });
  it('should return error when tx has no required params', () => {
    expect(() => validateTx(tx, ['test'])).to.throw(Error, 'Transaction should have test field.');
  });
  it('should return error when tx has invalid value', () => {
    expect(() => validateTx(tx, ['value'])).to.throw(Error, 'Type of value need to be string');
  });
});

