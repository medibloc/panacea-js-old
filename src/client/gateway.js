import { buildConfig } from './config';
import { MAX_REQUEST_RETRY_COUNT } from './constants';
import { request } from './httpRequest';

export default (nodeBucket) => {
  if (!nodeBucket) {
    throw new Error('gateway requires bucket for initialization.');
  }

  const runRequest = ({
    config, count, parser, resolve, reject,
  }) => {
    if (count >= MAX_REQUEST_RETRY_COUNT) {
      reject(new Error('max request retry count exceeded.'));
    } else {
      const baseURL = nodeBucket.getRequestNode();
      request({ ...config, baseURL })
        .then((data) => {
          if (typeof parser === 'function') return resolve(parser(data));
          return resolve(data);
        })
        .catch((err) => {
          if (err.status === 400) { // TODO add more error cases @jiseob
            reject(new Error(`${err.data.error} to ${baseURL}`));
          } else {
            nodeBucket.replaceRequestNode();
            runRequest({
              config, count: count + 1, resolve, reject,
            });
          }
        });
    }
  };

  // sendRequest handle request using the nodeBucket.
  const sendRequest = ({
    method, parser, path, payload,
  }, stream = false) =>
    new Promise((resolve, reject) => {
      // remove blank parameters in the payload
      const purePayload = payload;
      if (payload) {
        const propsName = Object.getOwnPropertyNames(purePayload);
        propsName.forEach((name) => {
          if (purePayload[name] === null || purePayload[name] === undefined) {
            delete purePayload[name];
          }
        });
      }
      const option = {
        method,
        path,
        payload: purePayload,
      };
      if (stream) {
        option.responseType = 'stream';
      }
      const config = buildConfig(option);

      runRequest({
        config, count: 0, parser, resolve, reject,
      });
    });

  return {
    sendRequest,
  };
};

