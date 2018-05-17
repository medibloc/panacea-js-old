import {
  account,
  block,
  node,
  transaction,
} from './apis';
import nodeBucket from './nodeBucket';
import gateway from './gateway';

export default (nodes) => {
  const apiGateway = gateway(nodeBucket(nodes));
  return {
    ...account(apiGateway),
    ...block(apiGateway),
    ...node(apiGateway),
    ...transaction(apiGateway),
  };
};
