export default ({ sendRequest }) => {
  const getMedState = () => sendRequest({
    method: 'get',
    path: 'v1/node/medstate',
  });

  return {
    getMedState,
  };
};
