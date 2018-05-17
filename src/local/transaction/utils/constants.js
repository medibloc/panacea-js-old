const DATA_UPLOAD = 'add_record';
const VALUE_TRANSFER = 'binary';
const WRITER_ASSIGN = 'register_wkey';

const BYTESIZES = {
  ADDRESS: 33,
  ALG: 4,
  CHAIN_ID: 4,
  NONCE: 8,
  TIMESTAMP: 8,
  VALUE: 16,
};

const REQUIRED_DATA_UPLOAD_TX_PARAMETERS = [
  'alg',
  'chain_id',
  'from',
  'nonce',
  'payload',
  'timestamp',
  'type',
];

const REQUIRED_VALUE_TRANSFER_TX_PARAMETERS = [
  'alg',
  'chain_id',
  'from',
  'nonce',
  'timestamp',
  'to',
  'type',
  'value',
];

const REQUIRED_WRITER_ASSIGN_TX_PARAMETERS = [
  'alg',
  'chain_id',
  'from',
  'nonce',
  'timestamp',
  'type',
  'payload',
];

export default {
  DATA_UPLOAD,
  VALUE_TRANSFER,
  WRITER_ASSIGN,

  BYTESIZES,

  REQUIRED_DATA_UPLOAD_TX_PARAMETERS,
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
};
