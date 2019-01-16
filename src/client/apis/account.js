export default ({ sendRequest }) => {
  const getAccount = (address, height, type) => sendRequest({
    method: 'get',
    path: 'v1/account',
    payload: {
      address, height, type,
    },
  });

  return {
    getAccount,
  };
};
