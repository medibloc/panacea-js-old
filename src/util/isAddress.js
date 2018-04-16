export const isAddress = (pubKey) => {
	const pubKeyBuffer = Buffer.from(pubKey, 'hex');
	if (pubKeyBuffer.length !== 33) {
		throw new Error('Invalid public key');
	}
	return true;
};
