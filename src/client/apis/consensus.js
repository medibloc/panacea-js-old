export default ({ sendRequest }) => {
  const getCandidates = () => sendRequest({
    method: 'get',
    path: 'v1/candidates',
  });

  const getDynasty = () => sendRequest({
    method: 'get',
    path: 'v1/dynasty',
  });

  return {
    getCandidates,
    getDynasty,
  };
};
