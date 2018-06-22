export default ({ sendRequest }) => {
  const subscribe = topics => Array.isArray(topics) && sendRequest({
    method: 'post',
    path: 'v1/subscribe',
    payload: {
      topics,
    },
  }, true);

  return {
    subscribe,
  };
};
