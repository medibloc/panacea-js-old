import { checkTx, setTx, constants } from './utils';

const createTx = (ownerAccount, receiverPubKey, value) => {
  const tx = setTx({
    ownerAccount,
    to: receiverPubKey,
    value,
    type: constants.VALUE_TRANSFER,
  });
  checkTx(constants.VALUE_TRANSFER, tx, ownerAccount);
  return tx;
};


export default {
  createTx,
};
