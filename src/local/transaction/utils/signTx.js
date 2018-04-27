import { sign } from 'cryptography';
import { hashTx } from './hashTx';


const signRawTx = (tx, passphrase) => {
  const privKey = tx.sender.getDecryptedPrivateKey(passphrase);
  const txWithSenderPubkey = tx;
  txWithSenderPubkey.sender = tx.sender.pubKey;
  const txHash = hashTx(tx);
  return sign.sign(privKey, txHash);
};


const signHashedTx = (txHash, fromAccount, passphrase) => {
  const privKey = fromAccount.getDecryptedPrivateKey(passphrase);
  return sign.sign(privKey, txHash);
};



export default {
  signRawTx,
  signHashedTx,
};
