import Client from './client';
import Cryptography from './cryptography';
import HealthData from './healthData';
import Identification from './identification';
import Local from './local';
import Utils from './utils';

export default {
  init: nodes => ({
    client: Client(nodes),
    cryptography: Cryptography,
    healthData: HealthData,
    identification: Identification,
    local: Local,
    utils: Utils,
  }),
  client: nodes => Client(nodes),
  cryptography: Cryptography,
  healthData: HealthData,
  identification: Identification,
  local: Local,
  utils: Utils,
};
