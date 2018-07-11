import { expect } from 'chai';
import { Account } from 'local/account';
import { checkTx, constants, setTx } from 'local/transaction/utils';

const { checkObject, checkRequiredParams, checkValue } = checkTx;
const {
  DATA_UPLOAD,
  VALUE_TRANSFER,
  REQUIRED_TX_PARAMS,
} = constants;

// checkTx
describe('# checkTx function', () => {
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

  it('Throw error if transaction doesn\'t have required params 1', () => {
    REQUIRED_TX_PARAMS[VALUE_TRANSFER].forEach((param) => {
      let tempTx;
      const p = param.split('.');
      if (p.length === 1) {
        tempTx = Object.assign(
          {},
          valueTransferTx,
          {
            [p[0]]: undefined,
          },
        );
      } else if (p.length === 2) {
        tempTx = Object.assign(
          {},
          valueTransferTx,
          {
            [p[0]]: {
              [p[1]]: undefined,
            },
          },
        );
      }
      expect(() => checkRequiredParams(tempTx, REQUIRED_TX_PARAMS[VALUE_TRANSFER])).to.throw(Error, `Transaction should have ${param} field.`);
    });
  });

  it('Throw error if transaction doesn\'t have required params 2', () => {
    REQUIRED_TX_PARAMS[DATA_UPLOAD].forEach((param) => {
      let tempTx;
      const p = param.split('.');
      if (p.length === 1) {
        tempTx = Object.assign(
          {},
          dataUploadTx,
          {
            [param]: undefined,
          },
        );
      } else if (p.length === 2) {
        tempTx = Object.assign(
          {},
          dataUploadTx,
          {
            [p[0]]: Object.assign(
              {},
              dataUploadTx[p[0]],
              {
                [p[1]]: undefined,
              },
            ),
          },
        );
      }
      expect(() => checkRequiredParams(tempTx, REQUIRED_TX_PARAMS[DATA_UPLOAD])).to.throw(Error, `Transaction should have ${param} field.`);
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
