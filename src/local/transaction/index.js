import { createTx as createDataUploadTx, createDataPayload } from './tx_dataUpload';
import { createTx as createValueTransferTx } from './tx_valueTransfer';
import { createTx as createWriterAssignTx } from './tx_writerAssign';
import { hashTx } from './utils';

function txWrapper(rawTx) {
  return {
    hash: hashTx(rawTx),
    rawTx,
    sign: null,
  };
}

export default {
  dataUploadTx: (txData) => {
    const {
      from, medicalData, nonce, timestamp, // timestamp - option
    } = txData;
    const rawTx = createDataUploadTx(from, medicalData, nonce, timestamp);
    return txWrapper(rawTx);
  },
  valueTransferTx: (txData) => {
    const {
      from, to, value, nonce, timestamp, // timestamp - option
    } = txData;
    const rawTx = createValueTransferTx(from, to, value, nonce, timestamp);
    return txWrapper(rawTx);
  },
  writerAssignTx: (txData) => {
    const {
      from, writer, nonce, timestamp, // timestamp - option
    } = txData;
    const rawTx = createWriterAssignTx(from, writer, nonce, timestamp);
    return txWrapper(rawTx);
  },
  createDataPayload,
};
