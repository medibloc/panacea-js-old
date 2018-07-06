import { genHexBuf } from 'utils';
import { BYTESIZES, TYPE, SUBTYPE, MHD_MAGICNUMBER } from './constants';

const makeMHDHeader = (opts) => {
  const magicNumberBuffer = genHexBuf(MHD_MAGICNUMBER, BYTESIZES.MAGICNUMBER);
  const versionBuffer = genHexBuf('0', BYTESIZES.VERSION);
  const typeNum = opts.type && TYPE[opts.type.toUpperCase()] ? TYPE[opts.type.toUpperCase()] : 0;
  const typeBuffer = genHexBuf(typeNum.toString(), BYTESIZES.TYPE);
  const subTypeNum = opts.subType && SUBTYPE[typeNum][opts.subType.toUpperCase()] ?
    SUBTYPE[typeNum][opts.subType.toUpperCase()] : 0;
  const subTypeBuffer = genHexBuf(subTypeNum.toString(), BYTESIZES.SUBTYPE);
  const hashBuffer = genHexBuf(opts.hash, BYTESIZES.HASH);
  const dataSizeBufffer = genHexBuf(opts.size.toString(), BYTESIZES.DATASIZE);
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
