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
    type: 'binary',
  };
  const valueTrasnferTx = setTx(valueTransferTxData);

  it('Throw error unless tx input is object', () => {
    const stringInput = JSON.stringify(valueTrasnferTx);
    expect(() => hashTx(stringInput)).to.throw(Error, 'Transaction format should be object.');
    const numberInput = 123;
    expect(() => hashTx(numberInput)).to.throw(Error, 'Transaction format should be object.');
  });

  it('Throw error if value type isnt a string or value exceeds the max or negative', () => {
    // MAX : 340282366920938463463374607431768211455
    valueTransferTxData.value = 7922816251426;
    const wrongTypeValueTx = setTx(valueTransferTxData);
    expect(() => hashTx(wrongTypeValueTx)).to.throw(Error, 'Type of value need to be string');
    valueTransferTxData.value = '340282366920938463463374607431768211456';
    const overValueTx = setTx(valueTransferTxData);
    expect(() => hashTx(overValueTx)).to.throw(Error, 'Amount is too large');
    valueTransferTxData.value = '-100';
    const negativeValueTx = setTx(valueTransferTxData);
    expect(() => hashTx(negativeValueTx)).to.throw(Error, 'Can not send negative value');
  });

  it('Should generate hex string', () => {
    expect(hashTx(valueTrasnferTx)).to.be.hexString;
  });
});
