import { checkTx, setTx } from './utils';
import { REQUIRED_WRITER_ASSIGN_TX_PARAMETERS } from './types';


const validateTx = (tx, userAccount) => {
  checkTx.checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
  checkTx.checkNonce(tx, userAccount);
  return true;
};


const createTx = (userAccount, writer) => {
  let tx = {};
  tx = setTx.setCommon(tx, userAccount);
  tx = setTx.setWriter(tx, writer);
  tx = setTx.setType(tx, 'writerAssign');
  validateTx(tx, userAccount);
  return tx;
};


export default {
  createTx,
};
