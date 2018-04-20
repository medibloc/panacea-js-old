import { createCipheriv, createDecipheriv } from 'crypto';
import { isHexadecimal } from '../util/utils';
import { hashAccessKey } from './hash';


const encryptData = (accessKey = '', msg, algorithm = 'AES-128-CTR', iv = '6f40f39c69a0eff3a17667dffda7b4d5') => {
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
  const hashedAccessKey = hashAccessKey(accessKey);
  const Iv = Buffer.from(iv, 'hex');
  const cipher = createCipheriv(algorithm, hashedAccessKey, Iv);
  let encryptedMsg = cipher.update(message, 'utf8', 'hex');
  encryptedMsg += cipher.final('hex');
  return encryptedMsg;
};

const decryptData = (accessKey = '', encryptedMsg, algorithm = 'AES-128-CTR', iv = '6f40f39c69a0eff3a17667dffda7b4d5') => {
  const hashedAccessKey = hashAccessKey(accessKey);
  const Iv = Buffer.from(iv, 'hex');
  if (!isHexadecimal(encryptedMsg)) throw new Error('Message should be hexadecimal');
  const decipher = createDecipheriv(algorithm, hashedAccessKey, Iv);
  let decryptedMsg = decipher.update(encryptedMsg, 'hex', 'utf8');
  try {
    decryptedMsg += decipher.final('utf8');
  } catch (err) {
    throw new Error('Wrong Access Key');
  }
  return decryptedMsg;
};


// export const encryptDataStream = () => {};
// export const decryptDataStream = () => {};

export default {
  encryptData,
  decryptData,
};
