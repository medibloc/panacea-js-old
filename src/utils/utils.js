import { randomBytes } from 'crypto';

const isAddress = (pubKey) => {
  try {
    return (Buffer.from(pubKey, 'hex').length === 33);
  } catch (err) {
    return false;
  }
};

const isHexadecimal = str => /^[0-9a-fA-F]+$/.test(str);

const padLeftWithZero = (str, len) => new Array((len > str.length) ? (len - str.length) + 1 : 0).join('0') + str;

const genHexBuf = (str, bytesLen) => Buffer.from(padLeftWithZero(str, bytesLen * 2), 'hex');

const randomHex = (length = 16) => randomBytes(length).toString('hex');

export default {
  genHexBuf,
  isAddress,
  isHexadecimal,
  padLeftWithZero,
  randomHex,
};
