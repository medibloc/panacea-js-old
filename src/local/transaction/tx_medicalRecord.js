import { keyGen, encrypt, hash } from 'cryptography';
import { checkTx, setTx } from './utils';
import { REQUIRED_MEDICAL_RECORD_TX_PARAMETERS } from './types';


const validateTx = (tx, ownerAccount) => {
  checkTx.checkRequiredParams(tx, REQUIRED_MEDICAL_RECORD_TX_PARAMETERS);
  checkTx.checkNonce(tx, ownerAccount);
  return true;
};


const createTx = (ownerAccount, writerSignature, medicalData) => {
  let tx = {
    type: 'dataUpload',
    data: {
      payload: medicalData,
    },
  };
  tx = setTx.setCommon(tx, ownerAccount);
  tx = setTx.setSignature(tx, writerSignature);
  validateTx(tx, ownerAccount);
  return tx;
};


const createMedicalData = (
  ({
    encryptedDataHash,
    encryptKey,
    storage,
    ownerAccount,
    passphrase,
    writerPubKey,
  }) => {
    const privKey = ownerAccount.getDecryptedPrivateKey(passphrase);
    const sharedSecretKey = keyGen.getSharedSecretKey(privKey, writerPubKey);
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
