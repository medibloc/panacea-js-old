import { createTx as createValueTransferTx } from './tx_valueTransfer';
import { createTx as createWriterAssignTx } from './tx_writerAssign';
import { createTx as createMedicalRecordTx, createDataPayload } from './tx_medicalRecord';

export default {
  createValueTransferTx,
  createWriterAssignTx,
  createMedicalRecordTx,
  createMedicalRecordPayload: createDataPayload,
};
