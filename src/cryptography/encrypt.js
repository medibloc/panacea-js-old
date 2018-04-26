import { createCipheriv, createDecipheriv } from 'crypto';
import { isHexadecimal } from '../util/utils';
import { hashTo32Byte } from './hash';


const encryptData = (accessKey = '', msg, algorithm = 'AES-256-CTR', iv = '6f40f39c69a0eff3a17667dffda7b4d5') => {
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
  const hashedAccessKey = hashTo32Byte(accessKey);
  const Iv = Buffer.from(iv, 'hex');

  // const cipher = createCipher(algorithm, hashedAccessKey);
  const cipher = createCipheriv(algorithm, Buffer.from(hashedAccessKey, 'hex'), Iv);
  let encryptedMsg = cipher.update(message, 'utf8', 'hex');
  encryptedMsg += cipher.final('hex');
  return encryptedMsg;
};

const decryptData = (accessKey = '', encryptedMsg, algorithm = 'AES-256-CTR', iv = '6f40f39c69a0eff3a17667dffda7b4d5') => {
  const hashedAccessKey = hashTo32Byte(accessKey);
  const Iv = Buffer.from(iv, 'hex');
  if (!isHexadecimal(encryptedMsg)) throw new Error('Message should be hexadecimal');

  // const decipher = createDecipher(algorithm, hashedAccessKey);
  const decipher = createDecipheriv(algorithm, Buffer.from(hashedAccessKey, 'hex'), Iv);
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
