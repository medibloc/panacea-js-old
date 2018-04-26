import { sha3_256 as SHA3256 } from 'js-sha3';
import { BYTESIZES } from './constants';

const hashTx = (tx) => {
  if (typeof tx !== 'object') throw new Error('Transaction format should be object.');
  const hash = SHA3256.create();

  const fromBuffer = Buffer.alloc(BYTESIZES.ADDRESS, tx.from, 'hex');
  const dataTypeBuffer = Buffer.from(tx.data.type, 'utf8');
  const toBuffer = tx.to ? Buffer.alloc(BYTESIZES.ADDRESS, tx.to, 'hex') : Buffer.alloc(BYTESIZES.ADDRESS);

  const dataPayloadBuffer = tx.data.payload ?
    Buffer.from(JSON.stringify(tx.data.payload)) :
    Buffer.alloc(0);

  const timeStampBuffer = Buffer.alloc(BYTESIZES.TIMESTAMP);
  const nonceBuffer = Buffer.alloc(BYTESIZES.NONCE);
  const chainIdBuffer = Buffer.alloc(BYTESIZES.CHAIN_ID);
  const algBuffer = Buffer.alloc(BYTESIZES.ALG);

  timeStampBuffer.writeIntBE(tx.timestamp, 0, BYTESIZES.TIMESTAMP);
  nonceBuffer.writeIntBE(tx.nonce, 0, BYTESIZES.NONCE);
  algBuffer.writeIntBE(tx.alg, 0, BYTESIZES.ALG);
  chainIdBuffer.writeIntBE(tx.chain_id, 0, BYTESIZES.CHAIN_ID);

  // VALUE
  const valueBuffer = Buffer.alloc(BYTESIZES.VALUE);
  const { value } = tx;
  const MAX_VALUE = 0xffffffffffffffffffffffff;
  if (value < 0) throw new Error('Can not send negative value');
  if (value > MAX_VALUE) throw new Error('Amount is too large');
  valueBuffer.writeIntBE(value, 0, BYTESIZES.VALUE);

  const buf = Buffer.concat([
    fromBuffer,
    toBuffer,
    valueBuffer,
    timeStampBuffer,
    dataTypeBuffer,
    dataPayloadBuffer,
    nonceBuffer,
    chainIdBuffer,
    algBuffer,
  ]);

  hash.update(buf);
  return hash.hex();
};


export default hashTx;
