export default ({ sendRequest }) => {
  const getAccount = (address, height, type) => sendRequest({
    method: 'get',
    path: 'v1/account',
    payload: {
      address, height, type,
    },
  });

  const getAccountTransactions = (address, includePending) => sendRequest({
    method: 'get',
    path: `v1/user/${address}/transactions`,
    payload: {
      includePending,
    },
  });

  return {
    getAccount,
    getAccountTransactions,
  };
};
