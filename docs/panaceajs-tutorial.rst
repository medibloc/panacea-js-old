.. _medjs-tutorial:

.. include:: include_announcement.rst

========
Tutorial
========

This section handles several examples to use medjs.

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs.init(['http://localhost:9921']);
  var Account = medjs.local.Account;
  var Client = medjs.client;
  var HealthData = medjs.healthData;
  var Transaction = medjs.local.transaction;

---------------------------------------------------------------------------

send data upload transaction
============================

.. code-block:: javascript

  // create a new account
  var account = new Account();
  // get account state
  Client.getAccount(account.pubKey, null, 'tail').then((res) => {
    var nonce = parseInt(res.nonce, 10);

    // calculate hash of the medical data file
    HealthData.hashDataFromFile('/file/path', 'medical-fhir', 'observation').then((hash) => {
      // creating a medical data payload
      var healthDataPayload = Transaction.createDataPayload(hash);

      // creating a medical data upload transaction
      var tx = Transaction.dataUploadTx({
        from: account.pubKey,
        payload: healthDataPayload,
        nonce: nonce + 1
      });

      // sign transaction
      account.signTx(tx);

      // send transaction
      Client.sendTransaction(tx).then((res2) => {
        // .. do something
      });
    });
  });
