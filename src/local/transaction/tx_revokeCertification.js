import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_TX_PARAMS,
  REVOKE_CERTIFICATION,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: REVOKE_CERTIFICATION }));
  validateTx(tx, REQUIRED_TX_PARAMS[REVOKE_CERTIFICATION]);
  return tx;
};

export default wrapTxCreator(createTx);
