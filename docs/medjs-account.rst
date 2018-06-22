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

  new Account(passphrase, encryptedPrivateKey);

To generate account, you can use ``medjs.local.Account()``. Basically, account is just a pair of private and public key that has several functions described as below.

.. note:: MediBloc uses public key as an address.

----------
Parameters
----------

1. ``passphrase`` - ``String`` :(optional) If ``encryptedPrivateKey`` is not given, passphrase works as a key to encrypt private key. If ``encryptedPrivateKey`` is given, passphrase works as a key to decrypt encryptedPrivateKey and it must be used in encryption of the ``encryptedPrivateKey``. If not given, passphrase is set with an empty string. 
2. ``encryptedPrivateKey`` - ``String`` :(optional) Restore account is matched with the given encrypted private key. If not given, it will generate a new keypair.

.. note:: If ``passphrase`` does not match with ``encryptedPrivateKey``, it will return a different private key.

-------
Returns
-------

``Object`` - The account object with the following structure:

- ``pubKey`` - ``String``: The account's public key.
- ``encryptedPrivKey`` - ``String``: The account's encrypted private key. This should never be shared or stored anywhere.
- ``getDecryptedPrivateKey(passphrase)`` - ``Function``: The function to decrypt an account's ``encryptedPrivKey`` and return a private key.

-------
Example
-------

.. code-block:: javascript

  new Account();
  > {
    encryptedPrivKey: '6cd4d5aa9385c9897f7b143adc104e8c7d185a4c87eb21c828…fefa6b2a087f47445908b766bebe9c5f05c2551901c0e29cb',
    pubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    getDecryptedPrivateKey: function(passphrase){...}
  }

  new Account('123456789abcdeABCDE!@#');
  > {
    encryptedPrivKey: '6cd4d5aa9385c9897f7b143adc104e8c7d185a4c87eb21c828…fefa6b2a087f47445908b766bebe9c5f05c2551901c0e29cb',
    pubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    getDecryptedPrivateKey: function(passphrase){...}
  }

  new Account('123456789abcdeABCDE!@#', '6cd4d5aa9385c9897f7b143adc104e8c7d185a4c87eb21c828…fefa6b2a087f47445908b766bebe9c5f05c2551901c0e29cb');
  > {
    encryptedPrivKey: '6cd4d5aa9385c9897f7b143adc104e8c7d185a4c87eb21c828…fefa6b2a087f47445908b766bebe9c5f05c2551901c0e29cb',
    pubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    getDecryptedPrivateKey: function(passphrase){...}
  }

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
=========================

.. code-block:: javascript

  var account = new Account(passphrase, encryptedPrivateKey);
  account.getDecryptedPrivateKey(passphrase);

To decrypt encrypted private key with the passphrase from the ``account`` object, you can use ``Account.getDecryptedPrivateKey(passphrase)``.

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

To sign a transaction with the private key, you can use ``Account.signTx(tx, passphrase)``. It assigns signature string to ``tx.sign``.

----------
Parameters
----------

1. ``tx`` - ``Object`` : Transaction object created from one of the :ref:`transaction creation functions <transaction>`.
2. ``passphrase`` - ``String`` :(optional) The passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt the encrypted private key.

.. note:: Account.signTx doesn't return anything but assign a signature string to the transaction object. After signing, ``transaction.sign`` is changed from ``Null`` to ``String``.

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

signDataPayload
===============

.. code-block:: javascript

  var account = new Account(passphrase, encryptedPrivateKey);
  account.signDataPayload(dataPayload, passphrase);

To sign a data payload with the private key, you can use ``Account.signDataPayload(dataPayload, passphrase)``. It assigns signature string to ``dataPayload.sign``.

----------
Parameters
----------

1. ``dataPayload`` - ``Object`` : data payload object:

  - ``hash`` - ``String``: The hash string of the data payload.

2. ``passphrase`` - ``String``:(optional) The passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt.

.. note:: Account.signDataPayload doesn't return anything but assign the signature string and the certificate to the data payload object. After signing, ``dataPayload.sign`` is changed from ``Null`` to ``String`` and ``dataPayload.cert`` is changed from ``Null`` to ``Object``.

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
