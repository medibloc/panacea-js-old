import { encrypt, hash, keyGen } from 'cryptography';
import { checkTx, constants, setTx } from './utils';

const { REQUIRED_DATA_UPLOAD_TX_PARAMETERS } = constants;

const validateTx = tx =>
  checkTx.checkRequiredParams(tx, REQUIRED_DATA_UPLOAD_TX_PARAMETERS);

const createTx = (from, medicalData, nonce, timestamp) => {
  const medicalDataPayload = {
    Hash: Array.from(Buffer.from(medicalData.Hash, 'hex')),
    Storage: medicalData.Storage,
    EncKey: Buffer.from(medicalData.EncKey, 'hex').toString('base64'),
    Seed: Buffer.from(medicalData.Seed, 'hex').toString('base64'),
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

const createDataPayload = ({
  data,
  ownerAccount,
  passphrase,
  storage,
  writerPubKey,
}) => {
  const encryptKey = keyGen.getRandomSeed();
  const encryptedDataHash = hash.hashData(encrypt.encryptData(encryptKey, data));
  const privKey = ownerAccount.getDecryptedPrivateKey(passphrase);
  const sharedSecretKey = keyGen.getSharedSecretKey(privKey, writerPubKey);
  const randomSeed = keyGen.getRandomSeed();
  const hashedSharedSecretKey =
    hash.hashData(keyGen.concatKeys(sharedSecretKey, randomSeed));
  const encryptedSecretKey = encrypt.encryptData(hashedSharedSecretKey, encryptKey);

  return {
    Hash: encryptedDataHash,
    Storage: storage,
    EncKey: encryptedSecretKey,
    Seed: randomSeed,
  };
};

export default {
  createDataPayload,
  createTx,
};
