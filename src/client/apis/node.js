export default (gateway) => {
  const getMedState = () => {
    const reqConfig = {
      method: 'get',
      path: 'v1/node/medstate',
    };
    return gateway.sendRequest(reqConfig);
  };

  return {
    getMedState,
  };
};
