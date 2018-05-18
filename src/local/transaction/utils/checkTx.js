const checkRequiredParams = (tx, requiredParams) => {
  requiredParams.forEach((param) => {
    if (tx[param] === undefined && tx.data[param] === undefined) {
      throw new Error(`Transaction should have ${param} field.`);
    }
  });
};

export default {
  checkRequiredParams,
};
