export default (gateway) => {
  const sendTransaction = (from, to, value, nonce, timestamp, hash, sign, type, payload) => {
    const reqConfig = {
      method: 'post',
      path: 'v1/admin/transaction',
      payload: {
        from,
        to,
        value,
        nonce,
        timestamp,
        hash,
        sign,
        type,
        payload,
      },
    };
    return gateway.sendRequest(reqConfig);
  };

  return {
    sendTransaction,
  };
};
