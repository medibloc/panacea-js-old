import { keyGen, encrypt, hash } from 'cryptography';
import { checkTx, setTx } from './utils';
import { REQUIRED_MEDICAL_RECORD_TX_PARAMETERS } from './types';


const validateTx = (tx, userAccount) => {
  checkTx.checkRequiredParams(tx, REQUIRED_MEDICAL_RECORD_TX_PARAMETERS);
  checkTx.checkNonce(tx, userAccount);
  return true;
};


const createTx = (userAccount, doctorSignature, medicalData) => {
  let tx = {
    type: 'dataUpload',
    data: {
      payload: medicalData,
    },
  };
  tx = setTx.setCommon(tx, userAccount);
  tx = setTx.setSignature(tx, doctorSignature);
  validateTx(tx, userAccount);
  return tx;
};


const createMedicalData = (
  (encryptedDataHash, encryptKey, storage, userAccount, passphrase, doctorPubKey) => {
    const privKey = userAccount.getDecryptedPrivateKey(passphrase);
    const sharedSecretKey = keyGen.getSharedSecretKey(privKey, doctorPubKey);
    const randomSeed = keyGen.getRandomSeed();
    const encryptKey2 = hash.hashAccessKey(keyGen.concatKeys(sharedSecretKey, randomSeed));
    const encryptedSecretKey = encrypt.encryptData(encryptKey2, encryptKey);

    return {
      encryptedDataHash,
      storage,
      encryptedSecretKey,
      seed: randomSeed,
    };
  }
);


export default {
  createTx,
  createMedicalData,
};
