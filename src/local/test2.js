import transaction from './transaction';
import { Accounts } from './account';
import { createDataPayload } from './data';
import {
  VALUE_TRANSFER,
  WRITER_ASSIGN,
  MEDICAL_RECORD,
} from './transaction/utils/constants';

// newAccount
const accounts = new Accounts();
const user1 = accounts.newAccount('passphrase');

// addAccount
const user2PrivKey = user1.privKey;
const user2Passphrase = 'passphrase';
const user2 = accounts.addAccount(user2Passphrase, user2PrivKey);


const sampleMedicalData = {
  name: 'ggomma',
  age: 27,
  date: 'datedate',
};
const medicalDataOptions = {
  data: sampleMedicalData,
  storage: 'ipfs',
  ownerAccount: user1,
  passphrase: 'passphrase',
  writerPubKey: user2.pubKey,
};

const medicalData = createDataPayload(medicalDataOptions);


user1.balance = 20;
const txData = {
  patient: user1,
  medicalData,
};

const tx = transaction(MEDICAL_RECORD, txData);
console.log(tx.sign(user1, 'passphrase'));
