import client from './client';
import cryptography from './cryptography';
import local from './local';
import storage from './storage';
import utils from './utils';


export default nodes => ({
  client: client(nodes),
  cryptography,
  local,
  storage,
  utils,
});
