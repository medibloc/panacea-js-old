/*eslint-disable */
const med = medjs(['http://localhost:9921']);
const Account = med.local.Account;
const Transaction = med.local.Transaction;
const client = med.client;


const valueTransferTx = Transaction.valueTransferTx;
const writerAssignTx = Transaction.writerAssignTx;
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
  document.getElementById('valTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('valTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('valTxSign').innerHTML = '';
};


function createWriterAssignTx() {
  const from = account.pubKey
  const nonce = 10;

  const valueTransferTxData = {
    from: from,
    writer: from,
    nonce: nonce,
  };
  tx = writerAssignTx(valueTransferTxData);
  console.log(tx)
}


function signValTx() {
  let encPrivKey = document.getElementById('encryptedPrivKeyValTx').value;
  if (encPrivKey === null) encPrivKey = '';
  let passphrase = document.getElementById('passphraseValTx').value;
  if (passphrase === null) passphrase = '';
  const account = new Account(passphrase, encPrivKey);
  console.log(account)
  tx.sign = signTx(tx.hash, account, passphrase);
  document.getElementById('valTxSign').innerHTML = `SIGN : ${tx.sign}`;
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

function sendValTx() {
  const from = tx.rawTx.from;
  const to = tx.rawTx.to;
  const value = tx.rawTx.value;
  const nonce = tx.rawTx.nonce;
  const timestamp = tx.rawTx.timestamp;
  const hash = tx.hash;
  const sign = tx.sign;
  console.log("timestamp : ", timestamp)
  client.sendTransaction(from, to, value, nonce, timestamp, hash, sign).then(res => {
    console.log(res);
    console.log(res.txhash)
    document.getElementById('receiptValTx').innerHTML = byteArrayStringToHex(res.txhash);
    console.log(res)
  })
}


document.getElementById('keyGen').addEventListener('click', keyGen);
document.getElementById('createValTx').addEventListener('click', createValTx);
document.getElementById('signValTx').addEventListener('click', signValTx);
document.getElementById('syncBlock').addEventListener('click', syncBlockStatus);
document.getElementById('retrieveBlock').addEventListener('click', retrieveBlock);
document.getElementById('sendValTx').addEventListener('click', sendValTx);


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
// var str = "Hello竜";
// var bytes = []; // char codes
// var bytesv2 = []; // char codes

// for (var i = 0; i < str.length; ++i) {
//   var code = str.charCodeAt(i);

//   bytes = bytes.concat([code]);

//   bytesv2 = bytesv2.concat([code & 0xff, code / 256 >>> 0]);
// }

// // 72, 101, 108, 108, 111, 31452
// console.log('bytes', bytes.join(', '));

// // 72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 220, 122
// console.log('bytesv2', bytesv2.join(', '));
