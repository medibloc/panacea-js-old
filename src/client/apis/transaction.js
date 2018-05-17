export default ({ sendRequest }) => {
  const getTransaction = hash => sendRequest({
    method: 'get',
    path: 'v1/transaction',
    payload: {
      hash,
    },
  });

  const sendTransaction = tx => sendRequest({
    method: 'post',
    path: 'v1/transaction',
    ...tx.rawTx && tx.hash && tx.sign && {
      payload: {
        ...tx.rawTx,
        hash: tx.hash,
        sign: tx.sign,
      },
    },
  });

  return {
    getTransaction,
    sendTransaction,
  };
};
