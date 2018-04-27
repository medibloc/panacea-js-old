export default (gateway) => {
  const getAccountState = (address, height) => {
    const reqConfig = {
      method: 'get',
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
