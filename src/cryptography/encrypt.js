import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import utils from '../utils';

const encryptData = (accessKey = '', data) => {
  // TODO Need to get stream files also.
  let message = '';
  switch (typeof data) {
    case 'string':
      message = data;
      break;
    case 'object':
    case 'number':
      message = data.toString();
      break;
    default:
      throw new Error('Invalid msg type');
  }

  const algorithm = 'AES-256-CTR';
  const iv = randomBytes(16);
  const hashedAccessKey = utils.sha3(accessKey);

  const cipher = createCipheriv(algorithm, Buffer.from(hashedAccessKey, 'hex'), iv);
  const encryptedText = `${cipher.update(message, 'utf8', 'hex')}${cipher.final('hex')}`;
  return `${iv.toString('hex')}:${encryptedText}`;
};

const decryptData = (accessKey = '', encryptedData) => {
  if (!encryptedData) {
    return null;
  }
  const algorithm = 'AES-256-CTR';
  const textParts = encryptedData.split(':');
  if (textParts.length < 2) {
    throw new Error('Invalid encrypted data format');
  }
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const hashedAccessKey = utils.sha3(accessKey);

  const decipher = createDecipheriv(algorithm, Buffer.from(hashedAccessKey, 'hex'), iv);
  const decryptedData = decipher.update(encryptedText, 'hex', 'utf8');

  try {
    return decryptedData + decipher.final('utf8');
  } catch (err) {
    throw new Error('Wrong Access Key');
  }
};

// TODO
// export const encryptDataStream = () => {};

// TODO
// export const decryptDataStream = () => {};

export default {
  decryptData,
  encryptData,
};
