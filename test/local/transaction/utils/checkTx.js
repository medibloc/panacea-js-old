import { expect } from 'chai';
import { Account } from 'local/account';
import { checkTx, constants, setTx } from 'local/transaction/utils';

// checkTx
describe('# checkTx function', () => {
  const { checkObject, checkRequiredParams, checkValue } = checkTx;
  const {
    REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
    REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
  } = constants;

  const user = new Account('');
  const valueTransferTxData = {
    from: user.pubKey,
    to: user.pubKey,
    value: '5',
    nonce: 3,
    type: 'binary',
  };
  const valueTransferTx = setTx(valueTransferTxData);

  const writerAssignTxData = {
    from: user.pubKey,
    nonce: 3,
    type: 'register_wkey',
    payload: {
      Writer: user.pubKey,
    },
  };
  const writerAssignTx = setTx(writerAssignTxData);

  it('Throw error unless tx input is object', () => {
    const stringInput = JSON.stringify(valueTransferTx);
    expect(() => checkObject(stringInput)).to.throw(Error, 'Transaction format should be object.');
    const numberInput = 123;
    expect(() => checkObject(numberInput)).to.throw(Error, 'Transaction format should be object.');
  });

  it('Throw error if transaction doesn\'t have required params', () => {
    REQUIRED_VALUE_TRANSFER_TX_PARAMETERS.forEach((param) => {
      const tempTx = Object.assign(
        {},
        valueTransferTx,
        {
          [param]: undefined,
          data: {
            [param]: undefined,
          },
        },
      );
      if (param !== 'type') tempTx.data.type = 'binary';
      expect(() => checkRequiredParams(tempTx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS)).to.throw(Error, `Transaction should have ${param} field.`);
    });

    REQUIRED_WRITER_ASSIGN_TX_PARAMETERS.forEach((param) => {
      const tempTx = Object.assign(
        {},
        writerAssignTx,
        {
          [param]: undefined,
        },
      );
      tempTx.data = Object.assign({}, tempTx.data, { [param]: undefined });
      expect(() => checkRequiredParams(tempTx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS)).to.throw(Error, `Transaction should have ${param} field.`);
    });
  });

  it('Throw error if value type isnt a string or value exceeds the max or negative', () => {
    // MAX : 340282366920938463463374607431768211455
    valueTransferTxData.value = 7922816251426;
    const wrongTypeValueTx = setTx(valueTransferTxData);
    expect(() => checkValue(wrongTypeValueTx)).to.throw(Error, 'Type of value need to be string');
    valueTransferTxData.value = '340282366920938463463374607431768211456';
    const overValueTx = setTx(valueTransferTxData);
    expect(() => checkValue(overValueTx)).to.throw(Error, 'Amount is too large');
    valueTransferTxData.value = '-100';
    const negativeValueTx = setTx(valueTransferTxData);
    expect(() => checkValue(negativeValueTx)).to.throw(Error, 'Can not send negative value');
  });
});
