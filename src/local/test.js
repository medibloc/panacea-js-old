import { sign } from 'cryptography';
import {
  createValueTransferTx,
  createWriterAssignTx,
  createMedicalRecordTx,
  createMedicalRecordPayload,
} from './transaction';
import { Accounts } from './account';
import { signTx, hashTx } from './transaction/utils';


// newAccount
const accounts = new Accounts();
const user1 = accounts.newAccount('passphrase');

// addAccount
const user2PrivKey = user1.privKey;
const user2Passphrase = 'passphrase';
const user2 = accounts.addAccount(user2Passphrase, user2PrivKey);

// show all accounts
const keyStore = accounts.getAccounts();
console.log(keyStore);

// change default Account
const defaultAccount = accounts.setDefaultAccount(user1.pubKey);
console.log(defaultAccount);

// remove account from account list
// accounts.removeAccount('0257e2b15f01db6597ba6c7e842dcc92c762b518a9eed9e17c163692f08c018b95');


/*
  TRANSACTION
*/
const { signHashedTx } = signTx;
const { verifySignature } = sign;

// VALUE TRANSFER TX
const sender = user1;
const user1Passphrase = 'passphrase';
const receiver = user2;
sender.nonce = 0;
sender.balance = 10;
const valueTransferTx = createValueTransferTx(sender, receiver.pubKey, 10);
const valueTransferTxHash = hashTx(valueTransferTx);
const valueTransferTxSign = signHashedTx(valueTransferTxHash, sender, user1Passphrase);
const isValidValueTransferTxSign = verifySignature(
  sender.pubKey,
  valueTransferTxHash,
  valueTransferTxSign,
);
console.log(isValidValueTransferTxSign);

// REGISTER WRITER KEY TX
const owner = user1;
const ownerPassphrase = 'passphrase';
const writer = user2;
const registerWriterKeyTx = createWriterAssignTx(owner, writer.pubKey);
const registerWriterKeyTxHash = hashTx(registerWriterKeyTx);
const registerWriterKeyTxSign = signHashedTx(registerWriterKeyTxHash, owner, ownerPassphrase);
const isValidregisterWriterKeyTxSign = verifySignature(
  owner.pubKey,
  registerWriterKeyTxHash,
  registerWriterKeyTxSign,
);
console.log(isValidregisterWriterKeyTxSign);

// ADD RECORD TX
const patient = user1;
const patientPassphrase = 'passphrase';
const doctor = user2;

const sampleMedicalData = {
  name: 'ggomma',
  age: 27,
  date: 'datedate',
};
const medicalDataOptions = {
  data: sampleMedicalData,
  storage: 'ipfs',
  ownerAccount: patient,
  passphrase: patientPassphrase,
  writerPubKey: doctor.pubKey,
};

const medicalData = createMedicalRecordPayload(medicalDataOptions);
const medicalDataTx = createMedicalRecordTx(patient, medicalData);
const medicalDataTxHash = hashTx(medicalDataTx);
const medicalDataTxSign = signHashedTx(medicalDataTxHash, patient, patientPassphrase);
const isValidmedicalDataTxSign = verifySignature(
  owner.pubKey,
  medicalDataTxHash,
  medicalDataTxSign,
);
console.log(isValidmedicalDataTxSign);
