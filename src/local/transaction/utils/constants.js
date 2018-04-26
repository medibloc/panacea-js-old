const BYTESIZES = {
  ADDRESS: 33,
  VALUE: 16,
  TIMESTAMP: 8,
  NONCE: 8,
  CHAIN_ID: 4,
  ALG: 4,
};

const REQUIRED_VALUE_TRANSFER_TX_PARAMETERS = [
  'from',
  'to',
  'value',
  'timestamp',
  'value',
  'nonce',
  'chain_id',
  'alg',
  'type',
];

const REQUIRED_MEDICAL_RECORD_TX_PARAMETERS = [
  'from',
  'timestamp',
  'nonce',
  'chain_id',
  'alg',
  'type',
  'payload',
];

const REQUIRED_WRITER_ASSIGN_TX_PARAMETERS = [
  'from',
  'timestamp',
  'nonce',
  'chain_id',
  'alg',
  'type',
  'payload',
];

export default {
  BYTESIZES,
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  REQUIRED_MEDICAL_RECORD_TX_PARAMETERS,
  REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
};
