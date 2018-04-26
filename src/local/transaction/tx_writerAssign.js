import { checkTx, setTx, constants } from './utils';


const createTx = (ownerAccount, writerPubKey) => {
  const tx = setTx({
    ownerAccount,
    payload: {
      Writer: writerPubKey,
    },
    type: constants.WRITER_ASSIGN,
  });
  checkTx(constants.WRITER_ASSIGN, tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
