const REQUIRED_VALUE_TRANSFER_TX_PARAMETERS = [
  'from',
  'to',
  'type',
  'timeStamp',
  'amount',
  'nonce',
];

const REQUIRED_MEDICAL_RECORD_TX_PARAMETERS = [
  'from',
  'type',
  'doctorSignature',
  'timeStamp',
  'nonce',
  'data',
];

const REQUIRED_WRITER_ASSIGN_TX_PARAMETERS = [
  'from',
  'writer',
  'nonce',
  'timeStamp',
  'type',
];


export default {
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  REQUIRED_MEDICAL_RECORD_TX_PARAMETERS,
  REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
};
