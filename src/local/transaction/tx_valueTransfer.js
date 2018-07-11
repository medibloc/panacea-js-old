import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  VALUE_TRANSFER,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: VALUE_TRANSFER }));
  validateTx(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
  return tx;
};

export default wrapTxCreator(createTx);
