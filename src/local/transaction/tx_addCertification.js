import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_TX_PARAMS,
  ADD_CERTIFICATION,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: ADD_CERTIFICATION }));
  validateTx(tx, REQUIRED_TX_PARAMS[ADD_CERTIFICATION]);
  return tx;
};

export default wrapTxCreator(createTx);
