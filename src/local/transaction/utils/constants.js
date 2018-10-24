const ADD_CERTIFICATION = 'add_certification';
const BECOME_CANDIDATE = 'become_candidate';
const DATA_UPLOAD = 'add_record';
const QUIT_CANDIDATE = 'quit_candidacy';
const REVOKE_CERTIFICATION = 'revoke_certification';
const VALUE_TRANSFER = 'transfer';
const VEST = 'vest';
const VOTE = 'vote';
const WITHDRAW_VESTING = 'withdraw_vesting';

// PAYLOAD
const ADD_CERTIFICATION_PAYLOAD = 'addCertificationPayload';
const ADD_RECORD_PAYLOAD = 'addRecordPayload';
const DEFAULT_PAYLOAD = 'defaultPayload';
const REVOKE_CERTIFICATION_PAYLOAD = 'revokeCertificationPayload';
const VOTE_PAYLOAD = 'votePayload';

const BYTESIZES = {
  ADDRESS: 33,
  ALG: 4,
  CHAIN_ID: 4,
  NONCE: 8,
  TIMESTAMP: 8,
  VALUE: 16,
  HASH: 32,
};

const COMMON_REQUIRED = [
  'alg',
  'chain_id',
  'from',
  'nonce',
  'timestamp',
  'tx_type',
];

const REQUIRED_TX_PARAMS = {
  [ADD_CERTIFICATION]: COMMON_REQUIRED.concat(['payload', 'to']),
  [BECOME_CANDIDATE]: COMMON_REQUIRED.concat(['value']),
  [DATA_UPLOAD]: COMMON_REQUIRED.concat(['payload']),
  [QUIT_CANDIDATE]: COMMON_REQUIRED.concat([]),
  [REVOKE_CERTIFICATION]: COMMON_REQUIRED.concat(['payload']),
  [VALUE_TRANSFER]: COMMON_REQUIRED.concat(['to', 'value']),
  [VEST]: COMMON_REQUIRED.concat(['value']),
  [VOTE]: COMMON_REQUIRED.concat(['payload']),
  [WITHDRAW_VESTING]: COMMON_REQUIRED.concat(['value']),
};

const PAYLOAD_TYPES = {
  [ADD_CERTIFICATION]: ADD_CERTIFICATION_PAYLOAD,
  [BECOME_CANDIDATE]: null,
  [DATA_UPLOAD]: ADD_RECORD_PAYLOAD,
  [QUIT_CANDIDATE]: null,
  [REVOKE_CERTIFICATION]: REVOKE_CERTIFICATION_PAYLOAD,
  [VALUE_TRANSFER]: DEFAULT_PAYLOAD,
  [VEST]: null,
  [VOTE]: VOTE_PAYLOAD,
  [WITHDRAW_VESTING]: null,
};

export default {
  ADD_CERTIFICATION,
  BECOME_CANDIDATE,
  DATA_UPLOAD,
  QUIT_CANDIDATE,
  REVOKE_CERTIFICATION,
  VALUE_TRANSFER,
  VEST,
  VOTE,
  WITHDRAW_VESTING,

  BYTESIZES,

  REQUIRED_TX_PARAMS,
  PAYLOAD_TYPES,
};
