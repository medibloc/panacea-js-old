import { BigNumber } from 'bignumber.js';
import binary from 'bops';
import { sha3_256 as SHA3256 } from 'js-sha3';
import protobuf from 'protobufjs/light';
import { genHexBuf } from 'utils';
import { BYTESIZES } from './constants';
import * as jsonDescriptor from './proto/transaction.pb.json';

const hashTx = (tx) => {
  // TODO @ggomma defaultPayload string check
  const txHashTarget = {
    txType: tx.tx_type,
    from: genHexBuf(tx.from, BYTESIZES.ADDRESS),
    to: genHexBuf(tx.to ? tx.to : '', BYTESIZES.ADDRESS),
    value: genHexBuf(tx.value ? BigNumber(tx.value).toString(16) : '', BYTESIZES.VALUE),
    timestamp: tx.timestamp,
    nonce: tx.nonce,
    chainId: tx.chain_id,
    payload: (tx.payload === undefined || tx.payload === "") ? null : binary.from(tx.payload, 'hex'),
  };

  const root = protobuf.Root.fromJSON(jsonDescriptor);
  const TxHashTarget = root.lookupType('TransactionHashTarget');
  const errMsg = TxHashTarget.verify(txHashTarget);
  if (errMsg) throw Error(errMsg);

  const message = TxHashTarget.create(txHashTarget);
  const buf = TxHashTarget.encode(message).finish();
  const hash = SHA3256.create();
  return hash.update(buf).hex();
};

export default hashTx;
