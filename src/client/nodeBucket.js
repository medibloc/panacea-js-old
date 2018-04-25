export default (nodes) => {
  if (!nodes) {
    throw new Error('nodeBucket requires nodes for initialization.');
  }
  let candidateNodes = nodes.slice();
  const fullNodes = nodes.slice();
  let requestNode = candidateNodes && candidateNodes.length > 0 ? candidateNodes.pop() : null;

  const getCandidateNodes = () => candidateNodes;
  const getFullNodes = () => fullNodes;
  const getFullNodesCount = () => {
    if (!fullNodes) {
      return 0;
    }
    return fullNodes.length;
  };
  const getRequestNode = () => requestNode;

  // replaceInvalidRequestNode discards the requestNode and fill it.
  const replaceInvalidRequestNode = () => {
    if (!candidateNodes || candidateNodes.length === 0) {
      requestNode = null;
      return;
    }
    requestNode = candidateNodes.pop();
  };

  // resetNodeBucket resets node bucket.
  const resetNodeBucket = () => {
    if (!fullNodes) {
      return;
    }
    candidateNodes = fullNodes;
    replaceInvalidRequestNode();
  };

  return {
    getCandidateNodes,
    getFullNodes,
    getFullNodesCount,
    getRequestNode,
    replaceInvalidRequestNode,
    resetNodeBucket,
  };
};
