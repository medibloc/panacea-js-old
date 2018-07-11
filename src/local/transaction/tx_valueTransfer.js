import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_TX_PARAMS,
  VALUE_TRANSFER,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: VALUE_TRANSFER }));
  validateTx(tx, REQUIRED_TX_PARAMS[VALUE_TRANSFER]);
  return tx;
};

export default wrapTxCreator(createTx);
