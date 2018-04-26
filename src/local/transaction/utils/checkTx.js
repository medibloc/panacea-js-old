import {
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  REQUIRED_MEDICAL_RECORD_TX_PARAMETERS,
  REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
  VALUE_TRANSFER,
  WRITER_ASSIGN,
  MEDICAL_RECORD,
} from './constants';

const checkRequiredParams = (tx, requiredParams) => {
  requiredParams.forEach((param) => {
    if (tx[param] === undefined && tx.data[param] === undefined) {
      throw new Error(`Transaction should have ${param} field.`);
    }
  });
  return true;
};


const checkNonce = (tx, account) => {
  if (tx.nonce === account.nonce + 1) return true;
  throw new Error('Transaction nonce should be increased by one.');
};


const checkBalance = (tx, account) => {
  if (tx.value <= account.balance) return true;
  throw new Error('The amount of token trying to send should be less than the account has.');
};

const check = (type, tx, account) => {
  switch (type) {
    case VALUE_TRANSFER:
      checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
      checkNonce(tx, account);
      checkBalance(tx, account);
      break;
    case WRITER_ASSIGN:
      checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
      checkNonce(tx, account);
      break;
    case MEDICAL_RECORD:
      checkRequiredParams(tx, REQUIRED_MEDICAL_RECORD_TX_PARAMETERS);
      checkNonce(tx, account);
      break;
    default:
      throw new Error('Transaction type is invalid.');
  }
};

export default check;
