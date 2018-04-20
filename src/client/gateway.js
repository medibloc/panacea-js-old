import { request } from './httpRequest';
import { buildReqConfig } from './config';

export default (_nodeBucket, _version) => {
  const nodeBucket = _nodeBucket;
  const version = _version || 'v1';

  const sendRequest = ({ method, path, payload }) => {
    const config = buildReqConfig({
      baseURL: nodeBucket.getRequestNode(),
      method,
      path,
      payload,
      version,
    });
    return request(config, nodeBucket.replaceInvalidRequestNode);
  };

  return {
    sendRequest,
  };
};
