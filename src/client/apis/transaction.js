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
          hash: tx.hash,
          from: tx.rawTx.from,
          to: tx.rawTx.to,
          value: tx.rawTx.value,
          timestamp: tx.rawTx.timestamp,
          data: tx.rawTx.data,
          nonce: tx.rawTx.nonce,
          chainId: tx.rawTx.chain_id,
          alg: tx.rawTx.alg,
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
