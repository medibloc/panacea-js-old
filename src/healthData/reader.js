import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';
import { hash as Hash } from 'cryptography';

const getFilePath = (filePath) => {
  let newFilePath = filePath;
  if (!path.isAbsolute(filePath)) {
    newFilePath = path.resolve(__dirname, filePath);
  }
  return newFilePath;
};

const getFileSize = async (filePath) => {
  const newFilePath = getFilePath(filePath);
  const stats = fs.statSync(newFilePath);
  return stats.size;
};

const hashStream = async stream => new Promise((resolve) => {
  const hash = Hash.createHash();
  stream.on('data', (data) => {
    hash.update(data);
  });
  stream.on('end', () => {
    resolve(hash.hex());
  });
});

const hashDataStream = async (filePath) => {
  const stream = fs.createReadStream(getFilePath(filePath));
  return hashStream(stream);
};

const readData = async (filePath) => {
  const newFilePath = getFilePath(filePath);
  const ext = path.extname(newFilePath);
  // TODO: support other extensions
  // TODO: check file size
  switch (ext) {
    case '.json':
      return jsonfile.readFileSync(newFilePath);
    case '.txt':
      return fs.readFileSync(newFilePath);
    case '.dcm':
      return fs.readFileSync(newFilePath);
    default:
      throw new Error('not supporting extension');
  }
};

export default {
  getFileSize,
  hashDataStream,
  readData,
};
