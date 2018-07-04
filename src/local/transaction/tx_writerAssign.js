import { checkTx, constants, setTx } from './utils';

const { REQUIRED_WRITER_ASSIGN_TX_PARAMETERS } = constants;

const validateTx = (tx) => {
  checkTx.checkObject(tx);
  checkTx.checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
};

const createTx = (from, writerPubKey, nonce, timestamp) => {
  const dataPayloadHash = [];
  Buffer.from(writerPubKey, 'hex').forEach(byte => dataPayloadHash.push(byte));

  const tx = setTx({
    from,
    nonce,
    payload: {
      Writer: dataPayloadHash,
    },
    timestamp,
    type: constants.WRITER_ASSIGN,
  });

  validateTx(tx);
  return tx;
};

export default {
  createTx,
};
