import { expect } from 'chai';
import { Account } from 'local/account';
import { hashTx, setTx } from 'local/transaction/utils';

// hashTx
describe('# hashTx function', () => {
  const user = new Account('');
  const valueTransferTxData = {
    from: user.pubKey,
    to: user.pubKey,
    value: '5',
    nonce: 3,
    type: 'transfer',
  };
  const valueTrasnferTx = setTx(valueTransferTxData);

  it('Should generate hex string', () => {
    expect(hashTx(valueTrasnferTx)).to.be.hexString;
  });
});
