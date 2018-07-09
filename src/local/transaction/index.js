import { createTx as createDataUploadTx, createDataPayload } from './tx_dataUpload';
import { createTx as createValueTransferTx } from './tx_valueTransfer';
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
};
