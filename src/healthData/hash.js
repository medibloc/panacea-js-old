import { sha3 } from 'utils';
import reader from './reader';
import helper from './helper';

const hashData = (data, type, subType = null) =>
  new Promise((resolve, reject) => {
    helper.makeBuffer(data, type, subType)
      .then(dataBuffer => resolve(sha3(dataBuffer)))
      .catch(err => reject(err));
  });

const hashDataFromFile = (filePath, type, subType = null) =>
  new Promise((resolve, reject) => {
    switch (type) {
      case 'dicom':
        resolve(reader.hashDataStream(filePath));
        break;
      default:
        reader.readData(filePath)
          .then(data => resolve(hashData(data, type, subType)))
          .catch(err => reject(err));
    }
  });

export default {
  hashData,
  hashDataFromFile,
};
