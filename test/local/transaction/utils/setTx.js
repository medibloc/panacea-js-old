import { expect } from 'chai';
import setTx from 'local/transaction/utils/setTx';
import { Account } from 'local/account';

// setTx
describe('# signHashedTx function', () => {
  const user = new Account('');
  const requiredNotNullParams = ['from', 'nonce', 'chain_id', 'alg'];

  it('Tx should have not null default value', () => {
    const tx = setTx({ from: user.pubKey });
    Object.keys(tx).forEach(key => requiredNotNullParams.indexOf(key) !== -1 && expect(tx[key]).not.to.be.a('null'));
  });
});
