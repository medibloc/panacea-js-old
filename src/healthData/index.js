import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';
import { hash } from 'cryptography';
import DataEncoder from './dataEncoder';
import { BYTESIZES, OFFSETS, TYPE, TYPE_REV, SUBTYPE, SUBTYPE_REV, MHD_MAGICNUMBER } from './constants';

const decodeData = async (mhd) => {
  if (!(mhd instanceof Buffer || mhd instanceof Uint8Array)) {
    return new Error('not supporting data type');
  }
  // TODO: check magic number
  // TODO: check protocol version
  // parsing type
  const type = parseInt(mhd.slice(
    OFFSETS.TYPE,
    OFFSETS.TYPE + BYTESIZES.TYPE,
  ).toString('hex'), 16);
  // parsing subType
  const subType = parseInt(mhd.slice(
    OFFSETS.SUBTYPE,
    OFFSETS.SUBTYPE + BYTESIZES.SUBTYPE,
  ).toString('hex'), 16);
  // TODO: parsing data hash
  // TODO: check data hash
  // parsing data size
  const dataSize = parseInt(mhd.slice(
    OFFSETS.DATASIZE,
    OFFSETS.DATASIZE + BYTESIZES.DATASIZE,
  ).toString('hex'), 16);
  // TODO: check data size
  const data = mhd.slice(
    OFFSETS.DATA,
    OFFSETS.DATA + dataSize,
  );

  switch (TYPE_REV[type]) {
    case 'medical-fhir':
      return DataEncoder.decodeFHIR(data, SUBTYPE_REV[type][subType]);
    case 'pghd':
      if (data instanceof Uint8Array || data instanceof Buffer) {
        return DataEncoder.decodeTxt(data);
      } else if (typeof data === 'object') {
        return DataEncoder.decodeJson(data);
      }
      return new Error('not supporting type');
    default:
      throw new Error('not supporting type');
  }
};

const decodeDataFromFile = (filePath) => {
  try {
    // TODO: read file as Buffer or Uint8Array
    const data = fs.readFileSync(filePath);
    return decodeData(data);
  } catch (err) {
    throw err;
  }
};

const genBuf = (size, param) => {
  const padding = (size * 2) - param.toString(16).length;
  const fixedParam = '0'.repeat(padding) + param.toString(16);
  return Buffer.alloc(size, fixedParam, 'hex');
};

const makeMHD = (opts) => {
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
    opts.dataBuffer,
  ]);
};

const encodeData = async (data, type, subType) => {
  let dataBuffer;
  // TODO: support other types
  switch (type) {
    case 'medical-fhir':
      dataBuffer = await DataEncoder.encodeFHIR(data, subType);
      break;
    case 'pghd':
      if (data instanceof Uint8Array || data instanceof Buffer) {
        dataBuffer = data;
      } else if (typeof data === 'object') {
        dataBuffer = DataEncoder.encodeJson(data);
      }
      break;
    default:
      return new Error('not supporting type');
  }
  return makeMHD({
    type,
    subType,
    hash: hash.hashData(dataBuffer),
    size: dataBuffer.length,
    dataBuffer,
  });
};

const encodeDataFromFile = async (filePath, type, subType) => {
  let newFilePath = filePath;
  if (!path.isAbsolute(filePath)) {
    newFilePath = path.resolve(__dirname, filePath);
  }
  const ext = path.extname(newFilePath);
  let data;
  // TODO: support other extensions
  if (ext === '.json') {
    data = jsonfile.readFileSync(newFilePath);
  } else if (ext === '.txt') {
    data = fs.readFileSync(newFilePath);
  } else {
    throw new Error('not supporting extension');
  }
  return encodeData(data, type, subType);
};

export default {
  decodeData,
  decodeDataFromFile,
  encodeData,
  encodeDataFromFile,
};
