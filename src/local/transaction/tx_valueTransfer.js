import { checkTx, constants, setTx, wrapTxCreator } from './utils';

const {
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  VALUE_TRANSFER,
} = constants;

const validateTx = (tx) => {
  checkTx.checkObject(tx);
  checkTx.checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
  checkTx.checkValue(tx);
};

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: VALUE_TRANSFER }));
  validateTx(tx);
  return tx;
};

export default wrapTxCreator(createTx);
