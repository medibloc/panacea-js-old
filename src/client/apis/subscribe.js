export default ({ sendStreamRequest }) => {
  const subscribe = topics => Array.isArray(topics) && sendStreamRequest({
    method: 'post',
    path: 'v1/subscribe',
    payload: {
      topics,
    },
  });

  return {
    subscribe,
  };
};
