import client from './client';
import cryptography from './cryptography';
import local from './local';
import storage from './storage';
import util from './util';

export default (nodes) => {
  // TODO: set default nodes after mainnet launching
  if (!nodes) {
    throw new Error('medjs requires nodes for initialization.');
  }
  return {
    client: client(nodes),
    cryptography,
    local,
    storage,
    util,
  };
};
