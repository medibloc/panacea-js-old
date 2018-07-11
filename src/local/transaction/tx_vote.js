import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_TX_PARAMS,
  VOTE,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: VOTE }));
  validateTx(tx, REQUIRED_TX_PARAMS[VOTE]);
  return tx;
};

export default wrapTxCreator(createTx);
