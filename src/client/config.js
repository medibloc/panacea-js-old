import {
  CONTENT_TYPE_URLENCODED,
  DEFAULT_TIMEOUT,
  GET,
  POST,
} from './constants';

const defaultReqConfig = {
  timeout: DEFAULT_TIMEOUT,
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
};

const buildReqConfig = ({
  baseURL,
  method,
  path,
  payload,
}) => {
  const customReqConfig = {
    url: path,
    method,
    baseURL,
    ...method === GET && { params: payload },
    ...method === POST && {
      data: payload,
      headers: CONTENT_TYPE_URLENCODED,
    },
  };

  return Object.assign({}, defaultReqConfig, customReqConfig);
};

export default {
  buildReqConfig,
};
