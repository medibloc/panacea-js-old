import {
  APPLICATION_JSON,
  DEFAULT_TIMEOUT,
  GET,
  POST,
  STREAM_TIMEOUT,
} from './constants';

const defaultConfig = {
  timeout: DEFAULT_TIMEOUT,
};

const buildConfig = ({
  baseURL,
  method,
  path,
  payload,
  timeout = DEFAULT_TIMEOUT,
  responseType = 'json',
}) => {
  const customConfig = {
    baseURL,
    method,
    responseType,
    timeout,
    url: path,
    ...method === GET && { params: payload },
    ...method === POST && {
      data: payload,
      headers: APPLICATION_JSON,
    },
  };
  if (timeout === 'stream') {
    customConfig.timeout = STREAM_TIMEOUT;
  }


  return Object.assign({}, defaultConfig, customConfig);
};

export default {
  buildConfig,
};
