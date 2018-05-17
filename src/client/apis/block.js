export default ({ sendRequest }) => {
  const getBlock = hash => sendRequest({
    method: 'get',
    path: 'v1/block',
    payload: {
      hash,
    },
  });

  return {
    getBlock,
  };
};
