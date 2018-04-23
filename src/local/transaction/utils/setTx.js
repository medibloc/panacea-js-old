const setTx = (options) => {
  const {
    ownerAccount,
    to = null,
    value = null,
    nonce = null,
    chainId = 0, // TODO : check the number of chain_id
    alg = 1, // TODO : check the alg
    type = '', // TODO : Which types do we have?
    payload = null, // TODO : Any type of payload for value transfer and writer assignment?
  } = options;

  this.from = ownerAccount.pubKey;
  this.timestamp = Math.floor(new Date().getTime() / 1000);
  this.nonce = nonce || ownerAccount.nonce + 1;
  this.to = to;
  this.value = value;
  this.chain_id = chainId;
  this.alg = alg;

  this.data = {
    type,
    payload,
  };

  this.hash = null;
  this.sign = null;
};

setTx.prototype.setNonce = (nonce) => {
  this.nonce = nonce;
};

setTx.prototype.setSender = (account) => {
  this.from = account.pubKey;
};

setTx.prototype.setTimeStamp = () => {
  this.timestamp = Math.floor(new Date().getTime() / 1000);
};

setTx.prototype.setValue = (value) => {
  this.value = value;
};

setTx.prototype.setReceiver = (receiverPubKey) => {
  this.to = receiverPubKey;
};

setTx.prototype.setType = (type) => {
  this.data.type = type;
};


export default setTx;
