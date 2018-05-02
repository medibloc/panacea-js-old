import { checkTx, setTx, constants } from './utils';
import { REQUIRED_WRITER_ASSIGN_TX_PARAMETERS } from './utils/constants';


const validateTx = (tx) => {
  checkTx.checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
};


const createTx = (from, writerPubKey, nonce, timestamp) => {
  const dataPayloadHash = [];
  Buffer.from(writerPubKey, 'hex').forEach(byte => dataPayloadHash.push(byte));
  const tx = setTx({
    from,
    nonce,
    timestamp,
    payload: {
      Writer: dataPayloadHash,
    },
    type: constants.WRITER_ASSIGN,
  });
  validateTx(tx);
  return tx;
};


export default {
  createTx,
};
