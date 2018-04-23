import { checkTx, setTx } from './utils';
import { REQUIRED_WRITER_ASSIGN_TX_PARAMETERS } from './types';


const validateTx = (tx, ownerAccount) => {
  checkTx.checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
  checkTx.checkNonce(tx, ownerAccount);
  return true;
};


const createTx = (ownerAccount, writerPubKey) => {
  let tx = {};
  tx = setTx.setCommon(tx, ownerAccount);
  tx = setTx.setWriter(tx, writerPubKey);
  tx = setTx.setType(tx, 'writerAssign');
  validateTx(tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
