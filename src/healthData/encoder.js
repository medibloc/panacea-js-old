import { hash as Hash } from 'cryptography';
import { BYTESIZES, OFFSETS, TYPE_REV, SUBTYPE_REV } from './constants';
import Helper from './helper';
import Reader from './reader';
import mhd from './mhd';

const decodeData = async (data) => {
  if (!(data instanceof Buffer || data instanceof Uint8Array)) {
    return new Error('not supporting data type');
  }
  // TODO: check magic number
  // TODO: check protocol version
  // parsing type
  const type = parseInt(data.slice(
    OFFSETS.TYPE,
    OFFSETS.TYPE + BYTESIZES.TYPE,
  ).toString('hex'), 16);
  // parsing subType
  const subType = parseInt(data.slice(
    OFFSETS.SUBTYPE,
    OFFSETS.SUBTYPE + BYTESIZES.SUBTYPE,
  ).toString('hex'), 16);
  // TODO: parsing data hash
  // TODO: check data hash
  // parsing data size
  const dataSize = parseInt(data.slice(
    OFFSETS.DATASIZE,
    OFFSETS.DATASIZE + BYTESIZES.DATASIZE,
  ).toString('hex'), 16);
  // TODO: check data size
  const buffer = data.slice(
    OFFSETS.DATA,
    OFFSETS.DATA + dataSize,
  );

  switch (TYPE_REV[type]) {
    case 'medical-fhir':
      return Helper.decodeFHIR(buffer, SUBTYPE_REV[type][subType]);
    case 'pghd':
      if (buffer instanceof Uint8Array || buffer instanceof Buffer) {
        return Helper.decodeTxt(buffer);
      } else if (typeof buffer === 'object') {
        return Helper.decodeJson(buffer);
      }
      return new Error('not supporting type');
    default:
      throw new Error('not supporting type');
  }
};

const decodeDataFromFile = async (filePath) => {
  try {
    // TODO: read file as Buffer or Uint8Array
    const data = await Reader.readData(filePath);
    return decodeData(data);
  } catch (err) {
    throw err;
  }
};

const encodeData = async (data, type, subType) => {
  const dataBuffer = await Helper.makeBuffer(data, type, subType);
  return mhd.makeMHD({
    type,
    subType,
    hash: Hash.hashData(dataBuffer),
    size: dataBuffer.length,
    dataBuffer,
  });
};

const encodeDataFromFile = async (filePath, type, subType) => {
  const data = await Reader.readData(filePath);
  return encodeData(data, type, subType);
};

export default {
  decodeData,
  decodeDataFromFile,
  encodeData,
  encodeDataFromFile,
};
