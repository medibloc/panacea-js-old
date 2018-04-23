import { checkTx, setTx } from './utils';
import { REQUIRED_VALUE_TRANSFER_TX_PARAMETERS } from './types';


const validateTx = (tx, ownerAccount) => {
  checkTx.checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
  checkTx.checkNonce(tx, ownerAccount);
  checkTx.checkBalance(tx, ownerAccount);
  return true;
};


const createTx = (ownerAccount, receiver, value) => {
  const tx = setTx({
    ownerAccount,
    to: receiver,
    value,
  });
  validateTx(tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
