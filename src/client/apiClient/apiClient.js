import {
  AccountAPI,
  TransactionAPI,
} from './apis';
import NodeBucket from './nodeBucket';
import APIGateway from './apiGateway';

export default (netName, nodes) => {
  const nodeBucket = NodeBucket(nodes);
  const apiGateway = APIGateway(nodeBucket);
  if (!apiGateway) {
    throw new Error('Fail to create apiGateway');
  }
  return {
    netName,
    nodeBucket,
    AccountAPI: AccountAPI(apiGateway),
    TransactionAPI: TransactionAPI(apiGateway),
  };
};
