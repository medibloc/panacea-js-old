import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_TX_PARAMS,
  VEST,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: VEST }));
  validateTx(tx, REQUIRED_TX_PARAMS[VEST]);
  return tx;
};

export default wrapTxCreator(createTx);
