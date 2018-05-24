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
  UNKNOWN: 0,
  'MEDICAL-FHIR': 1,
  'CLAIM-FHIR': 2,
  DICOM: 3,
  GENOMICS: 4,
  PGHD: 5,
};
export const TYPE_REV = {
  0: 'unknown',
  1: 'medical-fhir',
  2: 'claim-fhir',
  3: 'dicom',
  4: 'genomics',
  5: 'pghd',
};
export const SUBTYPE = [
  {
    // unknown
    NULL: 0,
  },
  {
    // medical-fhir
    NULL: 0,
    PATIENT: 1,
    OBSERVATION: 2,
    CAREPLAN: 3,
  },
  {
    // claim-fhir
    NULL: 0,
    CLAIM: 1,
  },
  {
    // dicom
    NULL: 0,
  },
  {
    // genomics
    NULL: 0,
    VCF: 1,
    BAM: 2,
  },
  {
    // pghd
    NULL: 0,
  },
];
export const SUBTYPE_REV = [
  {
    // unknown
    0: 'null',
  },
  {
    // medical-fhir
    0: 'null',
    1: 'patient',
    2: 'observation',
    3: 'claim',
    4: 'careplan',
  },
  {
    // claim-fhir
    0: 'null',
  },
  {
    // dicom
    0: 'null',
  },
  {
    // genomics
    0: 'null',
    1: 'vcf',
    2: 'bam',
  },
  {
    // pghd
    0: 'null',
  },
];
