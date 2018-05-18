const isAddress = pubKey =>
  (Buffer.from(pubKey, 'hex').length === 33);

const isHexadecimal = str => /^[0-9a-fA-F]+$/.test(str);

export default {
  isAddress,
  isHexadecimal,
};
