const checkRequiredParams = (tx, requiredParams) => {
  requiredParams.forEach((param) => {
    if (tx[param] === undefined && tx.data[param] === undefined) {
      throw new Error(`Transaction should have ${param} field.`);
    }
  });
  return true;
};


// const checkNonce = (tx, account) => {
//   if (tx.nonce === account.nonce + 1) return true;
//   throw new Error('Transaction nonce should be increased by one.');
// };


// const checkBalance = (tx, pubKey) => {
//   if (tx.value <= account.balance) return true;
//   throw new Error('The amount of token trying to send should be less than the account has.');
// };


export default {
  checkRequiredParams,
  // checkNonce,
  // checkBalance,
};
