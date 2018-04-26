import { checkTx, setTx } from './utils';
import { REQUIRED_VALUE_TRANSFER_TX_PARAMETERS } from './types';


const validateTx = (tx, ownerAccount) => {
  if (!checkTx.checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS)) return false;
  if (!checkTx.checkNonce(tx, ownerAccount)) return false;
  if (!checkTx.checkBalance(tx, ownerAccount)) return false;
  return true;
};


const createTx = (ownerAccount, receiverPubKey, value) => {
  const tx = setTx({
    ownerAccount,
    to: receiverPubKey,
    value,
    type: 'binary',
  });
  if (!validateTx(tx, ownerAccount)) return false;
  return tx;
};


export default {
  createTx,
};
