const defaultOptions = {
  from: null,
  to: null,
  value: 0,
  nonce: 0,
  chain_id: 1,
  alg: 1,
  payload: null,
  type: null,
};

const setTx = (options) => {
  const opts = Object.assign({}, defaultOptions, options);
  const tx = {
    from: opts.from,
    timestamp: Math.floor(new Date().getTime()),
    nonce: opts.nonce,
    to: opts.to,
    value: opts.value,
    chain_id: opts.chain_id,
    alg: opts.alg,
    data: {
      type: opts.type,
      payload: opts.payload,
    },
  };
  return tx;
};

export default setTx;
