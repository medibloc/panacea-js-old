/*eslint-disable */
const med = medjs(['http://localhost:9921']);
const Account = med.local.Account;
const Transaction = med.local.Transaction;
const Data = med.local.Data;
const client = med.client;


const valueTransferTx = Transaction.valueTransferTx;
const writerAssignTx = Transaction.writerAssignTx;
const medicalRecordTx = Transaction.medicalRecordTx;

const createDataPayload = Data.createDataPayload;

const signTx = Transaction.signTx



let tx = {};
let blockIntervalId = '';
let account = {};

function keyGen() {
  let passphrase = document.getElementById('passphrase').value;
  if (passphrase === null) passphrase = '';
  account = new Account(passphrase);
  document.getElementById('encryptedPrivKey').innerHTML = `Encrypted Private Key : ${account.encryptedPrivKey}`;
  document.getElementById('pubKey').innerHTML = `Public Key : ${account.pubKey}`;
}


function retrieveBlock() {
  const blockContent = ['coinbase', 'hash', 'parent_hash', 'sign', 'timestamp'];
  const blockHash = document.getElementById('rBlockHash').value;
  client.getBlock(blockHash).then(res => {
    const block = res.block;
    blockContent.forEach(content => {
      if (content !== 'timestamp') block.header[content] = base64ToHex(block.header[content]);
      document.getElementById('r' + content).innerHTML = block.header[content];
    });
    console.log(res)
    document.getElementById('rheight').innerHTML = res.block.height;
    block.transactions.forEach(tx => {
      const txs = document.getElementById("rtransactions");
      txs.innerHTML = '';
      const li = document.createElement("li")
      li.appendChild(document.createTextNode(tx.hash));
      txs.appendChild(li);
    });
  })
};


function getBlockStatus() {
  const blockContent = ['coinbase', 'hash', 'parent_hash', 'sign', 'timestamp'];

  client.getTailBlock().then(res => {
    const block = res.block;
    blockContent.forEach(content => {
      if (content !== 'timestamp') block.header[content] = base64ToHex(block.header[content]);
      document.getElementById(content).innerHTML = block.header[content];
    });
    document.getElementById('height').innerHTML = res.block.height;
    block.transactions.forEach(tx => {
      const txs = document.getElementById("transactions");
      txs.innerHTML = '';
      const li = document.createElement("li")
      li.appendChild(document.createTextNode(tx.hash));
      txs.appendChild(li);
    });
  });
}

function syncBlockStatus() {
  const status = document.getElementById('syncBlock').innerHTML;
  switch (status) {
    case 'SYNC':
      blockIntervalId = setInterval(getBlockStatus, 2000);
      document.getElementById('syncBlock').innerHTML = 'UNSYNC';
      break;
    case 'UNSYNC':
      clearInterval(blockIntervalId);
      document.getElementById('syncBlock').innerHTML = 'SYNC';
      break;
    default:
      break;
  }
}




function createAssTx() {
  const from = document.getElementById('fromAssTx').value;
  const writer = document.getElementById('writerAssTx').value;
  const nonce = 10;

  const writerAssignTxData = {
    from: from,
    writer: writer,
    nonce: nonce,
  };
  tx = writerAssignTx(writerAssignTxData);
  console.log(tx)
  document.getElementById('assTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('assTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('assTxSign').innerHTML = '';
}


function signAssTx() {
  let encPrivKey = document.getElementById('encryptedPrivKeyAssTx').value;
  if (encPrivKey === null) encPrivKey = '';
  let passphrase = document.getElementById('passphraseAssTx').value;
  if (passphrase === null) passphrase = '';
  const account = new Account(passphrase, encPrivKey);
  console.log(account)
  tx.sign = signTx(tx.hash, account, passphrase);
  document.getElementById('assTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendAssTx() {
  client.sendTransaction(tx).then(res => {
    document.getElementById('receiptAssTx').innerHTML = res.txhash;
  })
}



function createValTx() {
  // TODO : update user information
  const from = account.pubKey
  const receiver = document.getElementById('receiverValTx').value;
  const value = document.getElementById('valueValTx').value;
  const nonce = 10;

  const valueTransferTxData = {
    from: from,
    receiver: receiver,
    value: value,
    nonce: nonce,
  };
  tx = valueTransferTx(valueTransferTxData);
  console.log(tx)
  document.getElementById('valTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('valTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('valTxSign').innerHTML = '';
};

function signValTx() {
  let encPrivKey = document.getElementById('encryptedPrivKeyValTx').value;
  if (encPrivKey === null) encPrivKey = '';
  let passphrase = document.getElementById('passphraseValTx').value;
  if (passphrase === null) passphrase = '';
  const account = new Account(passphrase, encPrivKey);
  tx.sign = signTx(tx.hash, account, passphrase);
  document.getElementById('valTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendValTx() {
  client.sendTransaction(tx).then(res => {
    document.getElementById('receiptValTx').innerHTML = res.txhash;
  })
}

/*
*/
// const medicalRecordTxData = {
//   from: user1.pubKey,
//   medicalData: medicalDataPayload,
//   nonce: 4,
// };
// const tx3 = medicalRecordTx(medicalRecordTxData);
/*
*/
function createMedicalDataPayload() {
  // const medicalData = document.getElementById('medicalDataUpTx').value;
  // const storage = document.getElementById('storageUpTx').value;
  // const writerPubKey = document.getElementById('writerUpTx').value;
  // const ownerEncPrivKey = document.getElementById('encPrivKeyUpTx').value;
  // const passphrase1 = document.getElementById('passphraseUpTx').value;
  const medicalData = {
  name: 'ggomma',
  age: 27,
  date: 'datedate',
};
  const storage = 'ipfs'
  const writerPubKey = "02aced69358396a93eda5846e78b10332b6dfb1c284fcfb2cfd435344f750cb4f2";
  const ownerEncPrivKey = '6ad0d4fd9c83cddc7d2e40328a454bdd281b5d168beb27992595d8dc3294bc7c3bcc3294567260bcebf5e1aadff97517c6d8786bebbbc3a6087306c64e582ece';
  const passphrase1 = ""
  const owner = new Account(passphrase1, ownerEncPrivKey);
  const medicalDataOptions = {
    data: medicalData,
    storage: storage,
    writerPubKey: writerPubKey,
    ownerAccount: owner,
    passphrase: passphrase1,
  };
  console.log(medicalDataOptions)
  const medicalDataPayload = createDataPayload(medicalDataOptions);
  console.log(medicalDataPayload)
  document.getElementById('medicalDataPayloadUpTx').innerHTML = medicalDataPayload;
}

function createUpTx() {
  // TODO : update user information
  const from = account.pubKey
  const receiver = document.getElementById('receiverValTx').value;
  const value = document.getElementById('valueValTx').value;
  const nonce = 10;

  const valueTransferTxData = {
    from: from,
    receiver: receiver,
    value: value,
    nonce: nonce,
  };
  tx = valueTransferTx(valueTransferTxData);
  console.log(tx)
  document.getElementById('valTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('valTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('valTxSign').innerHTML = '';
};

function signUpTx() {
  let encPrivKey = document.getElementById('encryptedPrivKeyValTx').value;
  if (encPrivKey === null) encPrivKey = '';
  let passphrase = document.getElementById('passphraseValTx').value;
  if (passphrase === null) passphrase = '';
  const account = new Account(passphrase, encPrivKey);
  tx.sign = signTx(tx.hash, account, passphrase);
  document.getElementById('valTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendUpTx() {
  client.sendTransaction(tx).then(res => {
    document.getElementById('receiptValTx').innerHTML = res.txhash;
  })
}


document.getElementById('keyGen').addEventListener('click', keyGen);
document.getElementById('syncBlock').addEventListener('click', syncBlockStatus);
document.getElementById('retrieveBlock').addEventListener('click', retrieveBlock);
document.getElementById('createValTx').addEventListener('click', createValTx);
document.getElementById('signValTx').addEventListener('click', signValTx);
document.getElementById('sendValTx').addEventListener('click', sendValTx);
document.getElementById('createAssTx').addEventListener('click', createAssTx);
document.getElementById('signAssTx').addEventListener('click', signAssTx);
document.getElementById('sendAssTx').addEventListener('click', sendAssTx);
document.getElementById('createMedicalData').addEventListener('click', createMedicalDataPayload);



function base64ToHex(base64){
  let raw = atob(base64);
  let hex = '';
  for (let i=0; i<raw.length; i++){
    const temp = raw.charCodeAt(i).toString(16);
    hex += (temp.length === 2? temp: '0'+temp);
  }
  return hex;
}


function hexToBytes(hex) {
  hex = 'af01'
  let buf = [];
  for (c = 0; c < hex.length; c += 2)
  buf.push(parseInt(hex.substr(c, 2), 16));
  console.log(buf)
  return buf;
}

function byteArrayStringToHex(str) {
  let bytes = [];
  const bytes2 = [];
  for (let i = 0; i < str.length; ++i) {
    let code = str.charCodeAt(i);
    bytes = bytes.concat([code]);
  }
  return bytes.join(', ');
}
