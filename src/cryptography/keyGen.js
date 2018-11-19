import { createECDH, pbkdf2Sync, randomBytes } from 'crypto';
import { sha3_256 as SHA3256 } from 'js-sha3';
import secp256k1 from 'secp256k1';
import unorm from 'unorm';

const concatKeys = (string1, string2) => string1.concat(string2);

const getKeyPair = () => {
  let privKey = '';
  let check = false;
  while (check === false) {
    privKey = SHA3256(randomBytes(32) + randomBytes(32));
    check = secp256k1.privateKeyVerify(Buffer.from(privKey, 'hex'));
  }

  const ec = createECDH('secp256k1');
  ec.setPrivateKey(privKey, 'hex');

  return {
    privKey,
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
  const privKey = pbkdf2Sync(passphraseBuffer, 'medibloc', 32768, 32, 'sha512').toString('hex');

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
