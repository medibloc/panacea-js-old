import { keyGen, encrypt, hash } from 'cryptography';
import { checkTx, setTx } from './utils';


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
    type: 'add_record',
    payload: medicalDataPayload,
  });
  checkTx(tx, ownerAccount);
  return tx;
};


const createDataPayload = (
  ({
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
  }
);


export default {
  createTx,
  createDataPayload,
};
