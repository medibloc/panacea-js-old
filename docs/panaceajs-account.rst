.. _account:

.. include:: include_announcement.rst

===================
medjs.local.Account
===================

The ``medjs.local.Account`` contains functions to generate MediBloc accounts, which contain encrypted private key and public key pair and can induce public key from the private key.

To use this package in a standalone use:

.. code-block:: javascript

  var Account = require('medjs').local.Account;
  //
  // Instead, you can import from medjs like below.
  //
  // var Medjs = require('medjs');
  // var medjs = Medjs.init(['http://localhost:9921']);
  // var Account = medjs.local.Account;

---------------------------------------------------------------------------

.. _account-create:

new Account
===========

.. code-block:: javascript

  new Account(passphrase, encryptedPrivateKey, pubKey);

To generate account, you can use ``medjs.local.Account()``. Basically, account is just a pair of private and public key that has several functions described as below.

.. note:: MediBloc uses public key as an address.

----------
Parameters
----------

1. ``passphrase`` - ``String`` :(optional) If ``encryptedPrivateKey`` is not given, passphrase works as a key to encrypt private key. If ``encryptedPrivateKey`` is given, passphrase works as a key to decrypt encryptedPrivateKey and it must be used in encryption of the ``encryptedPrivateKey``. If not given, passphrase is set with an empty string. 
2. ``encryptedPrivateKey`` - ``String`` :(optional) Restore account is matched with the given encrypted private key. If not given, it will generate a new keypair.
3. ``pubKey`` - ``String``(optional) Restore account is matched with the given public key. If not given, it will be decrypted from the given passphrase and the given encryptedPrivateKey.

.. note:: If ``passphrase`` does not match with ``encryptedPrivateKey``, it will return a different private key.

-------
Returns
-------

``Object`` - The account object with the following structure:

- ``pubKey`` - ``String``: The account's public key.
- ``encryptedPrivKey`` - ``String``: The account's encrypted private key. This should be carefully shared or stored.
- And other following functions...

-------
Example
-------

.. code-block:: javascript

  var accountNoPassphrase = new Account();
  console.log(accountNoPassphrase);
  > Account {
    encryptedPrivKey: {
      version: 3,
      id: '6402eabe-db3f-497e-8d22-134d3690c349',
      address: '02ed468d1c8e4ee91b889b3e8fe79cd024df5ef4087c4ab1141d365a7b8d218ca4',
      ...
    },
    pubKey: '02ed468d1c8e4ee91b889b3e8fe79cd024df5ef4087c4ab1141d365a7b8d218ca4',
    ...
  }

  var account = new Account('123456789abcdeABCDE!@#');
  console.log(account);
  > Account {
    encryptedPrivKey: {
      version: 3,
      id: 'ca05cb03-7f84-4251-9c8c-e468fda47f0f',
      address: '0387e6dd9576a9bc792658bcedcb257311739c88b8a3ca68eef980316bb73a45d9',
      ...
    },
    pubKey: '0387e6dd9576a9bc792658bcedcb257311739c88b8a3ca68eef980316bb73a45d9',
    ...
  }

  var account1 = new Account('123456789abcdeABCDE!@#', account.encryptedPrivKey);
  console.log(account1);
  > // same with the previous result

  var account2 = new Account('', account.encryptedPrivKey, account.pubKey);
  console.log(account2);
  > // same with the previous result

.. note:: SDK doesn't hold or share unencrypted private key. Account object holds encrypted private key and only the right passphrase can retrieve the unencrypted private key.

---------------------------------------------------------------------------

createCertificate
=================

.. code-block:: javascript

  var account = new Account(passphrase, encryptedPrivateKey);
  account.createCertificate(expireDate, issuer, issueDate, passphrase);

To create the certificate of the account, use ``account.createCertificate(expireDate, issuer, issueDate, passphrase)``.

----------
Parameters
----------


1. ``expireDate`` - ``Number`` : The unix timestamp when certificate is expired.
2. ``issuer`` - ``String`` : The issuer's url to check certificate authenticity.
3. ``issueDate`` - ``Number`` : The unix timestamp when issuing certificate.
4. ``passphrase`` - ``String`` :(optional) The passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt.

.. note:: Account.createCertificate doesn't return anything but assign the certificate object to the account. After signing, ``account.cert`` is changed from ``Null`` to ``Object``.

-------
Example
-------

.. code-block:: javascript

  var owner = new Account();
  owner.createCertificate({
    expireDate: Date.now() + (365 * 24 * 60 * 60 * 1000),
    issuer: 'https://medibloc.org',
    issueDate: Date.now(),
    passphrase: '',
  });
  console.log(owner.cert);
  > {
    expireDate: 1558759043199,
    issuer: 'https://medibloc.org',
    issueDate: 1527223043199,
    pubKey: '020505d5ce655f7651eddfc6ee8bc96a78c40a622c5e28b1b8dfe1cf0f3af6c448',
    signature: '1d7b003afb947bcb6e8f27f1366a34d27f473c398e98c7cc36a8720dbfda064e03cfd35cf352057a23194da874afbe9a00d37a20efec8d9ae39c43f943ed14de01'
  }


---------------------------------------------------------------------------

getDecryptedPrivateKey
======================

.. code-block:: javascript

  var account = new Account(passphrase, encryptedPrivateKey);
  account.getDecryptedPrivateKey(passphrase);

To decrypt encrypted private key with the passphrase from the ``account`` object, you can use ``account.getDecryptedPrivateKey(passphrase)``.

----------
Parameters
----------

``passphrase`` - ``String`` :(optional) Passphrase is used to decrypt encrypted private key. If not given, empty string is used to decrypt.

.. note:: If ``passphrase`` does not match with ``encryptedPrivateKey``, it will return a different private key.

-------
Returns
-------

``String`` - Decrypted private key in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  var account = new Account('123456789abcdeABCDE!@#');
  account.getDecryptedPrivateKey('123456789abcdeABCDE!@#');
  > '960d2ea9a19b2b939b2ecbdbba75ffb50aafa0b63a73cd1b614cb53c50482d26'

---------------------------------------------------------------------------

signTx
======

.. code-block:: javascript

  var account = new Account(passphrase, encryptedPrivateKey);
  account.signTx(tx, passphrase);

To sign a transaction with the private key, you can use ``account.signTx(tx, passphrase)``. It assigns signature string to ``tx.sign``.

----------
Parameters
----------

1. ``tx`` - ``Object`` : Transaction object created from one of the :ref:`transaction creation functions <transaction>`.
2. ``passphrase`` - ``String`` :(optional) The passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt the encrypted private key.

.. note:: account.signTx doesn't return anything but assign a signature string to the transaction object. After signing, ``transaction.sign`` is changed from ``null`` to ``String``.

-------
Example
-------

.. code-block:: javascript

  var owner = new Account();
  var transactionData = {
    from: owner.pubKey,
    to: '0266e30b34c9b377c9699c026872429a0fa582ac802759a3f35f9e90b352b8d932',
    value: '5',
    nonce: 3
  };
  var transaction = Transaction.valueTransferTx(transactionData);
  owner.signTx(transaction);
  console.log(transaction);
  > {
    rawTx: {...},
    hash: '15be7e844e19ecdbad46894bf310e7c15bb315837baf4aac82991d0c531b02d8',
    sign: '882c24751521bae53bff1673b896b3d0cce2b81a03fea9563323975b79955cbe134744cbd21913955093e60c8d56d3884d7863db88b5393135f667f510fcceb200'
  }

---------------------------------------------------------------------------

signTxAsPayer
=============

.. code-block:: javascript

  var account = new Account(passphrase, encryptedPrivateKey);
  account.signTxAsPayer(tx, passphrase);

To sign a transaction as payer with the private key, you can use ``account.signTxAsPayer(tx, passphrase)``. It assigns signature string to ``tx.payerSign``.

----------
Parameters
----------

1. ``tx`` - ``Object`` : Transaction object created from one of the :ref:`transaction creation functions <transaction>` and signed by a requester.
2. ``passphrase`` - ``String`` :(optional) The passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt the encrypted private key.

.. note:: account.signTxAsPayer doesn't return anything but assign a signature string to the transaction object. After signing, ``transaction.payerSign`` is set as ``String``.

-------
Example
-------

.. code-block:: javascript

  var requester = new Account('MediBloc1!');
  var payer = new Account('MediBloc2@');
  var transactionData = {
    from: requester.pubKey,
    to: '0266e30b34c9b377c9699c026872429a0fa582ac802759a3f35f9e90b352b8d932',
    value: '5',
    nonce: 3
  };
  var transaction = Transaction.valueTransferTx(transactionData);
  requester.signTx(transaction, 'MediBloc1!');
  payer.signTxAsPayer(transaction, 'MediBloc2@');
  console.log(transaction);
  > {
    rawTx: {...},
    hash: 'd04bd6cb8eef9f59e9cab7fcb253303d003ce34f30bd8e0f59c09fba5281c303',
    sign: '5351c2e3375570ab15c4f1ef36b4d854516a368a4e0ad3e1c26d32df854083bb3bf9cc188fdc242484183edff5aeb8615cda7c1ebb4f6948ec00641bd9bfa06000',
    payerSign: '0b0b28624ab007538c7044624f7a1f90c5e7b215118e8894288378c8895f2a585d10087d4be3d20a22bf381360fb70a5da2c4da95dc8430218a3d0ec3acfc11001',
  }

---------------------------------------------------------------------------

signDataPayload
===============

.. code-block:: javascript

  var account = new Account(passphrase, encryptedPrivateKey);
  account.signDataPayload(dataPayload, passphrase);

To sign a data payload with the private key, you can use ``account.signDataPayload(dataPayload, passphrase)``. It assigns signature string to ``dataPayload.sign``.

----------
Parameters
----------

1. ``dataPayload`` - ``Object`` : data payload object:

  - ``hash`` - ``String``: The hash string of the data payload.

2. ``passphrase`` - ``String``:(optional) The passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt.

.. note:: account.signDataPayload doesn't return anything but assign the signature string and the certificate to the data payload object. After signing, ``dataPayload.sign`` is changed from ``Null`` to ``String`` and ``dataPayload.cert`` is changed from ``Null`` to ``Object``.

-------
Example
-------

.. code-block:: javascript

  var owner = new Account();
  owner.createCertificate({
    expireDate: Date.now() + (365 * 24 * 60 * 60 * 1000),
    issuer: 'https://medibloc.org',
    issueDate: Date.now(),
    passphrase: '',
  });
  var dataPayload = {
    hash: 'eb36d0606ff84bba5ae84e2af0f2197b2ff4272c3d22c46ffa27ca17851cea7f',
  };
  owner.signDataPayload(dataPayload);
  console.log(dataPayload);
  > {
    hash: 'eb36d0606ff84bba5ae84e2af0f2197b2ff4272c3d22c46ffa27ca17851cea7f',
    sign: 'e04c9c20093d686224bd759e8ca272772ed0528251a80c43502a8e21d3dcbfea21827b37f199132fef58a0fd2325f0ed4aa4a94eaf17e67fe43ca491243bf1ec00',
    cert: {
      expireDate: 1558759447996,
      issuer: 'https://medibloc.org',
      issueDate: 1527223447996,
      pubKey: '02a980d3064c6135e75eb4843c5a15382d3dd4fa277625dea86f3fc97864eae288',
      signature: '9199402de763728112c68ddde02b06fbdb2745b0539ba5e981cb9a5233935c5e1e6f814fafe88f752e63635c77d48f58eea5024c552672d2aed761d14426e21d01'
    }
  }
