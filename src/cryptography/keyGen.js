import { createECDH } from 'crypto';

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
  const ec = createECDH('secp256k1');
  try {
    ec.setPrivateKey(privKey, 'hex');
  } catch (err) {
    throw new Error('Wrong format of private key');
  }
  return ec.getPublicKey('hex', 'compressed');
};

const getSharedSecretKey = (privKey, pubKey) => {
  const ec = createECDH('secp256k1');
  ec.setPrivateKey(privKey, 'hex');
  return ec.computeSecret(pubKey, 'hex', 'hex');
};

export default {
  concatKeys,
  getKeyPair,
  getPubKey,
  getSharedSecretKey,
};
