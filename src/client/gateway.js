import { buildReqConfig } from './config';
import { MAX_REQUEST_RETRY_COUNT } from './constants';
import { request } from './httpRequest';

export default (bucket) => {
  if (!bucket) {
    throw new Error('gateway requires bucket for initialization.');
  }
  const nodeBucket = bucket;

  // sendRequest handle request using the nodeBucket.
  const sendRequest = ({ method, path, payload }, config, count) => {
    const baseURL = nodeBucket.getRequestNode();
    const retryCount = count || 0;

    // reset candidate nodes when baseURL is empty.
    if (baseURL == null) {
      // return error when retry count exceed limit.
      if (retryCount > nodeBucket.getFullNodesCount() ||
          retryCount > MAX_REQUEST_RETRY_COUNT) {
        return new Error('send request failed');
      }
      nodeBucket.resetCandidateNodes();
    }

    // set or build a request config.
    const reqConfig =
          config ||
          buildReqConfig({
            baseURL,
            method,
            path,
            payload,
          });

    return request(reqConfig)
      .then(res => res)
      .catch(() => {
        // retry if request throw error.
        nodeBucket.replaceInvalidRequestNode();
        return sendRequest({}, reqConfig, retryCount + 1);
      });
  };

  return {
    sendRequest,
  };
};
