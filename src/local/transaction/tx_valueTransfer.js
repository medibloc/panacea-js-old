import { checkTx, setTx } from './utils';

const createTx = (ownerAccount, receiverPubKey, value) => {
  const tx = setTx({
    ownerAccount,
    to: receiverPubKey,
    value,
    type: 'binary',
  });
  checkTx(tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
