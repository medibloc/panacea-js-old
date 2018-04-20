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
  version,
}) => {
  const customReqConfig = {
    url: path,
    method,
    baseURL: baseURL.concat('/', version),
    ...method === GET && { params: payload },
    ...method === POST && {
      data: payload,
      headers: CONTENT_TYPE_URLENCODED,
    },
  };

  /* switch (method) {
    case GET:
      customReqConfig.params = payload;
      break;
    case POST:
      customReqConfig.headers = CONTENT_TYPE_URLENCODED;
      customReqConfig.data = payload;
      break;
    default:
      break;
  } */

  return Object.assign({}, defaultReqConfig, customReqConfig);
};

export default {
  buildReqConfig,
};
