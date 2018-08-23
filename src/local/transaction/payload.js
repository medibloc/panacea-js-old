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


const createAddCertificationPayload = ({
  issueTime = Math.floor(new Date().getTime() / 1000),
  expirationTime = Math.floor(new Date(new Date()
    .setFullYear(new Date()
      .getFullYear() + 1))
    .getTime() / 1000), // 1 year later
  hash,
}) => {
  if (issueTime > expirationTime) throw new Error('Issuacne time should be earlier than expiration time');
  return ({
    issueTime,
    expirationTime,
    hash,
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
