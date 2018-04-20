import { Accounts } from '../account';
import tx_valueTransfer from './tx_valueTransfer';
import tx_writerAssign from './tx_writerAssign';
import tx_medicalRecord from './tx_medicalRecord';
import { getTxHash, signTx } from './utils';
import { hash, encrypt, keyGen, sign } from '../../../crypto';


// Make User
const accounts = new Accounts();
accounts.newAccount();
const mainUser = accounts.default;
const receiver = accounts.newAccount();
const doctor = accounts.newAccount();


// Set user for value transfer transaction test
mainUser.nonce = 0;
mainUser.balance = 10;

// Make Value Transaction
const valueTx = tx_valueTransfer.createTx(mainUser, receiver.pubKey, 5);
const valueTxHash = getTxHash.getTxHash(valueTx);
const valueTxSignature = signTx.signHashedTx(valueTxHash, mainUser, '');


// Make Writer Assignmert Transaction
const assignTx = tx_writerAssign.createTx(mainUser, doctor.pubKey);
const assignTxHash = getTxHash.getTxHash(assignTx);
const assignTxSignature = signTx.signHashedTx(assignTxHash, mainUser, '');


// Maker Medical Record Transaction
const MEDICAL_RECORD = {
  patient: 'ggomma',
  doctor: 'ggomma',
  timeStamp: 123456789,
  location: 'seoul',
};
const medicalRecordHash = hash.hashData(MEDICAL_RECORD);
const doctorSignature = sign.sign(doctor.getDecryptedPrivateKey(), medicalRecordHash);
const encryptKey = keyGen.getRandomSeed();
const encryptedData = encrypt.encryptData(encryptKey, MEDICAL_RECORD);
const encryptedDataHash = hash.hashData(encryptedData);
const storage = 'medibloc.org';
const medicalData = tx_medicalRecord.createMedicalData(encryptedDataHash, encryptKey, storage, mainUser, '', doctor.pubKey);
const medicalRecordTx = tx_medicalRecord.createTx(mainUser, doctorSignature, medicalData);
const medicalRecordTxHash = getTxHash.getTxHash(medicalRecordTx);
const medicalRecordTxSignature = signTx.signHashedTx(medicalRecordTxHash, mainUser, '');
// const medicalRecord = tx_medicalRecord.createMedicalData()
// const recordTx = tx_medicalRecord.createTx()
