export default ({ sendRequest }) => {
  const getAccountState = (address, height) => sendRequest({
    method: 'get',
    path: 'v1/user/accountstate',
    payload: {
      address, height,
    },
  });

  const getCurrentAccountTxs = address => sendRequest({
    method: 'get',
    path: `v1/user/${address}/transactions`,
  });

  return {
    getAccountState,
    getCurrentAccountTxs,
  };
};
