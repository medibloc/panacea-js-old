export const parseTransaction = tx => ({
  ...tx,
  timestamp: ((tx || {}).receipt || {}).timestamp,
});

export const parseTransactions = transactions =>
  transactions.map(tx => ({
    ...tx,
    timestamp: ((tx || {}).receipt || {}).timestamp,
  }));
