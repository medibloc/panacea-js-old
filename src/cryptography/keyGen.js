import { createECDH } from 'crypto';
import secp256k1 from 'secp256k1';

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

const getSharedSecretKey = (privKey, pubKey) => {
  const ec = createECDH('secp256k1');
  ec.generateKeys();
  ec.setPrivateKey(privKey, 'hex');
  return ec.computeSecret(pubKey, 'hex', 'hex');
};

export default {
  concatKeys,
  getKeyPair,
  getPubKey,
  getSharedSecretKey,
};
