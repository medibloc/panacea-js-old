import { sign } from 'cryptography';
import { getTxHash } from './getTxHash';

/*
  argument tx is expected to fit to the following format.

  tx = {
    nonce: ,
    sender: ,
    receiver: ,
    ...
  }
*/
const signRawTx = (tx, passphrase) => {
  const privKey = tx.sender.getDecryptedPrivateKey(passphrase);
  const txWithSenderPubkey = tx;
  txWithSenderPubkey.sender = tx.sender.pubKey;
  const txHash = getTxHash(tx);
  return sign.sign(privKey, txHash);
};

const signHashedTx = (txHash, userAccount, passphrase) => {
  const privKey = userAccount.getDecryptedPrivateKey(passphrase);
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
