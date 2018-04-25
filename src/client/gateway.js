import { buildReqConfig, setBaseURL } from './config';
import { MAX_REQUEST_RETRY_COUNT } from './constants';
import { request } from './httpRequest';

export default (bucket) => {
  if (!bucket) {
    throw new Error('gateway requires bucket for initialization.');
  }
  const nodeBucket = bucket;

  // sendRequest handle request using the nodeBucket.
  const sendRequest = async ({ method, path, payload }, config, count) => {
    const baseURL = nodeBucket.getRequestNode();
    const retryCount = count || 0;

    // return error when retry count exceed limit.
    if (retryCount > nodeBucket.getSize() ||
        retryCount > MAX_REQUEST_RETRY_COUNT) {
      return new Error('send request failed');
    }

    // set or build a request config.
    const reqConfig =
          config ?
            setBaseURL(config, baseURL) :
            buildReqConfig({
              baseURL,
              method,
              path,
              payload,
            });
    try {
      return await request(reqConfig);
    } catch (err) {
      // retry if request throw error.
      nodeBucket.replaceRequestNode();
      return sendRequest({}, reqConfig, retryCount + 1);
    }
  };

  return {
    sendRequest,
  };
};
