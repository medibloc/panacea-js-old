import { keyGen, encrypt } from '../../crypto';


export default class Account {
  constructor(passphrase = '', encryptedPrivKey = '') {
    if (encryptedPrivKey === '') this.generateAccount(passphrase);
    else this.setEncryptedPrivateKey(passphrase, encryptedPrivKey);
  }

  // generate new keypair and register.
  generateAccount(passphrase = '') {
    const keyPair = keyGen.getKeyPair();
    this.privKey = encrypt.encryptData(passphrase, keyPair.privKey);
    this.pubKey = keyPair.pubKey;
  }

  // set encrypted private key
  setEncryptedPrivateKey(passphrase = '', encryptedPrivKey) {
    let pubKey = '';
    const privKey = encrypt.decryptData(passphrase, encryptedPrivKey);
    pubKey = keyGen.getPubKey(privKey);
    this.privKey = encryptedPrivKey;
    this.pubKey = pubKey;
  }

  // get decrypted private key
  getDecryptedPrivateKey(passphrase = '') {
    const privKey = encrypt.decryptData(passphrase, this.privKey);
    return privKey;
  }

  // get account information.
  getAccount() {
    const { privKey, pubKey } = this;
    return { privKey, pubKey };
  }
}
