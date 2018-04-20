export default (_apiGateway) => {
  const apiGateway = _apiGateway;

  const sendTransaction = (from, to, value, nonce) => {
    const reqConfig = {
      method: 'post',
      path: '/admin/transaction',
      payload: {
        from, to, value, nonce,
      },
    };
    return apiGateway.sendRequest(reqConfig);
  };

  return {
    sendTransaction,
  };
};
