import binary from 'bops';
import { genPayloadBuf } from 'utils';
import { ALG, CHAIN_ID } from '../../../config';
import { ALGORITHM, PAYLOAD_TYPES } from './constants';
import * as jsonDescriptor from './proto/transaction.pb.json';

const defaultOptions = {
  alg: ALG,
  chain_id: CHAIN_ID,
  from: null,
  nonce: 0,
  payload: undefined,
  to: null,
  type: null,
  value: '0',
  hash_alg: ALGORITHM.SHA3256,
  crypto_alg: ALGORITHM.SECP256K1,
};

const setTx = (options) => {
  const opts = Object.assign({}, defaultOptions, options);
  const payloadType = PAYLOAD_TYPES[opts.type];
  const payloadBuf = payloadType ? genPayloadBuf(opts.payload, payloadType, jsonDescriptor) : null;
  return {
    chain_id: opts.chain_id,
    from: opts.from,
    nonce: opts.nonce,
    payload: payloadBuf ? binary.to(payloadBuf, 'hex') : undefined,

    timestamp: opts.timestamp || Math.floor(new Date().getTime() / 1000),
    to: opts.to,
    tx_type: opts.type,
    value: opts.value,
    hash_alg: opts.hash_alg,
    crypto_alg: opts.crypto_alg,
  };
};

export default setTx;
