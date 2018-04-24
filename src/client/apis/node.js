export default (_gateway) => {
  const gateway = _gateway;

  const getMedState = () => {
    const reqConfig = {
      method: 'get',
      path: 'v1/user/medstate',
    };
    return gateway.sendRequest(reqConfig);
  };

  return {
    getMedState,
  };
};
