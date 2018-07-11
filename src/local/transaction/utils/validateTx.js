import {
  checkObject,
  checkRequiredParams,
  checkValue,
} from './checkTx';

const validateTx = (tx, requiredParams = []) => {
  checkObject(tx);
  checkRequiredParams(tx, requiredParams);
  requiredParams.forEach((param) => {
    if (param === 'value') {
      checkValue(tx);
    }
  });
};

export default validateTx;
