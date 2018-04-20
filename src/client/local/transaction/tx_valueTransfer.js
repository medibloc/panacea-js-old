import { checkTx, setTx } from './utils';
import { REQUIRED_VALUE_TRANSFER_TX_PARAMETERS } from './types';


const validateTx = (tx, userAccount) => {
  checkTx.checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
  checkTx.checkNonce(tx, userAccount);
  checkTx.checkBalance(tx, userAccount);
  return true;
};


const createTx = (userAccount, receiver, amount) => {
  let tx = {};
  tx = setTx.setCommon(tx, userAccount);
  tx = setTx.setAmount(tx, amount);
  tx = setTx.setReceiver(tx, receiver);
  tx = setTx.setType(tx, 'valueTransfer');
  validateTx(tx, userAccount);
  return tx;
};


export default {
  createTx,
};
