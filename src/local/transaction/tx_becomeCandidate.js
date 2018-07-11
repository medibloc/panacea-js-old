import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_TX_PARAMS,
  BECOME_CANDIDATE,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: BECOME_CANDIDATE }));
  validateTx(tx, REQUIRED_TX_PARAMS[BECOME_CANDIDATE]);
  return tx;
};

export default wrapTxCreator(createTx);
