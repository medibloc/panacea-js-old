import {
  account,
  transaction,
} from './apis';
import nodeBucket from './nodeBucket';
import gateway from './gateway';

export default (nodes) => {
  const bucket = nodeBucket(nodes);
  const apiGateway = gateway(bucket);
  if (!apiGateway) {
    throw new Error('Fail to create apiGateway');
  }
  return {
    nodeBucket: bucket,
    ...account(apiGateway),
    ...transaction(apiGateway),
  };
};
