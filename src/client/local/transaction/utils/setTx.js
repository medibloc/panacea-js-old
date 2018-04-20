const setNonce = (tx, account) => Object.assign({}, tx, { nonce: account.nonce + 1 });

const setSender = (tx, account) => Object.assign({}, tx, { from: account.pubKey });

const setSignature = (tx, doctorSignature) => Object.assign({}, tx, { doctorSignature });

const setTimeStamp = tx => (
  Object.assign({}, tx, { timeStamp: Math.floor(new Date().getTime() / 1000) })
);

const setWriter = (tx, writer) => Object.assign({}, tx, { writer });

const setAmount = (tx, amount) => Object.assign({}, tx, { amount });

const setReceiver = (tx, to) => Object.assign({}, tx, { to });

const setType = (tx, type) => Object.assign({}, tx, { type });

const setCommon = (tx, account) => (
  Object.assign({}, setNonce(tx, account), setSender(tx, account), setTimeStamp(tx))
);


export default {
  setNonce,
  setSender,
  setSignature,
  setCommon,
  setTimeStamp,
  setAmount,
  setReceiver,
  setWriter,
  setType,
};
