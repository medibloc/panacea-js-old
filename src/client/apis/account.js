export default (_gateway) => {
  const gateway = _gateway;

  const getAccountState = (address, height) => {
    const reqConfig = {
      method: 'post',
      path: 'v1/user/accountstate',
      payload: {
        address, height,
      },
    };
    return gateway.sendRequest(reqConfig);
  };

  return {
    getAccountState,
  };
};
