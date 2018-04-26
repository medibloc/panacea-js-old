import { checkTx, setTx } from './utils';


const createTx = (ownerAccount, writerPubKey) => {
  const tx = setTx({
    ownerAccount,
    payload: {
      Writer: writerPubKey,
    },
    type: 'register_wkey',
  });
  checkTx(tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
