import { buildConfig } from './config';
import { MAX_REQUEST_RETRY_COUNT } from './constants';
import { request } from './httpRequest';

export default (nodeBucket) => {
  if (!nodeBucket) {
    throw new Error('gateway requires bucket for initialization.');
  }

  // sendRequest handle request using the nodeBucket.
  const sendRequest = async ({ method, path, payload }, prevConfig, count, stream = false) => {
    const baseURL = nodeBucket.getRequestNode();
    const retryCount = count || 0;

    // return error when retry count exceed limit.
    if (retryCount >= nodeBucket.getSize() ||
        retryCount > MAX_REQUEST_RETRY_COUNT) {
      throw new Error('send request failed.');
    }

    const option = {
      baseURL,
      method,
      path,
      payload,
    };
    if (stream) {
      option.responseType = 'stream';
      option.timeout = 300000;
    }

    // set or build a config.
    const config = prevConfig ?
      { ...prevConfig, baseURL } :
      buildConfig(option);
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
