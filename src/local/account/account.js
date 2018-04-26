import { keyGen, encrypt } from 'cryptography';

// generate new keypair and register
const generateAccount = (passphrase = '') => {
  const keyPair = keyGen.getKeyPair();
  return {
    privKey: encrypt.encryptData(passphrase, keyPair.privKey),
    pubKey: keyPair.pubKey,
    nonce: null,
    balance: null,
  };
};

// set encrypted private key
const setEncryptedPrivateKey = (passphrase = '', encryptedPrivKey) => {
  const privKey = encrypt.decryptData(passphrase, encryptedPrivKey);
  return {
    encryptedPrivKey,
    pubKey: keyGen.getPubKey(privKey),
    nonce: null,
    balance: null,
  };
};


export default class Account {
  constructor(passphrase, encryptedPrivKey = '') {
    let newAccount = {};
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
    const privKey = encrypt.decryptData(passphrase, this.privKey);
    return privKey;
  }

  // set nonce
  setNonce(nonce) {
    this.nonce = nonce;
    return this;
  }

  // set balance
  setBalance(balance) {
    this.balance = balance;
    return this;
  }

  // get Account information
  getAccountInfo() {
    const {
      privKey, pubKey, nonce, balance,
    } = this;
    return {
      privKey, pubKey, nonce, balance,
    };
  }
}
