/*eslint-disable */

const keyList = [
  {
    encPrivKey: '11af15e3f3051671787c3c36747d3a4397eeddaf75043ab5ef762621ccbe3263700d937029b6abe76329446635cb062dacd12a359a1a345d5b178e1373492010',
    address: '02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c',
  },
  {
    encPrivKey: '16ae18b7a4031627242a6e3426293c1795b98caa745468b5e7762271c9ee33677759947a2fe2fbec3426143835cd007ef38d2c309f16305b0e118b42244b2641',
    address: '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939',
  },
];


$(function() {
  $('#No1Q').change(function() {
    if ($('#No1').css('display') === 'none') {
      $('#No1').css('display', 'block')
    }
    else {
      $('#No1').css('display', 'none')
    }
  })
  $('#No2Q').change(function() {
    if ($('#No2').css('display') === 'none') {
      $('#No2').css('display', 'block')
    }
    else {
      $('#No2').css('display', 'none')
    }
  })
  $('#No3Q').change(function() {
    if ($('#No3').css('display') === 'none') {
      $('#No3').css('display', 'block')
    }
    else {
      $('#No3').css('display', 'none')
    }
  })
  $('#No4Q').change(function() {
    if ($('#No4').css('display') === 'none') {
      $('#No4').css('display', 'block')
    }
    else {
      $('#No4').css('display', 'none')
    }
  })
  $('#No5Q').change(function() {
    if ($('#No5').css('display') === 'none') {
      $('#No5').css('display', 'block')
    }
    else {
      $('#No5').css('display', 'none')
    }
  })
  $('#No6Q').change(function() {
    if ($('#No6').css('display') === 'none') {
      $('#No6').css('display', 'block')
    }
    else {
      $('#No6').css('display', 'none')
    }
  })
  $('#No7Q').change(function() {
    if ($('#No7').css('display') === 'none') {
      $('#No7').css('display', 'block')
    }
    else {
      $('#No7').css('display', 'none')
    }
  })
  $('#No8Q').change(function() {
    if ($('#No8').css('display') === 'none') {
      $('#No8').css('display', 'block')
    }
    else {
      $('#No8').css('display', 'none')
    }
  })
})

const med = medjs(['http://localhost:9921']);
const Account = med.local.Account;
const Transaction = med.local.transaction;
const Client = med.client;
const Cryptography = med.cryptography;
const Utils = med.utils;

const valueTransferTx = Transaction.valueTransferTx;
const writerAssignTx = Transaction.writerAssignTx;
const dataUploadTx = Transaction.dataUploadTx;

let i = 0;
let tx = {};
let blockIntervalId = '';
let account = {};
let nonce = 0;

function getAccState() {
  Client.getAccountState(account.pubKey, 'tail').then(res => {
    balance = parseInt(res.balance);
    nonce = parseInt(res.nonce);
  });
}

function genKey() {
  i ++;
  // To get a key pair which has a balance in genesis block
  const encKey = keyList[i%keyList.length].encPrivKey;
  account = new Account('', encKey);
  getAccState();
  document.getElementById('encryptedPrivKey').innerHTML = `Encrypted Private Key : ${account.encryptedPrivKey}`;
  document.getElementById('pubKey').innerHTML = `Public Key : ${account.pubKey}`;
}

function accStateGet() {
  Client.getAccountState(account.pubKey, 'tail').then(res => {
    nonce = parseInt(res.nonce);
    document.getElementById('accBalance').innerHTML = `Balance : ${res.balance}`;
    document.getElementById('accNonce').innerHTML = `Nonce : ${res.nonce}`;
  })
}

function retrieveTx() {
  const txContent = ['hash', 'from', 'to', 'value', 'timestamp', 'data', 'nonce', 'sign'];
  const txHash = document.getElementById('rTxhash').value;
  Client.getTransaction(txHash).then(res => {
    txContent.forEach(content => {
      document.getElementById('rTx' + content).innerHTML = res[content];
    });
  })
};

function retrieveMedicalDataTx() {
  const txContent = ['Hash', 'Storage', 'EncKey', 'Seed'];
  const txHash = document.getElementById('dataTxhash').value;
  Client.getTransaction(txHash).then(res => {
    const payload = JSON.parse(res.data.payload)
    if (payload) {
      txContent.forEach(content => {
        document.getElementById('dataTxPayload' + content).innerHTML = payload[content];
      });
    }
  });
};

function retrieveBlock() {
  const blockContent = ['coinbase', 'hash', 'parent_hash', 'sign', 'timestamp'];
  const blockHash = document.getElementById('rBlockHash').value;
  Client.getBlock(blockHash).then(res => {
    blockContent.forEach(content => {
      document.getElementById('r' + content).innerHTML = res[content];
    });
    document.getElementById('rheight').innerHTML = res.height;
    const txs = document.getElementById("rtransactions");
    txs.innerHTML = '';
    res.transactions.forEach(tx => {
      const li = document.createElement("li")
      li.appendChild(document.createTextNode(tx.hash));
      txs.appendChild(li);
    });
  })
};

function getBlockStatus() {
  const blockContent = ['coinbase', 'hash', 'parent_hash', 'sign', 'timestamp'];
  Client.getBlock('tail').then(res => {
    blockContent.forEach(content => {
      document.getElementById(content).innerHTML = res[content];
    });
    height = res.height;
    document.getElementById('height').innerHTML = res.height;
    const txs = document.getElementById("transactions");
    txs.innerHTML = '';
    res.transactions.forEach(tx => {
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
  const writerAssignTxData = {
    from: account.pubKey,
    writer: document.getElementById('writerAssTx').value,
    nonce: nonce + 1,
  };
  tx = writerAssignTx(writerAssignTxData);
  document.getElementById('assTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('assTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('assTxSign').innerHTML = '';
}

function signAssTx() {
  let passphrase = document.getElementById('passphraseAssTx').value;
  if (passphrase === null) passphrase = '';
  account.signTx(tx, passphrase);
  document.getElementById('assTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendAssTx() {
  Client.sendTransaction(tx).then(res => {
    document.getElementById('receiptAssTx').innerHTML = res.hash;
  })
  getAccState()
}

function createValTx() {
  const valueTransferTxData = {
    from: account.pubKey,
    to: document.getElementById('receiverValTx').value,
    value: document.getElementById('valueValTx').value,
    nonce: nonce + 1,
  };
  tx = valueTransferTx(valueTransferTxData);
  document.getElementById('valTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('valTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('valTxSign').innerHTML = '';
};

function signValTx() {
  let passphrase = document.getElementById('passphraseValTx').value;
  if (passphrase === null) passphrase = '';
  account.signTx(tx, passphrase);
  document.getElementById('valTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendValTx() {
  Client.sendTransaction(tx).then(res => {
    document.getElementById('receiptValTx').innerHTML = res.hash;
  })
  getAccState()
}
// MAX VALUE : 340282366920938463463374607431768211455

function createMedicalDataPayload() {
  const medicalData = document.getElementById('medicalDataUpTx').value;
  const storage = document.getElementById('storageUpTx').value;
  const passphrase = document.getElementById('passphraseUpTx').value;
  const owner = account;
  const medicalDataOptions = {
    data: medicalData,
    storage: storage,
    writerPubKey: owner.pubKey,
    ownerAccount: owner,
    passphrase: passphrase,
  };
  const medicalDataPayload = Transaction.createDataPayload(medicalDataOptions);
  document.getElementById('medicalDataPayloadUpTx').innerHTML = JSON.stringify(medicalDataPayload);
}

function createUpTx() {
  const medicalRecordTxData = {
    from: document.getElementById('ownerUpTx').value,
    medicalData: JSON.parse(document.getElementById('medicalDataPayloadUpTx').innerHTML),
    nonce: nonce + 1,
  };
  tx = dataUploadTx(medicalRecordTxData);
  document.getElementById('upTxRaw').innerHTML = `RAW TX : ${JSON.stringify(tx.rawTx)}`;
  document.getElementById('upTxHash').innerHTML = `TX HASH : ${tx.hash}`;
  document.getElementById('upTxSign').innerHTML = '';
};

function signUpTx() {
  let passphrase = document.getElementById('passphraseUpTx').value;
  if (passphrase === null) passphrase = '';
  account.signTx(tx, passphrase);
  document.getElementById('upTxSign').innerHTML = `SIGN : ${tx.sign}`;
}

function sendUpTx() {
  Client.sendTransaction(tx).then(res => {
    document.getElementById('receiptUpTx').innerHTML = res.hash;
  })
  getAccState()
}

function getPrivKey() {
  let passphrase = document.getElementById('passphraseAssTx').value;
  if (passphrase === null) passphrase = '';
  const privKey = account.getDecryptedPrivateKey(passphrase);
  return privKey;
}

function getEncyptKey() {
  const privKey = getPrivKey();
  const writerPubKey = document.getElementById('writerUpTx').value;
  const encryptedSecretKey = document.getElementById('dataTxPayloadEncKey').innerHTML;
  const randomSeed = document.getElementById('dataTxPayloadSeed').innerHTML;
  const sharedSecretKey = Cryptography.getSharedSecretKey(privKey, writerPubKey);
  const hashedSharedSecretKey = Cryptography.sha3(sharedSecretKey.concat(base64ToHex(randomSeed)));
  const encryptKey = Cryptography.decryptData(hashedSharedSecretKey, base64ToHex(encryptedSecretKey));
  return encryptKey;
}

document.getElementById('genKey').addEventListener('click', genKey);
document.getElementById('syncBlock').addEventListener('click', syncBlockStatus);
document.getElementById('retrieveBlock').addEventListener('click', retrieveBlock);
document.getElementById('createValTx').addEventListener('click', createValTx);
document.getElementById('signValTx').addEventListener('click', signValTx);
document.getElementById('sendValTx').addEventListener('click', sendValTx);
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
