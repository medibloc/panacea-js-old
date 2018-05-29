import { sha3_256 as SHA3256 } from 'js-sha3';

const createHash = () => SHA3256.create();

const hashData = (msg) => {
  let message = '';
  switch (typeof msg) {
    case 'string':
      message = msg;
      break;
    case 'object':
      if (msg instanceof Uint8Array) {
        message = msg;
      } else {
        message = msg.toString();
      }
      break;
    case 'number':
      message = msg.toString();
      break;
    case 'Uint8Array':
      message = msg;
      break;
    default:
      throw new Error('Invalid msg type');
  }
  return SHA3256.create().update(message).hex();
};

// const hashDataStream = () => {};
const hashTo32Byte = accessKey =>
  SHA3256.create().update(accessKey).hex();

export default {
  createHash,
  hashData,
  hashTo32Byte,
};
