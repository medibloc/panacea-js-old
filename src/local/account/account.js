import { encrypt, keyGen, sign } from 'cryptography';

// generate new keypair and register
const generateAccount = (passphrase = '') => {
  const { privKey, pubKey } = keyGen.getKeyPair();

  return {
    encryptedPrivKey: encrypt.encryptData(passphrase, privKey),
    pubKey,
  };
};

// set encrypted private key
const setEncryptedPrivateKey = (passphrase = '', encryptedPrivKey) => {
  const privKey = encrypt.decryptData(passphrase, encryptedPrivKey);

  return {
    encryptedPrivKey,
    pubKey: keyGen.getPubKey(privKey),
  };
};

export default class Account {
  constructor(passphrase, encryptedPrivKey = '') {
    let newAccount;
    if (encryptedPrivKey === '') {
      newAccount = generateAccount(passphrase);
    } else {
      newAccount = setEncryptedPrivateKey(passphrase, encryptedPrivKey);
    }
    Object.keys(newAccount).forEach((key) => {
      this[key] = newAccount[key];
    });
  }

  // get decrypted private key
  getDecryptedPrivateKey(passphrase = '') {
    return encrypt.decryptData(passphrase, this.encryptedPrivKey);
  }

  signTx(tx, passphrase = '') {
    const privKey = this.getDecryptedPrivateKey(passphrase);
    tx.sign = sign.sign(privKey, tx.hash); // eslint-disable-line
  }
}
