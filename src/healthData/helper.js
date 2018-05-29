import path from 'path';
import protobuf from 'protobufjs';

const FHIRResources = [['patient', 'PatientData'], ['observation', 'Observation'], ['careplan', 'CarePlan']];
const FHIRResourcesMap = new Map(FHIRResources);

// TODO: test file path is valid on the other env.
const decodeFHIR = (buffer, type) => protobuf.load(path.resolve(`src/healthData/proto/json/${type}.json`))
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

const decodeJson = buffer => JSON.parse(buffer.toString());

const decodeTxt = buffer => buffer.toString();

// TODO: test file path is valid on the other env.
const encodeFHIR = (obj, type) => protobuf.load(path.resolve(`src/healthData/proto/json/${type}.json`))
  .then((root) => {
    const Type = root.lookupType(FHIRResourcesMap.get(type));
    const errMsg = Type.verify(obj);
    if (errMsg) {
      throw new Error(errMsg);
    }

    // Create a new message
    const message = Type.create(obj); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    const buffer = Type.encode(message).finish();

    return buffer;
  }).catch((err) => {
    console.log(err);
    throw err;
  });

const encodeJson = obj => Buffer.from(JSON.stringify(obj));

const makeBuffer = async (data, type, subType) => {
  let dataBuffer;
  // TODO: support other types
  switch (type) {
    case 'medical-fhir':
      dataBuffer = await encodeFHIR(data, subType);
      break;
    case 'pghd':
      if (data instanceof Uint8Array || data instanceof Buffer) {
        dataBuffer = data;
      } else if (typeof data === 'object') {
        dataBuffer = encodeJson(data);
      }
      break;
    case 'dicom':
      dataBuffer = data;
      break;
    default:
      return new Error('not supporting type');
  }
  return dataBuffer;
};

export default {
  decodeFHIR,
  decodeJson,
  decodeTxt,
  encodeFHIR,
  encodeJson,
  makeBuffer,
};
