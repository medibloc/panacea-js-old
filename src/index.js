import Client from './client';
import Cryptography from './cryptography';
import HealthData from './healthData';
import Identification from './identification';
import Local from './local';
import Utils from './utils';

export default nodes => ({
  client: Client(nodes),
  cryptography: Cryptography,
  healthData: HealthData,
  identification: Identification,
  local: Local,
  utils: Utils,
});
export const client = nodes => Client(nodes);
export const cryptography = Cryptography;
export const healthData = HealthData;
export const identification = Identification;
export const local = Local;
export const utils = Utils;
