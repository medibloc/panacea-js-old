import binary from 'bops';
import { genPayloadBuf } from 'utils';
import { CHAIN_ID } from '../../../config';
import { ALGORITHM, PAYLOAD_TYPES } from './constants';
import * as jsonDescriptor from './proto/transaction.pb.json';

const defaultOptions = {
  chain_id: CHAIN_ID,
  crypto_alg: ALGORITHM.SECP256K1,
  from: null,
  hash_alg: ALGORITHM.SHA3256,
  nonce: 0,
  payload: undefined,
  to: null,
  type: null,
  value: '0',
};

const setTx = (options) => {
  const opts = Object.assign({}, defaultOptions, options);
  const payloadType = PAYLOAD_TYPES[opts.type];
  const payloadBuf = payloadType ? genPayloadBuf(opts.payload, payloadType, jsonDescriptor) : null;
  return {
    chain_id: opts.chain_id,
    crypto_alg: opts.crypto_alg,
    from: opts.from,
    hash_alg: opts.hash_alg,
    nonce: opts.nonce,
    payload: payloadBuf ? binary.to(payloadBuf, 'hex') : undefined,

    timestamp: opts.timestamp || Math.floor(new Date().getTime() / 1000),
    to: opts.to,
    tx_type: opts.type,
    value: opts.value,
  };
};

export default setTx;
