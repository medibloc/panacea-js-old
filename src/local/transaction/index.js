import { createTx as createDataUploadTx, createDataPayload } from './tx_dataUpload';
import { createTx as createValueTransferTx } from './tx_valueTransfer';
import { createTx as createWriterAssignTx } from './tx_writerAssign';
import { hashTx } from './utils';

const txWrapper = rawTx => ({
  hash: hashTx(rawTx),
  rawTx,
  sign: null,
});

export default {
  createDataPayload,
  dataUploadTx: ({
    from,
    medicalData,
    nonce,
    timestamp,
  }) => {
    const rawTx = createDataUploadTx(from, medicalData, nonce, timestamp);
    return txWrapper(rawTx);
  },
  valueTransferTx: ({
    from,
    nonce,
    timestamp,
    to,
    value,
  }) => {
    const rawTx = createValueTransferTx(from, to, value, nonce, timestamp);
    return txWrapper(rawTx);
  },
  writerAssignTx: ({
    from,
    nonce,
    timestamp,
    writer,
  }) => {
    const rawTx = createWriterAssignTx(from, writer, nonce, timestamp);
    return txWrapper(rawTx);
  },
};
