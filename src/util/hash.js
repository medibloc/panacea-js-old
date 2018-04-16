import { createHash } from 'crypto';

export const hashData = (msg, algorithm = 'sha256') => {
	const hash = createHash(algorithm);
	hash.update(msg);
	const hashedData = hash.digest('hex');
	return hashedData;
};


export const hashDataStream = () => {};
