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




let i = 0;
let tx = {};
let blockIntervalId = '';
let account = {};
let nonce = 0;
let height = 0;


function getAccState() {
  client.getAccountState(account.pubKey, height).then(res => {
    balance = parseInt(res.balance);
    nonce = parseInt(res.nonce);
  });
}


function keyGen() {
  // let passphrase = document.getElementById('passphrase').value;
  // if (passphrase === null) passphrase = '';
  // account = new Account(passphrase);

  i ++;

  const encKey = keyList[i%keyList.length].encPrivKey;
  account = new Account('', encKey);
  getAccState();

  document.getElementById('encryptedPrivKey').innerHTML = `Encrypted Private Key : ${account.encryptedPrivKey}`;
  document.getElementById('pubKey').innerHTML = `Public Key : ${account.pubKey}`;
}


function accStateGet() {
  client.getAccountState(account.pubKey, height).then(res => {
    nonce = parseInt(res.nonce);
    document.getElementById('accBalance').innerHTML = `Balance : ${res.balance}`;
    document.getElementById('accNonce').innerHTML = `Nonce : ${res.nonce}`;
  })
}


function retrieveTx() {
  const txContent = ['hash', 'from', 'to', 'value', 'timestamp', 'data', 'nonce', 'sign'];
  const txHash = document.getElementById('rTxhash').value;
  console.log(txHash)
  client.getTransaction(txHash).then(res => {
    console.log(res)
    txContent.forEach(content => {
      document.getElementById('rTx' + content).innerHTML = res[content];
    });
  })
};


function retrieveBlock() {
  const blockContent = ['coinbase', 'hash', 'parent_hash', 'sign', 'timestamp'];
  const blockHash = document.getElementById('rBlockHash').value;
  client.getBlock(blockHash).then(res => {
    blockContent.forEach(content => {
      // if (content !== 'timestamp') block.header[content] = base64ToHex(block.header[content]);
      document.getElementById('r' + content).innerHTML = res[content];
    });
    document.getElementById('rheight').innerHTML = res.height;
    res.transactions.forEach(tx => {
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
    console.log(res)
    blockContent.forEach(content => {
      // if (content !== 'timestamp') res[content] = base64ToHex(res[content]);
      document.getElementById(content).innerHTML = res[content];
    });
    height = res.height;
    document.getElementById('height').innerHTML = res.height;
    res.transactions.forEach(tx => {
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
  getAccState()
  const from = account.pubKey
  const writer = document.getElementById('writerAssTx').value;

  const writerAssignTxData = {
    from: from,
    writer: writer,
    nonce: nonce + 1,
  };
  tx = writerAssignTx(writerAssignTxData);
  document.getElementById('assTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('assTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('assTxSign').innerHTML = '';
}


function signAssTx() {
  // let encPrivKey = account.encryptedPrivKey;
  let passphrase = document.getElementById('passphraseAssTx').value;
  if (passphrase === null) passphrase = '';
  tx.sign = signTx(tx.hash, account, passphrase);
  document.getElementById('assTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendAssTx() {
  console.log(tx)
  client.sendTransaction(tx).then(res => {
    console.log(res)
    document.getElementById('receiptAssTx').innerHTML = res.hash;
  })
  getAccState()
}



function createValTx() {
  // TODO : update user information
  // const from = account.pubKey
  const receiver = document.getElementById('receiverValTx').value;
  const value = document.getElementById('valueValTx').value;

  const valueTransferTxData = {
    from: account.pubKey,
    receiver: receiver,
    value: value,
    nonce: nonce + 1,
  };
  tx = valueTransferTx(valueTransferTxData);
  document.getElementById('valTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('valTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('valTxSign').innerHTML = '';
};

function signValTx() {
  // let encPrivKey = document.getElementById('encryptedPrivKeyValTx').value;
  // if (encPrivKey === null) encPrivKey = '';
  let passphrase = document.getElementById('passphraseValTx').value;
  if (passphrase === null) passphrase = '';
  // const account = new Account(passphrase, encPrivKey);
  tx.sign = signTx(tx.hash, account, passphrase);
  document.getElementById('valTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendValTx() {
  client.sendTransaction(tx).then(res => {
    document.getElementById('receiptValTx').innerHTML = res.hash;
  })
  getAccState()
}


function createMedicalDataPayload() {
  const medicalData = document.getElementById('medicalDataUpTx').value;
  const storage = document.getElementById('storageUpTx').value;
  const writerPubKey = document.getElementById('writerUpTx').value;
  // const ownerEncPrivKey = document.getElementById('encPrivKeyUpTx').value;
  const passphrase = document.getElementById('passphraseUpTx').value;
  const owner = account;
  const medicalDataOptions = {
    data: medicalData,
    storage: storage,
    writerPubKey: writerPubKey,
    ownerAccount: owner,
    passphrase: passphrase,
  };
  const medicalDataPayload = createDataPayload(medicalDataOptions);
  document.getElementById('medicalDataPayloadUpTx').innerHTML = JSON.stringify(medicalDataPayload);
  console.log(document.getElementById('medicalDataPayloadUpTx').innerHTML)
  console.log(JSON.parse(document.getElementById('medicalDataPayloadUpTx').innerHTML))
}

function createUpTx() {
  // TODO : update user information
  const medicalRecordTxData = {
    from: account.pubKey,
    medicalData: JSON.parse(document.getElementById('medicalDataPayloadUpTx').innerHTML),
    nonce: nonce + 1,
  };

  tx = medicalRecordTx(medicalRecordTxData);
  console.log(tx)
  document.getElementById('upTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('upTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('upTxSign').innerHTML = '';
};

function signUpTx() {
  // let encPrivKey = document.getElementById('signingKeyUpTx').value;
  // if (encPrivKey === null) encPrivKey = '';
  passphrase = '';
  // const account = new Account(passphrase, encPrivKey);
  tx.sign = signTx(tx.hash, account, passphrase);
  document.getElementById('upTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendUpTx() {
  client.sendTransaction(tx).then(res => {
    console.log(res)
    document.getElementById('receiptUpTx').innerHTML = res.hash;
  })
  getAccState()
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
document.getElementById('createUpTx').addEventListener('click', createUpTx);
document.getElementById('signUpTx').addEventListener('click', signUpTx);
document.getElementById('sendUpTx').addEventListener('click', sendUpTx);
document.getElementById('retrieveTx').addEventListener('click', retrieveTx);
document.getElementById('accStateGet').addEventListener('click', accStateGet);



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




const keyList = [
  {
    encPrivKey: '3a8288fbc483cbda767f4033df444d8e7c1d091fdded779924c38b8167c3bb2c619e3493502a34b2e9fae2a087f57642c2d1243aeab6c1f00f2706c119097e9f',
    address: '02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c',
  },
  {
    encPrivKey: '3d8385af9385cb8c2a2912318d104bda7e4a581adcbd25992cc38fd16293ba2866ca3399567e64b9bef5b2fe87f370119d8d223fefbac5f65a2103904e0b78ce',
    address: '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939',
  },
  {
    encPrivKey: '3dd680a69681ccde7e7b436788151a8e2d4a0e4d88b876987a9489d26591bc2a3ac861975c2f64b9b9f1e3ae8ba0254797d9763debb995a150220ec0180f2ccd',
    address: '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21',
  },
  {
    encPrivKey: '3ed489a89d87c8de792b1161d845188a2d410d1bdbb874942ac38b816096ba2d349b64c0502a60eeeea3e1ae8ff378129088203cbfb7c3a45c7755c14c0a2ecf',
    address: '027064502450c5192fabba2ac9714606edd724a9b03cc79d26327159435eba99a7',
  },
  {
    encPrivKey: '6fd282fa96d29f8f797b4733d4431ddc7b1a01198be874cd789680853691ed2b329a3593012867efeafbb5aa88f47646c28b203ae9bd99f4582355c71f0828cc',
    address: '03ff359a06dbe3129cc0e4effe0c65f5653361685ea65972edd1ece0b3005508b0',
  },
  {
    encPrivKey: '69d6d3ac95d7cb8c7d2b42338d434fd12c185f16ddba279a2a94dbd13694bb7c319b3098037830b8ecf7b1aa86f2201695df7539e8b994f75077009d1c082e98',
    address: '020adfe522f0737ce376f9428c206b7cb5e11c0ecb1a6429209595125a37c2b5d6',
  },
  {
    encPrivKey: '6f8282fd9cd0c98776794232df4d438d2f1f0916dabe2b9b2a95dcd73b9fbc7e349e3cc2067263b2eca0e3fadcf025129088236aebedc4ab502352961c0d7ec9',
    address: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
  },
  {
    encPrivKey: '68d480a9c185c88c7e79483bd9434f8d211b5a1e8fba76992f918dd33195bf7934cb61c2037a63eeeaa6b1acddf9781c9dd97031e9b992a5592755c31d587fcc',
    address: '03c5e1fa1ee82af7398ae8cc10ae12dc0ee9692cb06346810e3af74cbd3811276f',
  },
  {
    encPrivKey: '3dd1d3fd9580cbdd2929443088171ed02c4e00188bbe24c82a9289d0609eea7c679e34c2047260e9b8a6efaf86f97615c68f7038e8bd95a4582504c4195c29cb',
    address: '02279dcbc360174b4348685e75287a60abc5290497d2e3330b6a1791c4f35bcd20',
  },
  {
    encPrivKey: '3a8180fb9d829b8b7d7a4633d9441adb7c1b0c198feb77c92597da863590bb7837cb3290537931b9eef1b3a088f37345c18a273cbfed92a059770692135b7f9f',
    address: '0327506f9adac651965c5a33ba8fe1f324654b40d4b3ad1cba5abc1aaa294b1183',
  },
];
