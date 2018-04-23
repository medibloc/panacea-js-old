export default (nodes) => {
  let candidateNodes = nodes;
  const fullNodes = nodes;
  let requestNode = nodes ? nodes[0] : null;

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
    if (!candidateNodes) {
      requestNode = null;
      return;
    }
    requestNode = candidateNodes.pop();
  };

  // resetCandidateNodes resets candidateNodes as fullNodes.
  const resetCandidateNodes = () => {
    if (!fullNodes) {
      return;
    }
    candidateNodes = fullNodes;
  };

  return {
    getCandidateNodes,
    getFullNodes,
    getFullNodesCount,
    getRequestNode,
    replaceInvalidRequestNode,
    resetCandidateNodes,
  };
};
