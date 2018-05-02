import { sign } from 'cryptography';
import { valueTransferTx, writerAssignTx, medicalRecordTx, signTx } from './transaction';
import { Account } from './account';
import { createDataPayload } from './data';


// newAccount
const user1 = new Account('');
const user2Address = new Account('').pubKey;


// VALUE_TRANSFER_TX
const valueTransferTxData = {
  from: user1.pubKey,
  receiver: user2Address,
  value: '5',
  nonce: 3,
};
const tx1 = valueTransferTx(valueTransferTxData);
tx1.sign = signTx(tx1.hash, user1, '');


// WRITER_ASSIGN_TX
const writerAssignTxData = {
  from: user1.pubKey,
  writer: user2Address,
  nonce: 3,
};
const tx2 = writerAssignTx(writerAssignTxData);
tx2.sign = signTx(tx2.hash, user1, '');


// MEDICAL_DATA_TX
const medicalData = {
  name: 'ggomma',
  age: 27,
  date: 'datedate',
};
const medicalDataOptions = {
  data: medicalData,
  storage: 'ipfs',
  writerPubKey: user2Address,
  ownerAccount: user1,
  passphrase: '',
};
const medicalDataPayload = createDataPayload(medicalDataOptions);
const medicalRecordTxData = {
  from: user1.pubKey,
  medicalData: medicalDataPayload,
  nonce: 4,
};
const tx3 = medicalRecordTx(medicalRecordTxData);
tx3.sign = signTx(tx3.hash, user1, '');


// SIGNATURE_VERIFICATION
const { verifySignature, recoverPubKeyFromSignature } = sign;

const isValid = verifySignature(user1.pubKey, tx1.hash, tx1.sign);
console.log(isValid);
const signer = recoverPubKeyFromSignature(tx1.hash, tx1.sign);
const isSamePerson = (signer === user1.pubKey);
console.log(isSamePerson);
