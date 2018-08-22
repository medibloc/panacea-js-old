import createAddCertificationTx from './tx_addCertification';
import createBecomeCandidateTx from './tx_becomeCandidate';
import createDataUploadTx from './tx_dataUpload';
import createQuitCandidacyTx from './tx_quitCandidacy';
import createRevokeCertificationTx from './tx_revokeCertification';
import createValueTransferTx from './tx_valueTransfer';
import createVestTx from './tx_vest';
import createVoteTx from './tx_vote';
import createWithdrawVestingTx from './tx_withdrawVesting';
import payload from './payload';

/**
 * - becomeCandidateTx required fields
 * { from, nonce, value }
 *
 * - dataUploadTx required fields
 * { data - { payload }, from, nonce }
 *
 * - quitCandidacyTx required fields
 * { from, nonce }
 *
 * - valueTransferTx required fields
 * { from, nonce, to, value }
 *
 * - vestTx required fields
 * { from, nonce, value }
 *
 * - voteTx required fields
 * { from, nonce, to }
 *
 * - withdrawVestingTx required fields
 * { from, nonce, value }
 *
 */
export default {
  addCertificationTx: fields => createAddCertificationTx(fields),
  becomeCandidateTx: fields => createBecomeCandidateTx(fields),
  dataUploadTx: fields => createDataUploadTx(fields),
  quitCandidacyTx: fields => createQuitCandidacyTx(fields),
  revokeCertificationTx: fields => createRevokeCertificationTx(fields),
  valueTransferTx: fields => createValueTransferTx(fields),
  vestTx: fields => createVestTx(fields),
  voteTx: fields => createVoteTx(fields),
  withdrawVestingTx: fields => createWithdrawVestingTx(fields),
  ...payload,
};
