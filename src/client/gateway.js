import { buildConfig } from './config';
import { MAX_REQUEST_RETRY_COUNT } from './constants';
import { request } from './httpRequest';

export default (nodeBucket) => {
  if (!nodeBucket) {
    throw new Error('gateway requires bucket for initialization.');
  }

  // sendRequest handle request using the nodeBucket.
  const sendRequest = async ({ method, path, payload }, stream = false) => {
    // remove blank parameters in the payload
    const purePayload = payload;
    const propsName = Object.getOwnPropertyNames(purePayload);
    propsName.forEach((name) => {
      if (purePayload[name] === null || purePayload[name] === undefined) {
        delete purePayload[name];
      }
    });
    console.log(payload, purePayload);
    const option = {
      method,
      path,
      payload: purePayload,
    };
    if (stream) {
      option.responseType = 'stream';
    }
    const config = buildConfig(option);
    for (let i = 0; i < MAX_REQUEST_RETRY_COUNT; i += 1) {
      const baseURL = nodeBucket.getRequestNode();
      try {
        return request({ ...config, baseURL });
      } catch (err) {
        // retry if request throw error.
        nodeBucket.replaceRequestNode();
      }
    }
    throw new Error('send request failed.');
  };

  return {
    sendRequest,
  };
};
