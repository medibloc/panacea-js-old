import secp256k1 from 'secp256k1';

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

export default {
	sign,
	verifySignature,
};
