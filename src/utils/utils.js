const isHexadecimal = (string) => {
  const regexp = /^[0-9a-fA-F]+$/;
  if (regexp.test(string)) return true;
  return false;
};

const isAddress = (pubKey) => {
  const pubKeyBuffer = Buffer.from(pubKey, 'hex');
  if (pubKeyBuffer.length !== 33) return false;
  return true;
};

export default {
  isHexadecimal,
  isAddress,
};
