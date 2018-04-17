import { createCipher, createDecipher } from 'crypto';


const encryptData = (accessKey, msg, algorithm = 'AES-128-CTR') => {
  // TODO Need to get stream files also.
  const cipher = createCipher(algorithm, accessKey);
  let encryptedMsg = cipher.update(msg, 'utf8', 'hex');
  encryptedMsg += cipher.final('hex');
  return encryptedMsg;
};

const decryptData = (accessKey, encryptedMsg, algorithm = 'AES-128-CTR') => {
  const decipher = createDecipher(algorithm, accessKey);
  let decryptedMsg = decipher.update(encryptedMsg, 'hex', 'utf8');
  try {
    decryptedMsg += decipher.final('utf8');
  } catch (err) {
    return new Error('Wrong Access Key');
  }
  return decryptedMsg;
};


// export const encryptDataStream = () => {};
// export const decryptDataStream = () => {};

export default {
  encryptData,
  decryptData,
};
