import createDataUploadTx from './tx_dataUpload';
import createValueTransferTx from './tx_valueTransfer';
import payload from './payload';

/**
 * - dataUploadTx fields
 * { from, payload - { hash }, nonce, timestamp(optional) }
 *
 * - valueTransferTx fields
 * { from, to, value, nonce, timestamp(optional) }
 */
export default {
  dataUploadTx: fields => createDataUploadTx(fields),
  valueTransferTx: fields => createValueTransferTx(fields),
  ...payload,
};
