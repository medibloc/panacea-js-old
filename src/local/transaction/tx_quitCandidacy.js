import { constants, setTx, validateTx, wrapTxCreator } from './utils';

const {
  REQUIRED_TX_PARAMS,
  QUIT_CANDIDATE,
} = constants;

const createTx = (fields) => {
  const tx = setTx(Object.assign({}, fields, { type: QUIT_CANDIDATE }));
  validateTx(tx, REQUIRED_TX_PARAMS[QUIT_CANDIDATE]);
  return tx;
};

export default wrapTxCreator(createTx);
