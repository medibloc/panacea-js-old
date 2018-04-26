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
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  REQUIRED_MEDICAL_RECORD_TX_PARAMETERS,
  REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
};
