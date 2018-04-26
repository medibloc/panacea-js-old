const REQUIRED_VALUE_TRANSFER_TX_PARAMETERS = [
  'from',
  'to',
  'type',
  'timestamp',
  'value',
  'nonce',
  'chain_id',
  'alg',
];

const REQUIRED_MEDICAL_RECORD_TX_PARAMETERS = [
  'from',
  'type',
  'doctorSignature',
  'timestamp',
  'nonce',
  'data',
];

const REQUIRED_WRITER_ASSIGN_TX_PARAMETERS = [
  'from',
  'writer',
  'nonce',
  'timestamp',
  'type',
];


export default {
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  REQUIRED_MEDICAL_RECORD_TX_PARAMETERS,
  REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
};
