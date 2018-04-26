import { hash } from 'cryptography';


/*
  argument tx is expected to fit to the following format.

  tx = {
    nonce: ,
    sender: Account,
    receiver: ,
    ...
  }
*/
const getTxHash = (tx) => {
  let txString = '';
  Object.keys(tx).forEach((txArg) => { txString += tx[txArg]; });
  return hash.hashData(txString);
};


export default getTxHash;
