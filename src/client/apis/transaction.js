import { parseTransaction, parseTransactions } from '../parser';

export default ({ sendRequest }) => {
  const getPendingTransactions = () => sendRequest({
    method: 'get',
    parser: parseTransactions,
    path: 'v1/transactions/pending',
  });

  const getTransaction = hash => sendRequest({
    method: 'get',
    parser: parseTransaction,
    path: 'v1/transaction',
    payload: {
      hash,
    },
  });

  const getTransactionReceipt = hash => sendRequest({
    method: 'get',
    path: 'v1/transaction/receipt',
    payload: {
      hash,
    },
  });

  const sendTransaction = tx => sendRequest({
    method: 'post',
    path: 'v1/transaction',
    ...tx.rawTx && tx.hash && tx.sign && {
      payload: {
        ...tx.rawTx,
        hash: tx.hash,
        payer_sign: tx.payerSign,
        sign: tx.sign,
      },
    },
  });

  return {
    getPendingTransactions,
    getTransaction,
    getTransactionReceipt,
    sendTransaction,
  };
};
