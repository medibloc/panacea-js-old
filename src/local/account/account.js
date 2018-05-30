import {
  encryptData,
  decryptData,
  getKeyPair,
  getPubKey,
  sign,
} from 'cryptography';
import { createCertificate } from 'identification/certificate';

// generate new keypair and register
const generateAccount = (passphrase = '') => {
  const { privKey, pubKey } = getKeyPair();

  return {
    encryptedPrivKey: encryptData(passphrase, privKey),
    pubKey,
  };
};

// set encrypted private key
const setEncryptedPrivateKey = (passphrase = '', encryptedPrivKey) => {
  const privKey = decryptData(passphrase, encryptedPrivKey);

  return {
    encryptedPrivKey,
    pubKey: getPubKey(privKey),
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
    return decryptData(passphrase, this.encryptedPrivKey);
  }

  signTx(tx, passphrase = '') {
    const privKey = this.getDecryptedPrivateKey(passphrase);
    tx.sign = sign(privKey, tx.hash); // eslint-disable-line
  }

  signDataPayload(data, passphrase = '') {
    const privKey = this.getDecryptedPrivateKey(passphrase);
    data.sign = sign(privKey, data.hash); // eslint-disable-line
    data.cert = this.cert; // eslint-disable-line
  }

  createCertificate({
    expireDate,
    issuer,
    issueDate,
    passphrase = '',
  }) {
    this.cert = createCertificate({
      expireDate,
      issuer,
      issuerAccount: this,
      issueDate,
      passphrase,
      pubKey: this.pubKey,
    });
  }
}
