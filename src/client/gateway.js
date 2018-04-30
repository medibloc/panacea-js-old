import { buildConfig, setBaseURL } from './config';
import { MAX_REQUEST_RETRY_COUNT } from './constants';
import { request } from './httpRequest';

export default (nodeBucket) => {
  if (!nodeBucket) {
    throw new Error('gateway requires bucket for initialization.');
  }

  // sendRequest handle request using the nodeBucket.
  const sendRequest = async ({ method, path, payload }, prevConfig, count) => {
    const baseURL = nodeBucket.getRequestNode();
    const retryCount = count || 0;

    // return error when retry count exceed limit.
    if (retryCount >= nodeBucket.getSize() ||
        retryCount > MAX_REQUEST_RETRY_COUNT) {
      throw new Error('send request failed.');
    }

    // set or build a config.
    const config = prevConfig ?
      setBaseURL(prevConfig, baseURL) :
      buildConfig({
        baseURL,
        method,
        path,
        payload,
      });
    try {
      return request(config);
    } catch (err) {
      // retry if request throw error.
      nodeBucket.replaceRequestNode();
      return sendRequest({}, config, retryCount + 1);
    }
  };

  return {
    sendRequest,
  };
};
