import { checkTx, setTx, constants } from './utils';
import { REQUIRED_MEDICAL_RECORD_TX_PARAMETERS } from './utils/constants';


const validateTx = (tx, account) => {
  checkTx.checkRequiredParams(tx, REQUIRED_MEDICAL_RECORD_TX_PARAMETERS);
  checkTx.checkNonce(tx, account);
};


const createTx = (ownerAccount, medicalData) => {
  const medicalDataPayload = medicalData;
  const dataPayloadHash = [];
  Buffer.from(medicalDataPayload.Hash, 'hex').forEach(byte => dataPayloadHash.push(byte));
  medicalDataPayload.Hash = dataPayloadHash;
  medicalDataPayload.EncKey = Buffer.from(medicalDataPayload.EncKey, 'hex').toString('base64');
  medicalDataPayload.Seed = Buffer.from(medicalDataPayload.Seed, 'hex').toString('base64');
  const tx = setTx({
    ownerAccount,
    type: constants.MEDICAL_RECORD,
    payload: medicalDataPayload,
  });
  validateTx(tx, ownerAccount);
  return tx;
};

export default {
  createTx,
};
