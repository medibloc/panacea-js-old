import binary from 'bops';
import { genPayloadBuf } from 'utils';
import { ALG, CHAIN_ID } from '../../../config';
import { getPayloadType } from '../payload';
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
};

const setTx = (options) => {
  const opts = Object.assign({}, defaultOptions, options);
  const payloadType = getPayloadType(opts.type);
  const payloadBuf = genPayloadBuf(opts.payload, payloadType, jsonDescriptor);
  return {
    alg: opts.alg,
    chain_id: opts.chain_id,
    from: opts.from,
    nonce: opts.nonce,
    payload: payloadBuf ? binary.to(payloadBuf, 'hex') : undefined,

    timestamp: opts.timestamp || Math.floor(new Date().getTime() / 1000),
    to: opts.to,
    tx_type: opts.type,
    value: opts.value,
  };
};

export default setTx;
