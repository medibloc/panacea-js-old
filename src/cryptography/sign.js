import secp256k1 from 'secp256k1';

const recoverPubKeyFromSignature = (msgHash, signature) => {
  const recovery = parseInt(signature.slice(-2), 16);
  const msgHashBuffer = Buffer.from(msgHash, 'hex');
  const sigBuffer = Buffer.from(signature.slice(0, -2), 'hex');

  return secp256k1.recover(msgHashBuffer, sigBuffer, recovery).toString('hex');
};

const sign = (privKey, msgHash) => {
  const msgHashBuffer = Buffer.from(msgHash, 'hex');
  const privKeyBuffer = Buffer.from(privKey, 'hex');
  const signature = secp256k1.sign(msgHashBuffer, privKeyBuffer);
  const recoveryCode = Buffer.alloc(1);
  recoveryCode.writeIntBE(signature.recovery, 0, 1);

  return signature.signature.toString('hex') + recoveryCode.toString('hex');
};

const verifySignature = (pubKey, msgHash, signature) => {
  const msgHashBuffer = Buffer.from(msgHash, 'hex');
  const pubKeyBuffer = Buffer.from(pubKey, 'hex');
  const signatureBuffer = Buffer.from(signature.slice(0, -2), 'hex');

  return secp256k1.verify(msgHashBuffer, signatureBuffer, pubKeyBuffer);
};

export default {
  recoverPubKeyFromSignature,
  sign,
  verifySignature,
};
