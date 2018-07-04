import { BigNumber } from 'bignumber.js';

const checkObject = (tx) => {
  if (typeof tx !== 'object') throw new Error('Transaction format should be object.');
};

const checkRequiredParams = (tx, requiredParams) => {
  requiredParams.forEach((param) => {
    if (tx[param] === undefined && tx.data[param] === undefined) {
      throw new Error(`Transaction should have ${param} field.`);
    }
  });
};

const checkValue = (tx) => {
  if (typeof tx.value !== 'string') throw new Error('Type of value need to be string');
  const value = new BigNumber(tx.value); // From Decimal
  const MAX_VALUE = new BigNumber('ffffffffffffffffffffffffffffffff', 16);
  if (value.lt(0)) throw new Error('Can not send negative value');
  if (value.gt(MAX_VALUE)) throw new Error('Amount is too large');
};

export default {
  checkObject,
  checkRequiredParams,
  checkValue,
};
