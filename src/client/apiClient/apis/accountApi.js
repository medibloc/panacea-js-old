export default (_apiGateway) => {
  const apiGateway = _apiGateway;

  const getAccountState = (address, height) => {
    const reqConfig = {
      method: 'post',
      path: '/user/accountstate',
      payload: {
        address, height,
      },
    };
    return apiGateway.sendRequest(reqConfig);
  };

  return {
    getAccountState,
  };
};
