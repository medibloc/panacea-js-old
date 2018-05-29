import { hash as Hash } from 'cryptography';
import Reader from './reader';
import Helper from './helper';

const hashData = async (data, type, subType) => {
  const dataBuffer = await Helper.makeBuffer(data, type, subType);
  return Hash.hashData(dataBuffer);
};

const hashDataFromFile = async (filePath, type, subType) => {
  let data;
  switch (type) {
    case 'dicom':
      return Reader.hashDataStream(filePath);
    default:
      data = await Reader.readData(filePath);
      return hashData(data, type, subType);
  }
};

export default {
  hashData,
  hashDataFromFile,
};
