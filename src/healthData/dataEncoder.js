import fs from 'fs';
import path from 'path';
import protobuf from 'protobufjs';

const FHIRResources = [['careplan', 'CarePlan'], ['observation', 'Observation'], ['patient', 'PatientData']];
const FHIRResourcesMap = new Map(FHIRResources);

// TODO: test file path is valid on the other env.
const decodeToFHIR = (buffer, type) => protobuf.load(path.resolve(`src/healthData/proto/json/${type}.json`))
  .then((root) => {
    const Type = root.lookupType(FHIRResourcesMap.get(type));

    // Decode an Uint8Array (browser) or Buffer (node) to a message
    const message = Type.decode(buffer);

    const errMsg = Type.verify(message);
    if (errMsg) { throw Error(errMsg); }

    // Maybe convert the message back to a plain object
    const object = Type.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
      // see ConversionOptions
    });

    return object;
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

const decodeTxt = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(data);
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};

// TODO: test file path is valid on the other env.
const encodeFromFHIR = (obj, type) => protobuf.load(path.resolve(`src/healthData/proto/json/${type}.json`))
  .then((root) => {
    const Type = root.lookupType(FHIRResourcesMap.get(type));
    const errMsg = Type.verify(obj);
    if (errMsg) { throw Error(errMsg); }

    // Create a new message
    const message = Type.create(obj); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    const buffer = Type.encode(message).finish();
    console.log(buffer);

    return buffer;
  }).catch((err) => {
    console.log(err);
    throw err;
  });

const encodeTxt = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(data);
    return JSON.stringify(data);
  } catch (err) {
    throw err;
  }
};

export default {
  decodeToFHIR,
  decodeTxt,
  encodeFromFHIR,
  encodeTxt,
};
