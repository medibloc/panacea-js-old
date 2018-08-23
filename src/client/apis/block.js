export default ({ sendRequest }) => {
  const getBlock = (hash, height, type) => sendRequest({
    method: 'get',
    path: 'v1/block',
    payload: {
      hash, height, type,
    },
  });

  const getBlocks = (from, to) => sendRequest({
    method: 'get',
    path: 'v1/blocks',
    payload: {
      from, to,
    },
  });

  return {
    getBlock,
    getBlocks,
  };
};
