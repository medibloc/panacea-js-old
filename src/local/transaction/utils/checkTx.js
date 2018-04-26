import {
  REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
  REQUIRED_MEDICAL_RECORD_TX_PARAMETERS,
  REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
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
    case 'valueTransfer':
      checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
      checkNonce(tx, account);
      checkBalance(tx, account);
      break;
    case 'writerAssign':
      checkRequiredParams(tx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS);
      checkNonce(tx, account);
      break;
    case 'medicalRecord':
      checkRequiredParams(tx, REQUIRED_MEDICAL_RECORD_TX_PARAMETERS);
      checkNonce(tx, account);
      break;
    default:
      throw new Error('Transaction type is invalid.');
  }
};

export default check;
