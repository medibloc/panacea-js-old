import { sign } from 'cryptography';
import { hashTx } from './hashTx';


const signRawTx = (tx, passphrase) => {
  const privKey = tx.sender.getDecryptedPrivateKey(passphrase);
  const txWithSenderPubkey = tx;
  txWithSenderPubkey.sender = tx.sender.pubKey;
  const txHash = hashTx(tx);
  return sign.sign(privKey, txHash);
};

const signHashedTx = (txHash, ownerAccount, passphrase) => {
  const privKey = ownerAccount.getDecryptedPrivateKey(passphrase);
  return sign.sign(privKey, txHash);
};


const verifySignature = (pubKey, txHash, signature) => (
  sign.verifySignature(pubKey, txHash, signature)
);


export default {
  signRawTx,
  verifySignature,
  signHashedTx,
};
