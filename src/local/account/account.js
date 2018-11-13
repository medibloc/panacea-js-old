import { sha3_256 as SHA3256 } from 'js-sha3';
import {
  decryptKey,
  encryptKey,
  getKeyPair,
  getPubKey,
  sign,
} from 'cryptography';
import { createCertificate } from 'identification';
import protobuf from 'protobufjs/light';
import { isAddress, genHexBuf } from 'utils';
import * as jsonDescriptor from '../transaction/utils/proto/transaction.pb.json';
import { BYTESIZES } from '../../healthData/constants';

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
    if (tx.hash.length === BYTESIZES.HASH || tx.sign.length === 0) {
      throw new Error('Valid transaction hash and signature are required');
    }
    const privKey = this.getDecryptedPrivateKey(passphrase);

    const txPayerSignTarget = {
      hash: genHexBuf(tx.hash, BYTESIZES.HASH),
      sign: Buffer.from(tx.sign, 'hex'),
    };
    const root = protobuf.Root.fromJSON(jsonDescriptor);
    const TxPayerSignTarget = root.lookupType('TransactionPayerSignTarget');
    const errMsg = TxPayerSignTarget.verify(txPayerSignTarget);
    if (errMsg) throw Error(errMsg);
    const message = TxPayerSignTarget.create(txPayerSignTarget);
    const buf = TxPayerSignTarget.encode(message).finish();

    // eslint-disable-next-line no-param-reassign
    tx.payerSign = sign(privKey, SHA3256.create().update(buf).hex());
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
