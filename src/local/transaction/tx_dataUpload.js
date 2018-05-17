import { keyGen, hash, encrypt } from 'cryptography';
import { checkTx, setTx, constants } from './utils';
import { REQUIRED_DATA_UPLOAD_TX_PARAMETERS } from './utils/constants';


const validateTx = (tx) => {
  checkTx.checkRequiredParams(tx, REQUIRED_DATA_UPLOAD_TX_PARAMETERS);
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
    type: constants.DATA_UPLOAD,
    payload: medicalDataPayload,
  });
  validateTx(tx);
  return tx;
};

const createDataPayload = ({
  data,
  storage,
  ownerAccount,
  passphrase,
  writerPubKey,
}) => {
  const encryptKey = keyGen.getRandomSeed();
  const encryptedDataHash = hash.hashData(encrypt.encryptData(encryptKey, data));
  const privKey = ownerAccount.getDecryptedPrivateKey(passphrase);
  const sharedSecretKey = keyGen.getSharedSecretKey(privKey, writerPubKey);
  const randomSeed = keyGen.getRandomSeed();
  const hashedSharedSecretKey =
    hash.hashTo32Byte(keyGen.concatKeys(sharedSecretKey, randomSeed));
  const encryptedSecretKey = encrypt.encryptData(hashedSharedSecretKey, encryptKey);

  return {
    Hash: encryptedDataHash,
    Storage: storage,
    EncKey: encryptedSecretKey,
    Seed: randomSeed,
  };
};


export default {
  createTx,
  createDataPayload,
};
