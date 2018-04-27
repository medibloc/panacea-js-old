import { createTx as createValueTransferTx } from './tx_valueTransfer';
import { createTx as createWriterAssignTx } from './tx_writerAssign';
import { createTx as createMedicalRecordTx } from './tx_medicalRecord';
import { hashTx, signTx } from './utils';

const { signHashedTx } = signTx;


function sign(privKey, passphrase) {
  return signHashedTx(this.hash, privKey, passphrase);
}

function txWrapper(rawTx) {
  return {
    rawTx,
    hash: hashTx(rawTx),
    sign,
  };
}


export default {
  valueTransferTx: (txData) => {
    const {
      from, receiver, value, nonce,
    } = txData;
    const rawTx = createValueTransferTx(from, receiver, value, nonce);
    return txWrapper(rawTx);
  },
  writerAssignTx: (txData) => {
    const { from, writer, nonce } = txData;
    const rawTx = createWriterAssignTx(from, writer, nonce);
    return txWrapper(rawTx);
  },
  medicalRecordTx: (txData) => {
    const { from, medicalData, nonce } = txData;
    const rawTx = createMedicalRecordTx(from, medicalData, nonce);
    return txWrapper(rawTx);
  },
};
