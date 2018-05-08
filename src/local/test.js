import { sign } from 'cryptography';
import { valueTransferTx, writerAssignTx, medicalRecordTx, signTx } from './transaction';
import { Account } from './account';
import { createDataPayload } from './data';


// newAccount
const passphrase = 'ggomma';
const encPrivKey = '490be1fd01fbb8a06c54f585dbcd4cd2c94179794f3fc151cc3f013dafff7bcfa9420b9035dc759be55efd3e6b4c466e9c244d0ef69bf4b846f8cc940bbe7a12';
const user1 = new Account(passphrase, encPrivKey);
const user2Address = new Account(passphrase).pubKey;


// VALUE_TRANSFER_TX
const valueTransferTxData = {
  from: user1.pubKey,
  receiver: user2Address,
  value: '5', // Must string
  nonce: 3,
};
const tx1 = valueTransferTx(valueTransferTxData);
tx1.sign = signTx(tx1.hash, user1, passphrase);


// WRITER_ASSIGN_TX
const writerAssignTxData = {
  from: user1.pubKey,
  writer: user2Address,
  nonce: 3,
};
const tx2 = writerAssignTx(writerAssignTxData);
tx2.sign = signTx(tx2.hash, user1, passphrase);


// MEDICAL_DATA_TX
const medicalData = {
  name: 'ggomma',
  age: 27,
  date: 'datedate',
};
//
const passphrase1 = '';
const ownerEncPrivKey = '6ad0d4fd9c83cddc7d2e40328a454bdd281b5d168beb27992595d8dc3294bc7c3bcc3294567260bcebf5e1aadff97517c6d8786bebbbc3a6087306c64e582ece';
const user0 = new Account(passphrase1, ownerEncPrivKey);
//
const medicalDataOptions = {
  data: medicalData,
  storage: 'ipfs',
  writerPubKey: '02aced69358396a93eda5846e78b10332b6dfb1c284fcfb2cfd435344f750cb4f2',
  ownerAccount: user0,
  passphrase: passphrase1,
};
const medicalDataPayload = createDataPayload(medicalDataOptions);

const medicalRecordTxData = {
  from: user0.pubKey,
  medicalData: medicalDataPayload,
  nonce: 4,
};
const tx3 = medicalRecordTx(medicalRecordTxData);
tx3.sign = signTx(tx3.hash, user0, passphrase1);


// SIGNATURE_VERIFICATION
const { verifySignature, recoverPubKeyFromSignature } = sign;

const isValid = verifySignature(user1.pubKey, tx1.hash, tx1.sign);
console.log(isValid);
const signer = recoverPubKeyFromSignature(tx1.hash, tx1.sign);
const isSamePerson = (signer === user1.pubKey);
console.log(isSamePerson);

