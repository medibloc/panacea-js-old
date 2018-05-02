import { keyGen, hash, encrypt } from 'cryptography';

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

export default createDataPayload;
