import { CHAIN_ID, ALG } from 'config';

const defaultOptions = {
  from: null,
  to: null,
  value: '0',
  nonce: 0,
  chain_id: CHAIN_ID,
  alg: ALG,
  payload: undefined,
  type: null,
};

const setTx = (options) => {
  const opts = Object.assign({}, defaultOptions, options);
  const tx = {
    from: opts.from,
    timestamp: opts.timestamp || Math.floor(new Date().getTime()),
    nonce: opts.nonce,
    to: opts.to,
    value: opts.value,
    chain_id: opts.chain_id,
    alg: opts.alg,
    data: {
      type: opts.type,
      payload: JSON.stringify(opts.payload),
    },
  };
  return JSON.parse(JSON.stringify(tx));
};

export default setTx;
