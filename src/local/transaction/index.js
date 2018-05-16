import { createTx as createValueTransferTx } from './tx_valueTransfer';
import { createTx as createWriterAssignTx } from './tx_writerAssign';
import { createTx as createMedicalRecordTx } from './tx_medicalRecord';
import { hashTx, signTx } from './utils';

const { signHashedTx } = signTx;

function sign(account, passphrase) {
  this.signature = signHashedTx(this.hash, account, passphrase);
}

function txWrapper(rawTx) {
  return {
    rawTx,
    hash: hashTx(rawTx),
    signature: null,
    sign,
  };
}


export default {
  valueTransferTx: (txData) => {
    const {
      from, receiver, value, nonce, timestamp, // timestamp - option
    } = txData;
    const rawTx = createValueTransferTx(from, receiver, value, nonce, timestamp);
    return txWrapper(rawTx);
  },
  writerAssignTx: (txData) => {
    const {
      from, writer, nonce, timestamp, // timestamp - option
    } = txData;
    const rawTx = createWriterAssignTx(from, writer, nonce, timestamp);
    return txWrapper(rawTx);
  },
  medicalRecordTx: (txData) => {
    const {
      from, medicalData, nonce, timestamp, // timestamp - option
    } = txData;
    const rawTx = createMedicalRecordTx(from, medicalData, nonce, timestamp);
    return txWrapper(rawTx);
  },
  // signTx: sign,
};

