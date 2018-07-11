import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_TX_PARAMS,
  WITHDRAW_VESTING,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: WITHDRAW_VESTING }));
  validateTx(tx, REQUIRED_TX_PARAMS[WITHDRAW_VESTING]);
  return tx;
};

export default wrapTxCreator(createTx);
