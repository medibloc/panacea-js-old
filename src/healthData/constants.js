export const BYTESIZES = {
  MAGICNUMBER: 4,
  VERSION: 2,
  TYPE: 2,
  SUBTYPE: 2,
  HASH: 32,
  DATASIZE: 6,
};
export const OFFSETS = {
  MAGICNUMBER: 0,
  VERSION: 4,
  TYPE: 6,
  SUBTYPE: 8,
  HASH: 10,
  DATASIZE: 42,
  DATA: 48,
};
export const MHD_MAGICNUMBER = '004d4844';
export const TYPE = {
  FHIR: 0,
  TXT: 1,
  DICOM: 2,
};
export const TYPE_REV = {
  0: 'fhir',
  1: 'txt',
  2: 'dicom',
};
export const SUBTYPE = [
  {
    PATIENT: 0,
    OBSERVATION: 1,
    CLIAM: 2,
    CAREPLAN: 3,
  },
];
export const SUBTYPE_REV = [
  {
    0: 'patient',
    1: 'observation',
    2: 'claim',
    3: 'careplan',
  },
];
