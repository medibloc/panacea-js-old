import createBecomeCandidate from './tx_becomeCandidate';
import createDataUploadTx from './tx_dataUpload';
import createQuitCandidate from './tx_quitCandidate';
import createValueTransferTx from './tx_valueTransfer';
import createVest from './tx_vest';
import createVote from './tx_vote';
import createWithdrawVesting from './tx_withdrawVesting';
import payload from './payload';

/**
 * - becomeCandidateTx required fields
 * { from, nonce, value }
 *
 * - dataUploadTx required fields
 * { data - { payload }, from, nonce }
 *
 * - quitCandidate required fields
 * { from, nonce }
 *
 * - valueTransferTx required fields
 * { from, nonce, to, value }
 *
 * - vest required fields
 * { from, nonce, value }
 *
 * - vote required fields
 * { from, nonce, to }
 *
 * - withdrawVesting required fields
 * { from, nonce, value }
 *
 */
export default {
  becomeCandidate: fields => createBecomeCandidate(fields),
  dataUploadTx: fields => createDataUploadTx(fields),
  quitCandidate: fields => createQuitCandidate(fields),
  valueTransferTx: fields => createValueTransferTx(fields),
  vest: fields => createVest(fields),
  vote: fields => createVote(fields),
  withdrawVesting: fields => createWithdrawVesting(fields),
  ...payload,
};
