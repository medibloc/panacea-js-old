import { BigNumber } from 'bignumber.js';
import { sha3_256 as SHA3256 } from 'js-sha3';
import protobuf from 'protobufjs/light';
import { genHexBuf } from 'utils';
import { BYTESIZES } from './constants';
import * as jsonDescriptor from './proto/transaction.pb.json';

const hashTx = (tx) => {
  const value = new BigNumber(tx.value);

  const txHashTarget = {
    from: genHexBuf(tx.from, BYTESIZES.ADDRESS),
    to: genHexBuf(tx.to ? tx.to : '', BYTESIZES.ADDRESS),
    value: genHexBuf(value.toString(16), BYTESIZES.VALUE),
    data: {
      type: tx.data.type,
      payload: tx.data.payload ? Buffer.from(tx.data.payload) : null,
    },
    timestamp: tx.timestamp,
    nonce: tx.nonce,
    chainId: tx.chain_id,
  };
  const root = protobuf.Root.fromJSON(jsonDescriptor);
  const TxHashTarget = root.lookupType('TransactionHashTarget');
  const errMsg = TxHashTarget.verify(txHashTarget);
  if (errMsg) {
    throw Error(errMsg);
  }
  const message = TxHashTarget.create(txHashTarget);
  const buf = TxHashTarget.encode(message).finish();

  const hash = SHA3256.create();
  return hash.update(buf).hex();
};

export default hashTx;
