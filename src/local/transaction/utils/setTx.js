const setTx = (options) => {
  const {
    ownerAccount,
    to = null,
    value = 0,
    nonce = null,
    chainId = 1, // TODO : check the number of chain_id
    alg = 1, // TODO : check the alg
    type = '', // TODO : Which types do we have?
    payload = null, // TODO : Any type of payload for value transfer and writer assignment?
  } = options;

  const tx = {};
  tx.from = ownerAccount.pubKey;
  tx.timestamp = Math.floor(new Date().getTime());
  tx.nonce = nonce || ownerAccount.nonce + 1;
  tx.to = to;
  tx.value = value;
  tx.chain_id = chainId;
  tx.alg = alg;

  tx.data = {
    type,
    payload,
  };

  tx.hash = null;
  tx.sign = null;
  return tx;
};

export default setTx;
