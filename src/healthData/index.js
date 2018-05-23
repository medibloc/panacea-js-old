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

  let result;
  switch (TYPE_REV[type]) {
    case 'fhir':
      result = await DataEncoder.decodeToFHIR(data, SUBTYPE_REV[type][subType]);
      break;
    case 'txt':
      result = await DataEncoder.decodeToTxt(data);
      break;
    default:
      throw new Error('not supporting type');
  }
  console.log(result);
  // temporary function for test
  fs.writeFileSync(path.resolve(`src/healthData/samples/${SUBTYPE_REV[type][subType]}_decoded.json`), JSON.stringify(result, null, 2));

  return result;
};

const decodeDataFromFile = (filePath) => {
  try {
    // TODO: read file as Buffer or Uint8Array
    const data = fs.readFileSync(filePath);
    console.log(data);
    return decodeData(data);
  } catch (err) {
    console.log(err);
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
  const typeNum = TYPE[opts.type.toUpperCase()];
  const typeBuffer = genBuf(BYTESIZES.TYPE, typeNum);
  const subTypeNum = SUBTYPE[typeNum][opts.subType.toUpperCase()];
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
  switch (type) {
    case 'fhir':
      dataBuffer = await DataEncoder.encodeFromFHIR(data, subType);
      break;
    case 'txt':
      dataBuffer = await DataEncoder.encodeTxt(data);
      break;
    default:
      return new Error('not supporting type');
  }
  const result = makeMHD({
    type,
    subType,
    hash: hash.hashData(dataBuffer),
    size: dataBuffer.length,
    dataBuffer,
  });
  console.log(result);
  // temporary function for test
  fs.writeFileSync(path.resolve(`src/healthData/samples/${subType}.txt`), result, 'binary');

  return result;
};

const encodeDataFromFile = async (filePath, type, subType) => {
  const ext = path.extname(filePath);
  let data;
  // TODO: support other extensions
  if (ext === '.json') {
    data = jsonfile.readFileSync(filePath);
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
