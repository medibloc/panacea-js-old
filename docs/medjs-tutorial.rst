.. _medjs-tutorial:

.. include:: include_announcement.rst

========
Tutorial
========

This section handles several examples to use medjs.

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Account = medjs.local.Account;
  var Transaction = medjs.local.transaction;
  var Client = med.client;

---------------------------------------------------------------------------

send transaction
================

.. code-block:: javascript

  // get account state
  var account = new Account();
  var nonce = 0;
  Client.getAccountState(account.pubKey, "tail").then(res => {
    nonce = parseInt(res.nonce);
  })

  // create medical data payload
  var healthCareDataOption = {
    data: {
      name: "ggomma",
      age: 27,
      weight: 74
    },
    storage: 'local',
    ownerAccount: account,
    passphrase: '',
    writerPubKey: '0327506f9adac651965c5a33ba8fe1f324654b40d4b3ad1cba5abc1aaa294b1183'
  };
  var healthCareDataPayload = Transaction.createDataPayload(healthCareDataOption);

  // create medical data upload transaction
  var tx1 = Transaction.dataUploadTx({
    from: account.pubKey,
    medicalData: healthCareDataPayload,
    nonce: nonce + 1
  });

  // sign transaction
  account.signTx(tx1);

  // send transaction
  client.sendTransaction(tx).then(res => {
    // .. do something
    console.log(res);
  });

