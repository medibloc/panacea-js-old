import {
  CONTENT_TYPE_URLENCODED,
  DEFAULT_TIMEOUT,
  GET,
  POST,
} from './apiConst';

const defaultReqConfig = {
  timeout: DEFAULT_TIMEOUT,
};

const buildReqConfig = ({
  baseURL,
  method,
  path,
  payload,
  version,
}) => {
  const customReqConfig = {
    url: path,
    method,
    baseURL: baseURL.concat('/', version),
    /*
    ...method === POST && { headers: CONTENT_TYPE_URLENCODED },
    ...method === GET && { params: payload },
    ...method === POST && { data: payload },
    */
  };

  switch (method) {
    case GET:
      customReqConfig.params = payload;
      break;
    case POST:
      customReqConfig.headers = CONTENT_TYPE_URLENCODED;
      customReqConfig.data = payload;
      break;
    default:
      break;
  }

  return Object.assign({}, defaultReqConfig, customReqConfig);
};

export default {
  buildReqConfig,
};
