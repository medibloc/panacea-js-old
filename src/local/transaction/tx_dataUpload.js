import { checkTx, constants, setTx } from './utils';

const { REQUIRED_DATA_UPLOAD_TX_PARAMETERS } = constants;

const validateTx = tx =>
  checkTx.checkRequiredParams(tx, REQUIRED_DATA_UPLOAD_TX_PARAMETERS);

const createTx = (from, medicalData, nonce, timestamp) => {
  const medicalDataPayload = {
    Hash: Buffer.from(medicalData.Hash, 'hex').toString('base64'),
  };

  const tx = setTx({
    from,
    nonce,
    payload: medicalDataPayload,
    timestamp,
    type: constants.DATA_UPLOAD,
  });

  validateTx(tx);
  return tx;
};

const createDataPayload = hash => ({
  Hash: hash,
});

export default {
  createDataPayload,
  createTx,
};
