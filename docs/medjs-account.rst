.. _account:

.. include:: include_announcement.rst

===================
medjs.local.Account
===================

The ``medjs.local.Account`` contains functions to generate MediBloc accounts which contain encrypted private key and public key, and induce public key from the private key.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Account = medjs.local.Account;

---------------------------------------------------------------------------

.. _account-create:

new Account
===========

.. code-block:: javascript

  new Account(passphrase, encryptedPrivateKey);

To generate account, you can use ``medjs.local.Account()``. Basically, account is just a private and public keypair which has several functions described below.

.. note:: MediBloc use public key as an address.

----------
Parameters
----------

1. ``passphrase`` - ``String`` :(optional) If ``encryptedPrivateKey`` is not given, passphrase works as a key to encrypt private key. If ``encryptedPrivateKey`` is given, passphrase works as a key to decrypt encryptedPrivateKey and it must have been used in encryption of the ``encryptedPrivateKey``. If not given it is set with empty string.
2. ``encryptedPrivateKey`` - ``String`` :(optional) Restore account matched with the given encrypted private key. If not given it will generate new keypair.

.. note:: If ``passphrase`` isn't matched with ``encryptedPrivateKey``, it will return a different private key.

-------
Returns
-------

``Object`` - The account object with the following structure:

- ``pubKey`` - ``String``: The account's public key.
- ``encryptedPrivKey`` - ``String``: The account's encrypted private key. This should never be shared or stored anywhere.
- ``getDecryptedPrivateKey(passphrase)`` - ``Function``: The function to decrypt account's ``encryptedPrivKey`` and return it.

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

.. note:: SDK doesn't hold or share unencrypted private key. Account object holds encrypted private key and only right passphrase can retrieve unencrypted private key.

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

``passphrase`` - ``String`` :(optional) Passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt.

.. note:: If ``passphrase`` isn't matched with ``encryptedPrivateKey``, it will return a different private key.

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
  > "960d2ea9a19b2b939b2ecbdbba75ffb50aafa0b63a73cd1b614cb53c50482d26"

---------------------------------------------------------------------------

signTx
=========================

.. code-block:: javascript

  var account = new Account(passphrase, encryptedPrivateKey);
  account.signTx(tx, passphrase);

To sign transaction with the private key, you can use ``Account.signTx(tx, passphrase)``. It assigns signature string to ``tx.sign``.

----------
Parameters
----------

1. ``tx`` - ``Object`` : Transaction object created from one of the :ref:`transaction creation functions <transaction>`.
2. ``passphrase`` - ``String`` :(Optional) The passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt.

.. note:: Account.signTx doesn't return anything but assign signature string in the transaction object. After sign, ``transaction.sign`` is changed from ``Null`` to ``String``.

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
    hash: "15be7e844e19ecdbad46894bf310e7c15bb315837baf4aac82991d0c531b02d8",
    sign: "882c24751521bae53bff1673b896b3d0cce2b81a03fea9563323975b79955cbe134744cbd21913955093e60c8d56d3884d7863db88b5393135f667f510fcceb200"
  }
