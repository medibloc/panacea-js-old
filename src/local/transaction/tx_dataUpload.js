import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  DATA_UPLOAD,
  REQUIRED_DATA_UPLOAD_TX_PARAMETERS,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: DATA_UPLOAD }));
  validateTx(tx, REQUIRED_DATA_UPLOAD_TX_PARAMETERS);
  return tx;
};

export default wrapTxCreator(createTx);
