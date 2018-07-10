import { checkTx, constants, setTx, wrapTxCreator } from './utils';

const { REQUIRED_DATA_UPLOAD_TX_PARAMETERS } = constants;

const validateTx = (tx) => {
  checkTx.checkObject(tx);
  checkTx.checkRequiredParams(tx, REQUIRED_DATA_UPLOAD_TX_PARAMETERS);
};

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: constants.DATA_UPLOAD }));
  validateTx(tx);
  return tx;
};

export default wrapTxCreator(createTx);
