import { checkTx, setTx } from './utils';
import { REQUIRED_WRITER_ASSIGN_TX_PARAMETERS } from './types';


const validateTx = (tx, ownerAccount) => {
  checkTx.checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
  checkTx.checkNonce(tx, ownerAccount);
  return true;
};


const createTx = (ownerAccount, writerPubKey) => {
  const tx = setTx({
    ownerAccount,
    payload: {
      Writer: writerPubKey,
    },
    type: 'register_wkey',
  });
  validateTx(tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
