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
  const isValid = secp256k1.verify(msgHashBuffer, signatureBuffer, pubKeyBuffer);
  return isValid;
};


export default {
  recoverPubKeyFromSignature,
  sign,
  verifySignature,
};


// const priv = '6153d89dd37182dc1725c0921c7e1b4e1c5042d1c7d8eadecf5244cc187a695d';
// const pub = '020f25443254310736f402172890c3affd0102bc0675c8694d91f9d6fefeb0d9e8';
// const msgHash = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
// const msg = 'hello world';
// const sig = 'a9379a4e69780a4cf4bafe0a86689715b91c59175e6d090809'
//   + 'f46d1b5e92d9b83d470a34cfac6bf12133c615d8222a50da1122349dea4e6662c1ca7d5847f169';
