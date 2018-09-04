import { genHexBuf } from 'utils';
import {
  ADD_CERTIFICATION,
  DATA_UPLOAD,
  REVOKE_CERTIFICATION,
  VOTE,

  ADD_CERTIFICATION_PAYLOAD,
  ADD_RECORD_PAYLOAD,
  DEFAULT_PAYLOAD,
  REVOKE_CERTIFICATION_PAYLOAD,
  VOTE_PAYLOAD,

  BYTESIZES,
} from './utils/constants';


// The time unit must be seconds
const createAddCertificationPayload = ({
  issueTime,
  expirationTime,
  hash,
}) => {
  if (!issueTime || !expirationTime || !hash) throw new Error('All parameter should be entered');
  if (issueTime.toString().length !== 10 || expirationTime.toString().length !== 10) throw new Error('Timestamp unit should be seconds');
  if (issueTime > expirationTime) throw new Error('Issuacne time should be earlier than expiration time');
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

const createVotePayload = (addresses) => {
  const candidates = [];
  for (let i = 0; i < addresses.length; i += 1) {
    candidates.push(genHexBuf(addresses[i], BYTESIZES.ADDRESS));
  }
  return ({
    candidates,
  });
};


const setPayload = (txType) => {
  switch (txType) {
    case DATA_UPLOAD:
      return ADD_RECORD_PAYLOAD;
    case VOTE:
      return VOTE_PAYLOAD;
    case ADD_CERTIFICATION:
      return ADD_CERTIFICATION_PAYLOAD;
    case REVOKE_CERTIFICATION:
      return REVOKE_CERTIFICATION_PAYLOAD;
    default:
      return DEFAULT_PAYLOAD;
  }
};


export default {
  createAddCertificationPayload,
  createDataPayload,
  createDefaultPayload,
  createRevokeCertificationPayload,
  createVotePayload,
  setPayload,
};
