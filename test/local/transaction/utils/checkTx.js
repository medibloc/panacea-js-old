import { expect } from 'chai';
import { Account } from 'local/account';
import { checkTx, constants, setTx } from 'local/transaction/utils';

// checkTx
describe('# checkTx function', () => {
  const { checkObject, checkRequiredParams, checkValue } = checkTx;
  const {
    DATA_UPLOAD,
    VALUE_TRANSFER,
    REQUIRED_DATA_UPLOAD_TX_PARAMETERS,
    REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  } = constants;

  const user = new Account('');
  const dataUploadTxData = {
    from: user.pubKey,
    nonce: 3,
    type: DATA_UPLOAD,
    payload: {
      Hash: 'hash',
    },
  };
  const dataUploadTx = setTx(dataUploadTxData);

  const valueTransferTxData = {
    from: user.pubKey,
    to: user.pubKey,
    value: '5',
    nonce: 3,
    type: VALUE_TRANSFER,
  };
  const valueTransferTx = setTx(valueTransferTxData);

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

    REQUIRED_DATA_UPLOAD_TX_PARAMETERS.forEach((param) => {
      const tempTx = Object.assign(
        {},
        dataUploadTx,
        {
          [param]: undefined,
        },
      );
      tempTx.data = Object.assign({}, tempTx.data, { [param]: undefined });
      expect(() => checkRequiredParams(tempTx, REQUIRED_DATA_UPLOAD_TX_PARAMETERS)).to.throw(Error, `Transaction should have ${param} field.`);
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
