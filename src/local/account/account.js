import { sha3_256 as SHA3256 } from 'js-sha3';
import {
  decryptKey,
  encryptKey,
  getKeyPair,
  getPubKey,
  sign,
} from 'cryptography';
import { createCertificate } from 'identification';
import { isAddress } from 'utils';

// generate new keypair and register
const generateAccount = (passphrase = '') => {
  const { privKey, pubKey } = getKeyPair();

  return {
    encryptedPrivKey: encryptKey(passphrase, privKey),
    pubKey,
  };
};

// set encrypted private key
const setEncryptedPrivateKey = (passphrase = '', encryptedPrivKey, pubKey) => ({
  encryptedPrivKey,
  pubKey: isAddress(pubKey) ? pubKey : getPubKey(decryptKey(passphrase, encryptedPrivKey)),
});

export default class Account {
  constructor(passphrase, encryptedPrivKey = '', pubKey) {
    let newAccount;
    if (encryptedPrivKey === '') {
      newAccount = generateAccount(passphrase);
    } else {
      newAccount = setEncryptedPrivateKey(passphrase, encryptedPrivKey, pubKey);
    }
    Object.keys(newAccount).forEach((key) => {
      this[key] = newAccount[key];
    });
  }

  // get decrypted private key
  getDecryptedPrivateKey(passphrase = '') {
    return decryptKey(passphrase, this.encryptedPrivKey);
  }

  signTx(tx, passphrase = '') {
    const privKey = this.getDecryptedPrivateKey(passphrase);
    tx.sign = sign(privKey, tx.hash); // eslint-disable-line
  }

  signTxAsPayer(tx, passphrase = '') {
    const privKey = this.getDecryptedPrivateKey(passphrase);
    const hash = SHA3256.create();
    hash.update(Buffer.from(tx.hash, 'hex'));
    hash.update(Buffer.from(tx.sign, 'hex'));
    // eslint-disable-next-line no-param-reassign
    tx.payerSign = sign(privKey, hash.hex());
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
