import { BigNumber } from 'bignumber.js';

const MAX_VALUE = new BigNumber('ffffffffffffffffffffffffffffffff', 16);

const checkObject = (tx) => {
  if (typeof tx !== 'object') throw new Error('Transaction format should be object.');
};

const checkRequiredParams = (tx, requiredParams) => {
  requiredParams.forEach((param) => {
    const p = param.split('.');
    if (p.length === 1 && tx[p[0]] === undefined) {
      throw new Error(`Transaction should have ${param} field.`);
    } else if (p.length === 2 &&
      (tx[p[0]] === undefined || tx[p[0]][p[1]] === undefined)) {
      throw new Error(`Transaction should have ${param} field.`);
    } else if (p.length > 2) {
      throw new Error('Transaction should have field with max 2 depths.');
    }
  });
};

const checkValue = (tx) => {
  if (typeof tx.value !== 'string') throw new Error('Type of value need to be string');
  const value = new BigNumber(tx.value); // From Decimal
  if (value.lt(0)) throw new Error('Can not send negative value');
  if (value.gt(MAX_VALUE)) throw new Error('Amount is too large');
};

export default {
  checkObject,
  checkRequiredParams,
  checkValue,
};
