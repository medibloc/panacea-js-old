import { createHash } from 'crypto';

const hashData = (msg, algorithm = 'sha256') => {
	const hash = createHash(algorithm);
	hash.update(msg);
	const hashedData = hash.digest('hex');
	return hashedData;
};


// const hashDataStream = () => {};

export default {
	hashData,
};
