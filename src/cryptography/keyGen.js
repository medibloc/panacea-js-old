import { createECDH, randomBytes } from 'crypto';
import secp256k1 from 'secp256k1';

const getKeyPair = () => {
  const ec = createECDH('secp256k1');
  ec.generateKeys('', 'compressed');
  const privKeyBuffer = ec.getPrivateKey(null, 'compressed');
  const pubKeyBuffer = ec.getPublicKey(null, 'compressed');

  return {
    privKey: privKeyBuffer.toString('hex'),
    pubKey: pubKeyBuffer.toString('hex'),
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

const getRandomSeed = (length = 16) => randomBytes(length).toString('hex');

const concatKeys = (string1, string2) => string1.concat(string2);

export default {
  concatKeys,
  getKeyPair,
  getPubKey,
  getRandomSeed,
  getSharedSecretKey,
};
