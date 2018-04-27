export default (gateway) => {
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
