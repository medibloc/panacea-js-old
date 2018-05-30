import { sha3_256 as SHA3256 } from 'js-sha3';

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

const hashDataStream = async stream => new Promise((resolve) => {
  const hash = SHA3256.create();
  stream.on('data', (data) => {
    hash.update(data);
  });
  stream.on('end', () => {
    resolve(hash.hex());
  });
});

export default {
  hashData,
  hashDataStream,
};
