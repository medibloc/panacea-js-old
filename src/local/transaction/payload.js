import {
  DATA_UPLOAD,
  VOTE,

  ADD_RECORD_PAYLOAD,
  DEFAULT_PAYLOAD,
  VOTE_PAYLOAD,
} from './utils/constants';


const createDataPayload = hash => ({
  Hash: Buffer.from(hash, 'hex').toString('base64'),
});

const setPayload = (txType) => {
  switch (txType) {
    case DATA_UPLOAD:
      return ADD_RECORD_PAYLOAD;
    case VOTE:
      return VOTE_PAYLOAD;
    // Add Certification
    // Revoke Certification
    default:
      return DEFAULT_PAYLOAD;
  }
};


export default {
  createDataPayload,
  setPayload,
};
