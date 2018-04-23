const isAddress = (pubKey) => {
  const pubKeyBuffer = Buffer.from(pubKey, 'hex');
  if (pubKeyBuffer.length !== 33) return false;
  return true;
};

export default isAddress;
