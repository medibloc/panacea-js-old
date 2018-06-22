export default ({ sendRequest }) => {
  const subscribe = (topics) => {
    if (!Array.isArray(topics)) {
      throw new Error('topics should be an array type');
    }
    return sendRequest({
      method: 'post',
      path: 'v1/subscribe',
      payload: {
        topics,
      },
    }, true);
  };

  return {
    subscribe,
  };
};
