import {
  APPLICATION_JSON,
  DEFAULT_TIMEOUT,
  GET,
  POST,
} from './constants';

const defaultConfig = {
  timeout: DEFAULT_TIMEOUT,
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
      headers: APPLICATION_JSON,
    },
  };

  return Object.assign({}, defaultConfig, customConfig);
};

export default {
  buildConfig,
};
