import { checkTx, constants, setTx } from './utils';

const {
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  VALUE_TRANSFER,
} = constants;

const validateTx = (tx) => {
  checkTx.checkObject(tx);
  checkTx.checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
  checkTx.checkValue(tx);
};

const createTx = (from, to, value, nonce, timestamp) => {
  const tx = setTx({
    from,
    nonce,
    timestamp,
    to,
    type: VALUE_TRANSFER,
    value,
  });

  validateTx(tx);
  return tx;
};

export default {
  createTx,
};
