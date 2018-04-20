const checkRequiredParams = (tx, requiredParams) => {
  requiredParams.forEach((param) => {
    if (tx[param] === undefined) throw new Error(`${param} is required.`);
  });
  return true;
};

// Account Object
const checkNonce = (tx, account) => {
  if (tx.nonce === account.nonce + 1) return true;
  throw new Error('Invalid nonce.');
};


const checkBalance = (tx, account) => {
  if (tx.amount <= account.balance) return true;
  throw new Error('Invalid balance.');
};


export default {
  checkRequiredParams,
  checkNonce,
  checkBalance,
};
