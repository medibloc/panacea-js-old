import { sha3_256 as SHA3256 } from 'js-sha3';
import { BigNumber } from 'bignumber.js';
import { BYTESIZES } from './constants';


const hashTx = (tx) => {
  if (typeof tx !== 'object') throw new Error('Transaction format should be object.');
  const TX = JSON.parse(JSON.stringify(tx));
  const hash = SHA3256.create();

  const fromBuffer = Buffer.alloc(BYTESIZES.ADDRESS, TX.from, 'hex');
  const dataTypeBuffer = Buffer.from(TX.data.type, 'utf8');
  const toBuffer = TX.to ? Buffer.alloc(BYTESIZES.ADDRESS, TX.to, 'hex') : Buffer.alloc(BYTESIZES.ADDRESS);

  const dataPayloadBuffer = TX.data.payload ?
    Buffer.from(TX.data.payload) :
    Buffer.alloc(0);

  const timeStampBuffer = Buffer.alloc(BYTESIZES.TIMESTAMP);
  const nonceBuffer = Buffer.alloc(BYTESIZES.NONCE);
  const chainIdBuffer = Buffer.alloc(BYTESIZES.CHAIN_ID);
  const algBuffer = Buffer.alloc(BYTESIZES.ALG);

  // const timestamp = (TX.timestamp - (TX.timestamp % 1000)) / 1000;
  timeStampBuffer.writeIntBE(TX.timestamp, 0, BYTESIZES.TIMESTAMP);
  nonceBuffer.writeIntBE(TX.nonce, 0, BYTESIZES.NONCE);
  algBuffer.writeIntBE(TX.alg, 0, BYTESIZES.ALG);
  chainIdBuffer.writeIntBE(TX.chain_id, 0, BYTESIZES.CHAIN_ID);

  // VALUE
  if (typeof TX.value !== 'string') throw new Error('Type of value need to be string');
  const value = new BigNumber(TX.value); // From Decimal
  const MAX_VALUE = new BigNumber('ffffffffffffffffffffffffffffffff', 16);
  if (value.lt(0)) throw new Error('Can not send negative value');
  if (value.gt(MAX_VALUE)) throw new Error('Amount is too large');
  const padding = (BYTESIZES.VALUE * 2) - value.toString(16).length;
  const fixedValue = (padding === 0 ?
    value.toString(16) :
    '0'.repeat(padding) + value.toString(16));
  const valueBuffer = Buffer.alloc(BYTESIZES.VALUE, fixedValue, 'hex');

  // console.log(fromBuffer);
  // console.log(toBuffer);
  // console.log(valueBuffer);
  // console.log(timeStampBuffer);
  // console.log(dataTypeBuffer);
  // console.log(dataPayloadBuffer);
  // console.log(nonceBuffer);
  // console.log(chainIdBuffer);
  // console.log(algBuffer);

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
