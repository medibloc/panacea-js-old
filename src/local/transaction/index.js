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
    const { from, receiverPubKey, value } = txData;
    const rawTx = createValueTransferTx(from, receiverPubKey, value);
    return txWrapper(rawTx);
  },
  writerAssignTx: (txData) => {
    const { from, writerPubKey } = txData;
    const rawTx = createWriterAssignTx(from, writerPubKey);
    return txWrapper(rawTx);
  },
  medicalRecordTx: (txData) => {
    const { from, medicalData } = txData;
    const rawTx = createMedicalRecordTx(from, medicalData);
    return txWrapper(rawTx);
  },
};
