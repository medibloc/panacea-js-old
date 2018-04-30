import {
  CONTENT_TYPE_URLENCODED,
  DEFAULT_TIMEOUT,
  GET,
  POST,
} from './constants';

const defaultConfig = {
  timeout: DEFAULT_TIMEOUT,
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
};

const buildConfig = ({
  baseURL,
  method,
  path,
  payload,
}) => {
  const customConfig = {
    baseURL,
    method,
    url: path,
    ...method === GET && { params: payload },
    ...method === POST && {
      data: payload,
      headers: CONTENT_TYPE_URLENCODED,
    },
  };

  return Object.assign({}, defaultConfig, customConfig);
};

const setBaseURL = (config, baseURL) => Object.assign(config, { baseURL });

export default {
  buildConfig,
  setBaseURL,
};
