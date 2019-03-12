.. _panaceajs-tutorial:

.. include:: include_announcement.rst

========
Tutorial
========

This section handles several examples to use panaceajs.

.. code-block:: javascript

  var Panaceajs = require('@medibloc/panacea-js');
  var panaceajs = Panaceajs.init(['http://localhost:9921']);
  var Account = panaceajs.local.Account;
  var Client = panaceajs.client;
  var HealthData = panaceajs.healthData;
  var Transaction = panaceajs.local.transaction;

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
