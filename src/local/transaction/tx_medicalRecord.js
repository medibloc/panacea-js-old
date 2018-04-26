import { checkTx, setTx, constants } from './utils';


const createTx = (ownerAccount, medicalData) => {
  const medicalDataPayload = medicalData;

  // Only for test
  medicalDataPayload.Hash = '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e';
  medicalDataPayload.EncKey = 'abcdef';
  medicalDataPayload.Seed = '5eed';

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
  checkTx(constants.MEDICAL_RECORD, tx, ownerAccount);
  return tx;
};

export default {
  createTx,
};
