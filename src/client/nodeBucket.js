export default (nodes) => {
  if (!nodes || !Array.isArray(nodes)) {
    throw new Error('nodeBucket requires array of nodes for initialization.');
  }
  if (nodes.length === 0) {
    throw new Error('nodeBucket requires not empty array of nodes for initialization.');
  }

  const size = nodes.length;
  let requestNodeIndex = 0;

  const getNodes = () => nodes;
  const getSize = () => size;
  const getRequestNode = () => nodes[requestNodeIndex];

  // replaceRequestNode discards the requestNode and fill it.
  const replaceRequestNode = () => {
    requestNodeIndex = (requestNodeIndex + 1) % size;
  };

  return {
    getNodes,
    getSize,
    getRequestNode,
    replaceRequestNode,
  };
};
