import APIClient from './apiClient';
import Local from './local';
import {
  TEST_NET,
  TEST_NODES,
} from './apiClient/apiConst';

const createLocalClient = nodes => APIClient('LocalNet', nodes || ['http://localhost:10002']);

const createTestNetClient = () => APIClient(TEST_NET, TEST_NODES);

// TODO: Add CreateMainNetClient()

export default {
  APIClient,
  Local,
  createLocalClient,
  createTestNetClient,
};
