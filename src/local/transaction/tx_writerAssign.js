import { checkTx, setTx, constants } from './utils';
import { REQUIRED_WRITER_ASSIGN_TX_PARAMETERS } from './utils/constants';


const validateTx = (tx, account) => {
  checkTx.checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
  checkTx.checkNonce(tx, account);
};


const createTx = (ownerAccount, writerPubKey) => {
  const tx = setTx({
    ownerAccount,
    payload: {
      Writer: writerPubKey,
    },
    type: constants.WRITER_ASSIGN,
  });
  validateTx(tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
