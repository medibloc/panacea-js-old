export default ({ sendRequest }) => {
  const getAccountState = (address, height) => sendRequest({
    method: 'get',
    path: 'v1/user/accountstate',
    payload: {
      address, height,
    },
  });

  return {
    getAccountState,
  };
};
