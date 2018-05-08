import { checkTx, setTx } from './utils';
import {
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  VALUE_TRANSFER,
} from './utils/constants';


const validateTx = (tx) => {
  checkTx.checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
};

const createTx = (from, receiver, value, nonce, timestamp) => {
  const tx = setTx({
    from,
    nonce,
    timestamp,
    to: receiver,
    value,
    type: VALUE_TRANSFER,
  });
  validateTx(tx);
  return tx;
};


export default {
  createTx,
};
