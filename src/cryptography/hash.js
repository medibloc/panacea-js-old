import { createHash } from 'crypto';

const hashData = (msg, algorithm = 'sha256') => {
  let message = '';
  switch (typeof msg) {
    case 'string':
      message = msg;
      break;
    case 'object':
    case 'number':
      message = msg.toString();
      break;
    default:
      throw new Error('Invalid msg type');
  }
  const hash = createHash(algorithm);
  return hash.update(message).digest('hex');
};

const hashJson = (jsonMsg, algorithm = 'sha256') => {
  if (typeof jsonMsg !== 'object') throw new Error('Wrong format');
  const message = JSON.stringify(jsonMsg);
  const hash = createHash(algorithm);
  return hash.update(message).digest('hex');
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
  hashJson,
};
