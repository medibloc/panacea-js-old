import hashTx from './hashTx';

const wrapTxCreator = creator => (fields) => {
  const rawTx = creator(fields);
  return {
    hash: hashTx(rawTx),
    rawTx,
    sign: null,
  };
};

export default wrapTxCreator;
