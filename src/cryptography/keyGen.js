import { createECDH, pbkdf2Sync } from 'crypto';
import secp256k1 from 'secp256k1';
import unorm from 'unorm';

const concatKeys = (string1, string2) => string1.concat(string2);

const getKeyPair = () => {
  const ec = createECDH('secp256k1');
  ec.generateKeys('hex', 'compressed');
  return {
    privKey: ec.getPrivateKey('hex'),
    pubKey: ec.getPublicKey('hex', 'compressed'),
  };
};

const getPubKey = (privKey) => {
  const privKeyBuffer = Buffer.from(privKey, 'hex');
  try {
    return secp256k1.publicKeyCreate(privKeyBuffer).toString('hex');
  } catch (err) {
    throw new Error('Wrong format of private key');
  }
};

const getKeyPairFromPassphrase = (passphrase) => {
  const passphraseBuffer = Buffer.from(unorm.nfkd(passphrase), 'utf8');
  const privKey = pbkdf2Sync(passphraseBuffer, '', 262144, 32, 'sha256').toString('hex');

  return {
    privKey,
    pubKey: getPubKey(privKey),
  };
};

const getSharedSecretKey = (privKey, pubKey) => {
  const ec = createECDH('secp256k1');
  ec.generateKeys();
  ec.setPrivateKey(privKey, 'hex');
  return ec.computeSecret(pubKey, 'hex', 'hex');
};

export default {
  concatKeys,
  getKeyPair,
  getKeyPairFromPassphrase,
  getPubKey,
  getSharedSecretKey,
};
