import { genHexBuf, recoverFromPayload } from 'utils';
import { BYTESIZES, PAYLOAD_TYPES } from './utils/constants';
import * as jsonDescriptor from './utils/proto/transaction.pb.json';

// The time unit must be seconds
const createAddCertificationPayload = ({
  issueTime,
  expirationTime,
  hash,
}) => {
  if (!issueTime || !expirationTime || !hash) throw new Error('All parameter should be entered');
  if (issueTime.toString().length !== 10 || expirationTime.toString().length !== 10) throw new Error('Timestamp unit should be seconds');
  if (issueTime > expirationTime) throw new Error('Issuance time should be earlier than expiration time');
  return ({
    issueTime,
    expirationTime,
    hash: genHexBuf(hash, BYTESIZES.HASH),
  });
};

const createDataPayload = hash => ({
  hash: genHexBuf(hash, BYTESIZES.HASH),
});

// All parameter type is allowed
const createDefaultPayload = message => ({
  message: JSON.stringify(message),
});

const createRevokeCertificationPayload = hash => ({
  hash: genHexBuf(hash, BYTESIZES.HASH),
});

const createVotePayload = (candidateIds) => {
  const candidates = [];
  for (let i = 0; i < candidateIds.length; i += 1) {
    candidates.push(genHexBuf(candidateIds[i], BYTESIZES.HASH));
  }
  return ({
    candidates,
  });
};

const recoverPayload = (transaction) => {
  if (!(transaction.rawTx &&
    transaction.rawTx.tx_type &&
    transaction.rawTx.payload &&
    PAYLOAD_TYPES[transaction.rawTx.tx_type])) return null;
  return recoverFromPayload(
    transaction.rawTx.payload,
    PAYLOAD_TYPES[transaction.rawTx.tx_type],
    jsonDescriptor,
  );
};

const recoverPayloadWithType = (payload, type) => {
  if (!(payload && type && PAYLOAD_TYPES[type])) return null;
  return recoverFromPayload(payload, PAYLOAD_TYPES[type], jsonDescriptor);
};

export default {
  createAddCertificationPayload,
  createDataPayload,
  createDefaultPayload,
  createRevokeCertificationPayload,
  createVotePayload,
  recoverPayload,
  recoverPayloadWithType,
};
