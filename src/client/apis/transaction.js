export default (_gateway) => {
  const gateway = _gateway;

  const sendTransaction = (from, to, value, nonce) => {
    const reqConfig = {
      method: 'post',
      path: 'v1/admin/transaction',
      payload: {
        from, to, value, nonce,
      },
    };
    return gateway.sendRequest(reqConfig);
  };

  return {
    sendTransaction,
  };
};
