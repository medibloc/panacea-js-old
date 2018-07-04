import { BigNumber } from 'bignumber.js';
import { sha3_256 as SHA3256 } from 'js-sha3';
import { BYTESIZES } from './constants';

const genBuf = (param, size) => {
  const padding = (size * 2) - param.toString(16).length;
  const fixedParam = '0'.repeat(padding) + param.toString(16);
  return Buffer.alloc(size, fixedParam, 'hex');
};

const hashTx = (tx) => {
  const TX = JSON.parse(JSON.stringify(tx));

  const value = new BigNumber(TX.value); // From Decimal
  const valueBuffer = genBuf(value.toString(16), BYTESIZES.VALUE);

  const fromBuffer = Buffer.alloc(BYTESIZES.ADDRESS, TX.from, 'hex');
  const dataTypeBuffer = Buffer.from(TX.data.type, 'utf8');
  const toBuffer = TX.to ? Buffer.alloc(BYTESIZES.ADDRESS, TX.to, 'hex') : Buffer.alloc(BYTESIZES.ADDRESS);

  const dataPayloadBuffer = TX.data.payload ?
    Buffer.from(TX.data.payload) :
    Buffer.alloc(0);

  const timeStampBuffer = genBuf(TX.timestamp, BYTESIZES.TIMESTAMP);
  const nonceBuffer = genBuf(TX.nonce, BYTESIZES.NONCE);
  const chainIdBuffer = genBuf(TX.chain_id, BYTESIZES.CHAIN_ID);
  const algBuffer = genBuf(TX.alg, BYTESIZES.ALG);

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

  const hash = SHA3256.create();
  return hash.update(buf).hex();
};

export default hashTx;
