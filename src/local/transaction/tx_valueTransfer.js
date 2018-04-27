import { checkTx, setTx, constants } from './utils';
import { REQUIRED_VALUE_TRANSFER_TX_PARAMETERS } from './utils/constants';


const validateTx = (tx, account) => {
  checkTx.checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
  checkTx.checkNonce(tx, account);
  checkTx.checkBalance(tx, account);
};

const createTx = (ownerAccount, receiverPubKey, value) => {
  const tx = setTx({
    ownerAccount,
    to: receiverPubKey,
    value,
    type: constants.VALUE_TRANSFER,
  });
  validateTx(tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
