import { createTx as createValueTransferTx } from './tx_valueTransfer';
import { createTx as createWriterAssignTx } from './tx_writerAssign';
import { createTx as createMedicalRecordTx } from './tx_medicalRecord';
import { hashTx, signTx, constants } from './utils';


const { signHashedTx } = signTx;
const {
  VALUE_TRANSFER,
  WRITER_ASSIGN,
  MEDICAL_RECORD,
} = constants;


export default (type, txData) => {
  let rawTx = {};
  switch (type) {
    case VALUE_TRANSFER: {
      const { sender, receiverPubKey, value } = txData;
      rawTx = createValueTransferTx(sender, receiverPubKey, value);
      break;
    }
    case WRITER_ASSIGN: {
      const { owner, writerPubKey } = txData;
      rawTx = createWriterAssignTx(owner, writerPubKey);
      break;
    }
    case MEDICAL_RECORD: {
      const { patient, medicalData } = txData;
      rawTx = createMedicalRecordTx(patient, medicalData);
      break;
    }
    default:
      throw new Error('Wrong transaction type.');
  }

  const hash = hashTx(rawTx);
  return {
    rawTx,
    hash,
    sign: ((user, passphrase) => signHashedTx(hash, user, passphrase)),
  };
};
