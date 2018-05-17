import { sha3_256 as SHA3256 } from 'js-sha3';

const hashData = (msg) => {
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
  return SHA3256.create().update(message).hex();
};

// const hashDataStream = () => {};
const hashTo32Byte = accessKey =>
  SHA3256.create().update(accessKey).hex();

export default {
  hashData,
  hashTo32Byte,
};
