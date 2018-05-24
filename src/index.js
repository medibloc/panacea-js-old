import client from './client';
import cryptography from './cryptography';
import local from './local';
import healthData from './healthData';
import utils from './utils';

export default nodes => ({
  client: client(nodes),
  cryptography,
  local,
  healthData,
  utils,
});
