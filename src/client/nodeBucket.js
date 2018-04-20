export default (nodes) => {
  let candidateNodes = nodes;
  let invalidNodes = [];
  let requestNode = candidateNodes[0] ? candidateNodes[0] : null;

  const getCandidateNodes = () => candidateNodes;
  const getInvalidNodes = () => invalidNodes;
  const getRequestNode = () => requestNode;

  // replaceInvalidRequestNode moves requestNode to invalidNodes and fill candidate node.
  const replaceInvalidRequestNode = () => {
    if (!requestNode && !invalidNodes) {
      invalidNodes.push(requestNode);
    }
    if (!candidateNodes) {
      requestNode = null;
    }
    requestNode = candidateNodes.pop();
  };

  // reloadInvalidNodes moves invalidNodes to candidateNodes
  const reloadInvalidNodes = () => {
    if (!invalidNodes) {
      return;
    }
    if (!candidateNodes) {
      candidateNodes = invalidNodes;
      invalidNodes = [];
      return;
    }
    candidateNodes = candidateNodes.concat(invalidNodes);
    invalidNodes = [];
  };

  return {
    getCandidateNodes,
    getInvalidNodes,
    getRequestNode,
    replaceInvalidRequestNode,
    reloadInvalidNodes,
  };
};

console.log('nodeBucket');
