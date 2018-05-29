import { BYTESIZES, TYPE, SUBTYPE, MHD_MAGICNUMBER } from './constants';

const genBuf = (size, param) => {
  const padding = (size * 2) - param.toString(16).length;
  const fixedParam = '0'.repeat(padding) + param.toString(16);
  return Buffer.alloc(size, fixedParam, 'hex');
};

const makeMHDHeader = (opts) => {
  const magicNumberBuffer = Buffer.alloc(BYTESIZES.MAGICNUMBER, MHD_MAGICNUMBER, 'hex');
  const versionBuffer = Buffer.alloc(BYTESIZES.VERSION, '0000', 'hex');
  const typeNum = opts.type && TYPE[opts.type.toUpperCase()] ? TYPE[opts.type.toUpperCase()] : 0;
  const typeBuffer = genBuf(BYTESIZES.TYPE, typeNum);
  const subTypeNum = opts.subType && SUBTYPE[typeNum][opts.subType.toUpperCase()] ?
    SUBTYPE[typeNum][opts.subType.toUpperCase()] : 0;
  const subTypeBuffer = genBuf(BYTESIZES.SUBTYPE, subTypeNum);
  const hashBuffer = Buffer.alloc(BYTESIZES.HASH, opts.hash, 'hex');
  const dataSizeBufffer = genBuf(BYTESIZES.DATASIZE, opts.size);
  return Buffer.concat([
    magicNumberBuffer,
    versionBuffer,
    typeBuffer,
    subTypeBuffer,
    hashBuffer,
    dataSizeBufffer,
  ]);
};

const makeMHD = opts => Buffer.concat([
  makeMHDHeader(opts),
  opts.dataBuffer,
]);

export default {
  makeMHDHeader,
  makeMHD,
};
