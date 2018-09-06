import http from 'http';
import https from 'https';

import {
  APPLICATION_JSON,
  NETWORK_TIMEOUT,
  GET,
  POST,
  STREAM_TIMEOUT,
} from './constants';

const buildConfig = ({
  baseURL,
  method,
  path,
  payload,
  responseType = 'json',
}) => {
  const customConfig = {
    baseURL,
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    method,
    responseType,
    timeout: responseType === 'stream' ? STREAM_TIMEOUT : NETWORK_TIMEOUT,
    url: path,
    ...method === GET && { params: payload },
    ...method === POST && {
      data: payload,
      headers: APPLICATION_JSON,
    },
  };

  return customConfig;
};

export default {
  buildConfig,
};
