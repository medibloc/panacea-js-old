import { createHash } from 'crypto';

const hashData = (msg, algorithm = 'sha256') => {
  const hash = createHash(algorithm);
  hash.update(msg);
  const hashedData = hash.digest('hex');
  return hashedData;
};

const hashAccessKey = (accessKey, algorithm = 'sha256') => {
  const hash = createHash(algorithm);
  hash.update(accessKey);
  const hashedKey = hash.digest('hex');
  return hashedKey.slice(0, 16);
};

// const hashDataStream = () => {};

export default {
  hashData,
  hashAccessKey,
};
