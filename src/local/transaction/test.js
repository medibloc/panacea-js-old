import { hash, encrypt, keyGen, sign } from 'cryptography';
import { Accounts } from '../account';
import txValueTransfer from './tx_valueTransfer';
import txWriterAssign from './tx_writerAssign';
import txMedicalRecord from './tx_medicalRecord';
import { getTxHash, signTx, setTx } from './utils';

console.log('here')
// /*
//   TRANSACTION
// */


// Make User
// const accounts = new Accounts();
// accounts.newAccount();
// const mainUser = accounts.default;
// const receiver = accounts.newAccount();
// const doctor = accounts.newAccount();


// // Set user for value transfer transaction test
// mainUser.nonce = 0;
// mainUser.balance = 10;

// // Make Value Transaction
// const valueTx = txValueTransfer.createTx(mainUser, receiver.pubKey, 5);
// console.log(valueTx);
// const valueTxHash = getTxHash.getTxHash(valueTx);
// // console.log(valueTxHash);
// const valueTxSignature = signTx.signHashedTx(valueTxHash, mainUser, '');
// console.log(valueTxSignature);


// // Make Writer Assignmert Transaction
// const assignTx = txWriterAssign.createTx(mainUser, doctor.pubKey);
// // console.log(assignTx);
// const assignTxHash = getTxHash.getTxHash(assignTx);
// // console.log(assignTxHash);
// const assignTxSignature = signTx.signHashedTx(assignTxHash, mainUser, '');
// console.log(assignTxSignature);


// // Maker Medical Record Transaction
// const MEDICAL_RECORD = {
//   patient: 'ggomma',
//   doctor: 'ggomma',
//   timeStamp: 123456789,
//   location: 'seoul',
// };
// const medicalRecordHash = hash.hashData(MEDICAL_RECORD);
// // console.log(medicalRecordHash);
// const doctorSignature = sign.sign(doctor.getDecryptedPrivateKey(), medicalRecordHash);
// // console.log(doctorSignature);
// const encryptKey = keyGen.getRandomSeed();
// // console.log(encryptKey);
// const encryptedData = encrypt.encryptData(encryptKey, MEDICAL_RECORD);
// // console.log(encryptData);
// const encryptedDataHash = hash.hashData(encryptedData);
// // console.log(encryptedDataHash);
// const storage = 'medibloc.org';
// const medicalData = txMedicalRecord.createMedicalData(
//   encryptedDataHash,
//   encryptKey,
//   storage,
//   mainUser,
//   '',
//   doctor.pubKey,
// );
// // console.log(medicalData);
// const medicalRecordTx = txMedicalRecord.createTx(mainUser, doctorSignature, medicalData);
// // console.log(medicalRecordTx);
// const medicalRecordTxHash = getTxHash.getTxHash(medicalRecordTx);
// // console.log(medicalRecordTxHash);
// const medicalRecordTxSignature = signTx.signHashedTx(medicalRecordTxHash, mainUser, '');
// console.log(medicalRecordTxSignature);
