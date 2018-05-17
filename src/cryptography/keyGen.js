import { createECDH, randomBytes } from 'crypto';
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

const getSharedSecretKey = (privKey, pubKey) => {
  const ec = createECDH('secp256k1');
  // To prevent error in browser javascript
  ec.generateKeys();

  ec.setPrivateKey(privKey, 'hex');
  const secretKey = ec.computeSecret(pubKey, 'hex', 'hex');
  return secretKey;
};

const getRandomSeed = (length = 16) => randomBytes(length).toString('hex');

const concatKeys = (string1, string2) => string1.concat(string2);

// const concatKeys = (string1, strign2) => {
//   const secretBuffer = Buffer.from(sharedSecretKey, 'hex');
//   const randomSeedBuffer = Buffer.from(randomSeed, 'hex');
//   return Buffer.concat([secretBuffer, randomSeedBuffer]).toString('hex');
// };

export default {
  getKeyPair,
  getPubKey,
  getSharedSecretKey,
  getRandomSeed,
  concatKeys,
};

// const keyPair1 = {
//   privKey: '8fb8da1e54b520db2456e2d061fbcf55bca617c0f3a3fadb7c5352c25fb842',
//   pubKey: '034f37de2ad548d69cddcaa5277a24ed5698471a454f30d902130597ecf10e277b'
// };
// const keyPair2 = {
//   privKey: '6153d89dd37182dc1725c0921c7e1b4e1c5042d1c7d8eadecf5244cc187a695d',
//   pubKey: '020f25443254310736f402172890c3affd0102bc0675c8694d91f9d6fefeb0d9e8'
// };


// const a = Buffer.from(getSharedSecretKey(keyPair2.privKey, keyPair1.pubKey), 'hex');
// const b = getRandomSeed();
// console.log(a)
// console.log(b)
// console.log(Buffer.concat([a,b]))


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
