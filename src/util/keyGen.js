import { createECDH, createCipher, createDecipher, createHash } from 'crypto';
import secp256k1 from 'secp256k1';
import KeyEncoder from 'key-encoder';


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
	const pubKeyBuffer = secp256k1.publicKeyCreate(privKeyBuffer);
	const pubKey = pubKeyBuffer.toString('hex');
	return pubKey;
};


const sign = (privKey, msgHash) => {
	const msgHashBuffer = Buffer.from(msgHash, 'hex');
	const privKeyBuffer = Buffer.from(privKey, 'hex');
	const signature = secp256k1.sign(msgHashBuffer, privKeyBuffer);
	return signature.signature.toString('hex');
};


const verifySignature = (pubKey, msgHash, signature) => {
	const msgHashBuffer = Buffer.from(msgHash, 'hex');
	const pubKeyBuffer = Buffer.from(pubKey, 'hex');
	const signatureBuffer = Buffer.from(signature, 'hex');
	const isValid = secp256k1.verify(msgHashBuffer, signatureBuffer, pubKeyBuffer);
	return isValid;
};


const privStringToPEMFormat = (keyString) => {
	// Check privkeystring is 'hex' type
	const keyEncoder = new KeyEncoder('secp256k1');
	const PEMKey = keyEncoder.encodePrivate(keyString, 'raw', 'pem');
	return PEMKey;
};

const pubStringToPEMFormat = (keyString) => {
	// Check privkeystring is 'hex' type
	const keyEncoder = new KeyEncoder('secp256k1');
	const PEMKey = keyEncoder.encodePublic(keyString, 'raw', 'pem');
	return PEMKey;
};

const encryptData = (accessKey, msg, algorithm = 'aes192') => {
	// TODO Need to get stream files also.
	const cipher = createCipher(algorithm, accessKey);
	let encryptedMsg = cipher.update(msg, 'utf8', 'hex');
	encryptedMsg += cipher.final('hex');
	return encryptedMsg;
};

const decryptData = (accessKey, encryptedMsg, algorithm = 'aes192') => {
	const decipher = createDecipher(algorithm, accessKey);
	let decryptedMsg = decipher.update(encryptedMsg, 'hex', 'utf8');
	decryptedMsg += decipher.final('utf8');
	return decryptedMsg;
};

const encryptDataStream = () => {}
const decryptDataStream = () => {}

const hashData = (msg, algorithm = 'sha256') => {
	const hash = createHash(algorithm);
	hash.update(msg);
	const hashedData = hash.digest('hex');
	return hashedData;
};

const hashDataStream = () => {}

let privKey = 'bbcca3e878fc800a3edafa711404a09c537cee6a98e0ef147cbf80d874dd5316';
let pubKey = '028849d6256b24a4b525bc6c0f8c15c04822caddff3cce6977acda86310c0e1387';

console.log(hasher('helloworld'))
// console.log(encryptData('ggomma', 'helloWorld'))
// console.log(decryptData('ggomma', '6a7dda35563f30ee2bdac2d22fa5528c'))
// console.log(sign(privKey, 'a78032652a5e54a353b3ae604863546d972ae2a5ac8c1bb0f2e473b1120a9b20'))
// console.log(verifySignature(pubKey, 'a78032652a5e54a353b3ae604863546d972ae2a5ac8c1bb0f2e473b1120a9b20', '559ccf741b6e7639c91949f0bdab47d2cca16501def8ebfb6521c2a1e5bf52c300309f16384f6b44671876e1c6828f3b3a6829f9448f9fe8d66bd7c96667948d'));





// export const encrypt = (publicKey, message, setvPrivateKey, vBytes = 32, curveType = 'secp256k1') => {

//   const {privateKey:vPrivateKey, publicKey: vPublicKey} = getKeyPair(setvPrivateKey, vBytes, curveType);
//   const vEc = crypto.createECDH(curveType);
//   vEc.setPrivateKey(vPrivateKey);

//   console.log(vEc.getPrivateKey());
//   console.log(vEc.getPublicKey());

//   const secret = vEc.computeSecret(publicKey);
//   const encryptionKey = hash(secret);

//   const encryptedMessage = aesEncryptData(message, encryptionKey);
//   console.log("Encrypted Message:", encryptedMessage);
//   return {
//     encryptedMessage,
//     key: {vPublicKey, encryptionKey},
//   };
// };

// export const decrypt = (privateKey, {encryptedMessage, key}, curveType = 'secp256k1') => {
//   const vEc = crypto.createECDH(curveType);
//   vEc.setPrivateKey(privateKey);
//   const secret = vEc.computeSecret(key.vPublicKey);
//   const encryptionKey = hash(secret);

//   const decrytedMessage = aesDecryptData(encryptedMessage, encryptionKey);
//   console.log(decrytedMessage);

//   return decrytedMessage

// };

