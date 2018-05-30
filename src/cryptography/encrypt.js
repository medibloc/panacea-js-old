import { createCipheriv, createDecipheriv } from 'crypto';
import { sha3_256 as SHA3256 } from 'js-sha3';
import utils from '../utils';

const generateIv = key =>
  SHA3256.create().update(key).hex().substring(0, 32);

const encryptData = (accessKey = '', msg) => {
  // TODO => update iv to have sync with go-medibloc
  // TODO Need to get stream files also.
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

  const algorithm = 'AES-256-CTR';
  const iv = generateIv(accessKey);
  const Iv = Buffer.from(iv, 'hex');
  const hashedAccessKey = utils.sha3(accessKey);
  const cipher = createCipheriv(algorithm, Buffer.from(hashedAccessKey, 'hex'), Iv);

  return cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
};

const decryptData = (accessKey = '', encryptedMsg) => {
  const algorithm = 'AES-256-CTR';
  const iv = generateIv(accessKey);
  const Iv = Buffer.from(iv, 'hex');
  const hashedAccessKey = utils.sha3(accessKey);
  if (!utils.isHexadecimal(encryptedMsg)) {
    throw new Error('Message should be hexadecimal');
  }
  const decipher = createDecipheriv(algorithm, Buffer.from(hashedAccessKey, 'hex'), Iv);
  const decryptedMsg = decipher.update(encryptedMsg, 'hex', 'utf8');

  try {
    return decryptedMsg + decipher.final('utf8');
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
