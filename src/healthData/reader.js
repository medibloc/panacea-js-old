import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';
import { sha3Stream } from 'utils';

const getFilePath = (filePath) => {
  let newFilePath = filePath;
  if (!path.isAbsolute(filePath)) {
    newFilePath = path.resolve(__dirname, filePath);
  }
  return newFilePath;
};

const getFileSize = filePath =>
  new Promise((resolve, reject) => {
    const newFilePath = getFilePath(filePath);
    fs.stat(newFilePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats.size);
    });
  });

const hashDataStream = filePath =>
  new Promise((resolve) => {
    const stream = fs.createReadStream(getFilePath(filePath));
    sha3Stream(stream).then(hash => resolve(hash));
  });

const readData = filePath =>
  new Promise((resolve, reject) => {
    const newFilePath = getFilePath(filePath);
    const ext = path.extname(newFilePath);
    // TODO: support other extensions
    // TODO: check file size
    switch (ext) {
      case '.json':
        resolve(jsonfile.readFileSync(newFilePath));
        break;
      case '.txt':
        resolve(fs.readFileSync(newFilePath));
        break;
      case '.dcm':
        resolve(fs.readFileSync(newFilePath));
        break;
      default:
        reject(new Error('not supporting extension'));
    }
  });

export default {
  getFileSize,
  hashDataStream,
  readData,
};
