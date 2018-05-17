const isAddress = (pubKey) => {
  const pubKeyBuffer = Buffer.from(pubKey, 'hex');
  if (pubKeyBuffer.length !== 33) return false;
  return true;
};

const isHexadecimal = (string) => {
  const regexp = /^[0-9a-fA-F]+$/;
  if (regexp.test(string)) return true;
  return false;
};

export default {
  isAddress,
  isHexadecimal,
};
