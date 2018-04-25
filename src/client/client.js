import {
  account,
  node,
  transaction,
} from './apis';
import nodeBucket from './nodeBucket';
import gateway from './gateway';

export default (nodes) => {
  if (!nodes || !Array.isArray(nodes)) {
    throw new Error('client requires array of nodes for initialization.');
  }
  const bucket = nodeBucket(nodes);
  const apiGateway = gateway(bucket);
  return {
    nodeBucket: bucket,
    ...account(apiGateway),
    ...node(apiGateway),
    ...transaction(apiGateway),
  };
};
