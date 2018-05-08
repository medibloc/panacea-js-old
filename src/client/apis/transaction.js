export default (gateway) => {
  const getTransaction = (hash) => {
    const reqConfig = {
      method: 'get',
      path: 'v1/transaction',
      payload: {
        hash,
      },
    };
    return gateway.sendRequest(reqConfig);
  };

  const sendTransaction = (tx) => {
    const reqConfig = {
      method: 'post',
      path: 'v1/transaction',
      ...tx.rawTx && tx.hash && tx.sign && {
        payload: {
          ...tx.rawTx,
          hash: tx.hash,
          sign: tx.sign,
        },
      },
    };
    return gateway.sendRequest(reqConfig);
  };

  return {
    getTransaction,
    sendTransaction,
  };
};
