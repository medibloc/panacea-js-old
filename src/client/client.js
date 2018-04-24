import {
  account,
  transaction,
} from './apis';
import nodeBucket from './nodeBucket';
import gateway from './gateway';

export default (nodes) => {
  if (!nodes) {
    throw new Error('client requires nodes for initialization.');
  }
  const bucket = nodeBucket(nodes);
  const apiGateway = gateway(bucket);
  return {
    nodeBucket: bucket,
    ...account(apiGateway),
    ...transaction(apiGateway),
  };
};
