import { sha3 } from 'utils';
import reader from './reader';
import helper from './helper';

const hashData = async (data, type, subType) => {
  const dataBuffer = await helper.makeBuffer(data, type, subType);
  return sha3(dataBuffer);
};

const hashDataFromFile = async (filePath, type, subType) => {
  let data;
  switch (type) {
    case 'dicom':
      return reader.hashDataStream(filePath);
    default:
      data = await reader.readData(filePath);
      return hashData(data, type, subType);
  }
};

export default {
  hashData,
  hashDataFromFile,
};
