import { sha3 } from 'utils';
import { BYTESIZES, OFFSETS, TYPE_REV, SUBTYPE_REV } from './constants';
import Helper from './helper';
import Reader from './reader';
import mhd from './mhd';

const decodeData = data =>
  new Promise((resolve, reject) => {
    if (!(data instanceof Buffer || data instanceof Uint8Array)) {
      reject(new Error('not supporting data type'));
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
        Helper.decodeFHIR(buffer, SUBTYPE_REV[type][subType])
          .then(obj => resolve(obj))
          .catch(err => reject(err));
        break;
      case 'pghd':
        if (buffer instanceof Uint8Array || buffer instanceof Buffer) {
          resolve(Helper.decodeTxt(buffer));
        } else if (typeof buffer === 'object') {
          resolve(Helper.decodeJson(buffer));
        }
        reject(new Error('not supporting type'));
        break;
      default:
        reject(new Error('not supporting type'));
    }
  });

const decodeDataFromFile = filePath =>
  new Promise((resolve, reject) => {
    // TODO: read file as Buffer or Uint8Array
    Reader.readData(filePath)
      .then(data => decodeData(data))
      .catch(err => reject(err));
  });

const encodeData = (data, type, subType) =>
  new Promise((resolve, reject) => {
    Helper.makeBuffer(data, type, subType)
      .then(dataBuffer => resolve(mhd.makeMHD({
        type,
        subType,
        hash: sha3(dataBuffer),
        size: dataBuffer.length,
        dataBuffer,
      })))
      .catch(err => reject(err));
  });

const encodeDataFromFile = (filePath, type, subType) =>
  new Promise((resolve, reject) => {
    Reader.readData(filePath)
      .then(data => resolve(encodeData(data, type, subType)))
      .catch(err => reject(err));
  });

export default {
  decodeData,
  decodeDataFromFile,
  encodeData,
  encodeDataFromFile,
};
