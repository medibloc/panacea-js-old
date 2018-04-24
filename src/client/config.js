import {
  CONTENT_TYPE_URLENCODED,
  DEFAULT_TIMEOUT,
  GET,
  POST,
} from './constants';

const defaultReqConfig = {
  timeout: DEFAULT_TIMEOUT,
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
