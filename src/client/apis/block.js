export default (gateway) => {
  const getBlock = (hash) => {
    const reqConfig = {
      method: 'get',
      path: 'v1/block',
      payload: {
        hash,
      },
    };
    return gateway.sendRequest(reqConfig);
  };

  return {
    getBlock,
  };
};
