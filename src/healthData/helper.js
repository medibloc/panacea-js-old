import path from 'path';
import protobuf from 'protobufjs';

const FHIRResources = [['patient', 'PatientData'], ['observation', 'Observation'], ['careplan', 'CarePlan']];
const FHIRResourcesMap = new Map(FHIRResources);

const decodeFHIR = (buffer, type) => protobuf.load(path.resolve(__dirname, `./proto/json/${type}.json`))
  .then((root) => {
    const Type = root.lookupType(FHIRResourcesMap.get(type));

    // Decode an Uint8Array (browser) or Buffer (node) to a message
    const message = Type.decode(buffer);

    const errMsg = Type.verify(message);
    if (errMsg) { throw Error(errMsg); }

    // Maybe convert the message back to a plain object
    return Type.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
      // see ConversionOptions
    });
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

const decodeJson = buffer => JSON.parse(buffer.toString());

const decodeTxt = buffer => buffer.toString();

const encodeFHIR = (obj, type) => protobuf.load(path.resolve(__dirname, `./proto/json/${type}.json`))
  .then((root) => {
    const Type = root.lookupType(FHIRResourcesMap.get(type));
    const errMsg = Type.verify(obj);
    if (errMsg) {
      throw new Error(errMsg);
    }

    // Create a new message
    const message = Type.create(obj); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    return Type.encode(message).finish();
  }).catch((err) => {
    console.log(err);
    throw err;
  });

const encodeJson = obj => Buffer.from(JSON.stringify(obj));

const encodeString = str => Buffer.from(str);

const makeBuffer = (data, type, subType) =>
  new Promise((resolve, reject) => {
    // TODO: support other types
    switch (type) {
      case 'medical-fhir':
        encodeFHIR(data, subType)
          .then(dataBuffer => resolve(dataBuffer))
          .catch(err => reject(err));
        break;
      case 'pghd':
        if (data instanceof Uint8Array || data instanceof Buffer) {
          resolve(data);
        } else if (typeof data === 'object') {
          resolve(encodeJson(data));
        } else if (typeof data === 'string') {
          resolve(encodeString(data));
        } else {
          reject(new Error('not supporting type'));
        }
        break;
      case 'dicom':
        resolve(data);
        break;
      default:
        reject(new Error('not supporting type'));
    }
  });

export default {
  decodeFHIR,
  decodeJson,
  decodeTxt,
  encodeFHIR,
  encodeJson,
  encodeString,
  makeBuffer,
};
