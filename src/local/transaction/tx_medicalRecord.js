import { checkTx, setTx, constants } from './utils';
import { REQUIRED_MEDICAL_RECORD_TX_PARAMETERS } from './utils/constants';


const validateTx = (tx) => {
  checkTx.checkRequiredParams(tx, REQUIRED_MEDICAL_RECORD_TX_PARAMETERS);
};


const createTx = (from, medicalData, nonce, timestamp) => {
  const medicalDataPayload = {};
  const dataPayloadHash = [];
  Buffer.from(medicalData.Hash, 'hex').forEach(byte => dataPayloadHash.push(byte));
  medicalDataPayload.Hash = dataPayloadHash;
  medicalDataPayload.Storage = medicalData.Storage;
  medicalDataPayload.EncKey = Buffer.from(medicalData.EncKey, 'hex').toString('base64');
  medicalDataPayload.Seed = Buffer.from(medicalData.Seed, 'hex').toString('base64');
  const tx = setTx({
    nonce,
    from,
    timestamp,
    type: constants.MEDICAL_RECORD,
    payload: medicalDataPayload,
  });
  validateTx(tx);
  return tx;
};


export default {
  createTx,
};
