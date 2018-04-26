import { hash } from 'cryptography';
import { Accounts } from '../account';
import txValueTransfer from './tx_valueTransfer';
import txWriterAssign from './tx_writerAssign';
import txMedicalRecord from './tx_medicalRecord';

/*
  VALUE_TRANSFER
  GO-MEDIBLOC TX

  chainID: 1
  from: 03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939
  to: 03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21
  value: 10
  nonce: 1
  type: "binary"
  payload: null
  timestamp: 1524549462850

  RESULT : 231d69dcd14b44d13022e9122e0bd0c053230719aec941d4ff2bc4d683679dbd
*/
const Vaccounts = new Accounts();
const Vuser = Vaccounts.newAccount('');

Vuser.balance = 10;
const VreceiverPubKey = '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21';
const valueTx = txValueTransfer.createTx(Vuser, VreceiverPubKey, 10);
valueTx.from = '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939';
valueTx.timestamp = 1524549462850;
valueTx.nonce = 1;
const valueTxHash = hash.fromJson(valueTx);
console.log(valueTxHash);
// const valueTxSignature = signTx.signHashedTx(valueTxHash, user, '');


/*
  REGISTER_WRITE_KEY
  GO-MEDIBLOC TX

  from: 03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939
  to: 000000000000000000000000000000000000000000000000000000000000000000
  value: 00000000000000000000000000000000
  timestamp: 1524549462850
  Type: 72656769737465725f776b6579, 13
  tx.data.Payload): 7b22577269746572223
  a22303365376237393465316465313835316235
  32616230623062393935636338373535383936333
  23635613762323636333066323665613862623931333
  16137653231227d, 79
  byteutils.FromUint64(tx.nonce)): 0000000000000001, 8
  byteutils.FromUint32(tx.chainID)): 00000001, 4
  byteutils.FromUint32(uint32(tx.alg))): 00000001, 4
  b57487f71559e999d1d90e80e5f25af8866b90acaed57dc574e06471bedfef10 (edited)
*/
const Raccounts = new Accounts();
const Ruser = Raccounts.newAccount('');

const RwriterPubKey = '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21';
const registerTx = txWriterAssign.createTx(Ruser, RwriterPubKey);
console.log(registerTx);
registerTx.from = '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939';
registerTx.nonce = 1;
registerTx.timestamp = 1524549462850;
const registerTxHash = hash.hashJson(registerTx);
console.log(registerTxHash);
// const registerTxSignature = signTx.signHashedTx(registerTxHash, user, '');


/*
  ADD_RECORD
  GO-MEDIBLOC TX

  tx.from.Bytes()): 02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472, 33
  tx.to.Bytes()): 000000000000000000000000000000000000000000000000000000000000000000, 33
  value): 00000000000000000000000000000000, 16
  byteutils.FromInt64(tx.timestamp)): 00000162f63aab42, 8
  []byte(tx.data.Type)): 6164645f7265636f7264, 13
  tx.data.Payload): 7b2248617368223a5b332c3233312c31
  38332c3134382c3232352c3232322c32342c38312c3138312
  c34322c3137362c3137362c3138352c3134392c3230342c31
  33352c38352c3133372c39392c33382c39302c3132332c333
  82c39392c31352c33382c3233342c3133392c3138352c3139
  2c32362c3132365d2c2253746f72616765223a226970667322
  2c22456e634b6579223a2271383376222c2253656564223a225
  875303d227d, 170
  nonce: 1
  chainID: 1
  alg: 1

  => 8e3754f70bc64158b9282092ccfd9bf32c8929d2f88ad2173af5088bb8b16bb7 (edited)
*/

const Aaccounts = new Accounts();
const Auser = Aaccounts.newAccount('');
const sampleMedicalData = {
  name: 'ggomma',
  age: 27,
  photo: 'blahblahblah',
};
const medicalDataOptions = {
  data: sampleMedicalData,
  storage: 'ipfs',
  ownerAccount: Auser,
  passphrase: '',
  writerPubKey: Auser.pubKey,
};
const medicalData = txMedicalRecord.createDataPayload(medicalDataOptions);
const medicalDataTx = txMedicalRecord.createTx(Auser, medicalData);
medicalDataTx.from = '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472';
medicalDataTx.nonce = 1;
medicalDataTx.timestamp = 1524549462850;
console.log(medicalDataTx);
const medicalDataTxHash = hash.hashJson(medicalDataTx);
console.log(medicalDataTxHash);
