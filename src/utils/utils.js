import { randomBytes } from 'crypto';

const isAddress = pubKey =>
  (Buffer.from(pubKey, 'hex').length === 33);

const isHexadecimal = str => /^[0-9a-fA-F]+$/.test(str);

const randomHex = (length = 16) => randomBytes(length).toString('hex');

export default {
  isAddress,
  isHexadecimal,
  randomHex,
};
