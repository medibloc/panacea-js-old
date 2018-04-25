const checkRequiredParams = (tx, requiredParams) => {
  let error = null;
  requiredParams.forEach((param) => {
    if (tx[param] === undefined) error = true;
  });
  if (error) return false;
  return true;
};


const checkNonce = (tx, account) => {
  if (tx.nonce === account.nonce + 1) return true;
  return false;
};


const checkBalance = (tx, account) => {
  if (tx.amount <= account.balance) return true;
  return false;
};


export default {
  checkRequiredParams,
  checkNonce,
  checkBalance,
};
