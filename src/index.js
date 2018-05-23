import client from './client';
import cryptography from './cryptography';
import identification from './identification';
import local from './local';
import storage from './storage';
import utils from './utils';

export default nodes => ({
  client: client(nodes),
  cryptography,
  local,
  storage,
  utils,
  identification,
});
