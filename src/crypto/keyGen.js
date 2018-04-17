import { createECDH } from 'crypto';
import secp256k1 from 'secp256k1';


const getKeyPair = () => {
  const ec = createECDH('secp256k1');
  ec.generateKeys('', 'compressed');
  const privKeyBuffer = ec.getPrivateKey(null, 'compressed');
  const pubKeyBuffer = ec.getPublicKey(null, 'compressed');
  const privKey = privKeyBuffer.toString('hex');
  const pubKey = pubKeyBuffer.toString('hex');
  return { privKey, pubKey };
};


const getPubKey = (privKey) => {
  const privKeyBuffer = Buffer.from(privKey, 'hex');
  let pubKeyBuffer = null;
  try {
    pubKeyBuffer = secp256k1.publicKeyCreate(privKeyBuffer);
  } catch (err) {
    throw new Error('Wrong format of private key');
  }
  const pubKey = pubKeyBuffer.toString('hex');
  return pubKey;
};


export default {
  getKeyPair,
  getPubKey,
};

// const privStringToPEMFormat = (keyString) => {
//   // Check privkeystring is 'hex' type
//   const keyEncoder = new KeyEncoder('secp256k1');
//   const PEMKey = keyEncoder.encodePrivate(keyString, 'raw', 'pem');
//   return PEMKey;
// };

// const pubStringToPEMFormat = (keyString) => {
//   // Check privkeystring is 'hex' type
//   const keyEncoder = new KeyEncoder('secp256k1');
//   const PEMKey = keyEncoder.encodePublic(keyString, 'raw', 'pem');
//   return PEMKey;
// };
