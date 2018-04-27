import { checkTx, setTx, constants } from './utils';
import { REQUIRED_WRITER_ASSIGN_TX_PARAMETERS } from './utils/constants';


const validateTx = (tx) => {
  checkTx.checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
};


const createTx = (fromPubKey, writerPubKey, nonce) => {
  const tx = setTx({
    fromPubKey,
    nonce,
    payload: {
      Writer: writerPubKey,
    },
    type: constants.WRITER_ASSIGN,
  });
  validateTx(tx);
  return tx;
};


export default {
  createTx,
};
