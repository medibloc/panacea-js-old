import { keyGen, encrypt } from 'cryptography';

// generate new keypair and register
const generateAccount = (passphrase = '') => {
  const keyPair = keyGen.getKeyPair();
  return {
    privKey: encrypt.encryptData(passphrase, keyPair.privKey),
    pubKey: keyPair.pubKey,
  };
};

// set encrypted private key
const setEncryptedPrivateKey = (passphrase = '', encryptedPrivKey) => {
  const privKey = encrypt.decryptData(passphrase, encryptedPrivKey);
  return {
    privKey,
    pubKey: keyGen.getPubKey(privKey),
  };
};


export default class Account {
  constructor(passphrase = '', encryptedPrivKey = '') {
    if (encryptedPrivKey === '') {
      const { privKey, pubKey } = generateAccount(passphrase);
      this.privKey = privKey;
      this.pubKey = pubKey;
    } else {
      const { privKey, pubKey } = setEncryptedPrivateKey(passphrase, encryptedPrivKey);
      this.privKey = privKey;
      this.pubKey = pubKey;
    }
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
