export default ({ sendRequest }) => {
  const subscribe = topics => Array.isArray(topics) && sendRequest({
    method: 'post',
    path: 'v1/subscribe',
    payload: {
      topics,
    },
  }, null, null, true);

  return {
    subscribe,
  };
};
