.. _transaction:

.. include:: include_announcement.rst

=======================
medjs.local.Transaction
=======================

The ``medjs.local.Transaction`` contains functions to generate transaction, hash, signature, and so on.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Transaction = medjs.local.Transaction;

---------------------------------------------------------------------------

.. _transaction-types:

transaction types
=================

MediBloc blockchain has 3 transaction types.

- value transfer transaction : To transfer MED from one to another.
- writer assign transaction : To assign the address who can use owner's bandwidth.
- data upload transaction : To upload data related infomation on the blockchain. Such as data hash, location, encrypt key and so on.

---------------------------------------------------------------------------

valueTransferTx
==========================

.. code-block:: javascript

  Transaction.valueTransferTx(transactionData);

To generate value transfer transaction, you can use ``Transaction.valueTransferTx(transactionData)``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address which to send the value from.
- ``to`` - ``String`` : The address which to take the value.
- ``value`` - ``String`` : The value to transfer. It must not exceed the amount which the address has.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions does this account have made. It should be exactly 1 larger than current account's nonce. Highly recommend getting account's latest nonce before making transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorythm used in transaction.
  + ``chain_id`` - ``Number`` : The chain to send transaction.
  + ``from`` - ``String`` : The address which to send this value from.
  + ``to`` - ``String`` : The address which to take this value.
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The value to transfer.
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the value transfer transaction, it must be ``binary``
- ``hash`` - ``String`` : The hash to the transaction
- ``signature`` - ``String`` : The signature to the transaction hash. Default is ``null``
- ``sign`` - ``Function`` : The function for signing the transaction. It assign signature string to ``signature``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    receiver: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    value: '55',
    nonce: 3
  }
  Transaction.valueTransferTx(transactionData);
  > {
    rawTx: {
      alg: 1,
      chain_id: 1010,
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
      nonce: 3,
      timestamp: 1526284778755,
      value: '55',
      data: {
        type: 'binary',
      }
    },
    hash: 'bc02716f5300f734d02ab5557c1f73859344d6371f9207a9ba87a603c81aaf23',
    signature: null,
    sign: [Function: sign]
  }

---------------------------------------------------------------------------

writerAssignTx
=========================

.. code-block:: javascript

  Transaction.writerAssignTx(transactionData);

To generate writer assigning transaction, you can use ``Transaction.writerAssignTx(transactionData)``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address which allows writer to use it's bandwidth.
- ``writer`` - ``String`` : The address which to take authority to use transaction sender's bandwidth.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions does this account have made. It should be exactly 1 larger than current account's nonce. Highly recommend getting account's latest nonce before making transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorythm used in transaction.
  + ``chain_id`` - ``Number`` : The chain to send transaction.
  + ``from`` - ``String`` : The address which allows writer to use it's bandwidth.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : ``0``
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the writer assign transaction, it must be ``register_wkey``
    * ``payload`` - ``String`` : The payload for the writer assigning. It is the string from json object. (Will be changed to protoBuffer)
- ``hash`` - ``String`` : The hash to the transaction
- ``signature`` - ``String`` : The signature to the transaction hash. Default is ``null``
- ``sign`` - ``Function`` : The function for signing the transaction. It assign signature string to ``signature``.


.. note:: Transaction for writer assigning doesn't send value to any address. So it has ``null`` in ``to`` parameter.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    writer: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    nonce: 3
  }
  Transaction.writerAssignTx(transactionData);
  > {
    rawTx: {
      alg: 1,
      chain_id: 1010,
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      to: null,
      nonce: 3,
      timestamp: 1526284778755,
      value: '0',
      data: {
        type: 'register_wkey',
        payload: '{"Writer":[3,125,145,89,103,39,188,82,37,83,81,11,52,129,95,56,44,32,96,203,183,118,242,118,93,234,251,72,174,82,141,50,75]}'
      }
    },
    hash: 'ecb980d1886da7c1be3cefe445d9554bc0adb8697b43577a8e1d8d7ef2991c34',
    signature: null,
    sign: [Function: sign]
  }

---------------------------------------------------------------------------

dataUploadTx
=======================

.. code-block:: javascript

  Transaction.dataUploadTx(transactionData);

To generate data upload transaction, you can use ``Transaction.dataUploadTx(transactionData)``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address which spend bandwidth to upload data.
- ``medicalData`` - ``Object`` : The medical data object generated from ``Data.createDataPayload(dataObject)``.

  + ``EncKey`` - ``String`` : The shared secret key generated from owner and writer generated from ECDH.
  + ``Hash`` - ``String`` : The encrypted data's hash.
  + ``Seed`` - ``String`` : The random seed value.
  + ``Storage`` - ``String`` : The storage containing input data.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions does this account have made. It should be exactly 1 larger than current account's nonce. Highly recommend getting account's latest nonce before making transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

.. note:: Assigned writer can send transaction using owner(from)'s bandwidth. To use owner's bandwidth, use owner's address as a ``from`` and sign the transaction with assigned writer's private key.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorythm used in transaction.
  + ``chain_id`` - ``Number`` : The chain to send transaction.
  + ``from`` - ``String`` : The address which use it's bandwidth to send transaction.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : ``0``
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the data upload transaction, it must be ``add_record``
    * ``payload`` - ``String`` : The payload for the data uploading. It is a string from json object. (Will be changed to protoBuffer)
- ``hash`` - ``String`` : The hash to the transaction
- ``signature`` - ``String`` : The signature to the transaction hash. Default is ``null``
- ``sign`` - ``Function`` : The function for signing the transaction. It assign signature string to ``signature``.


.. note:: Transaction for data upload doesn't send value to any address. So it has ``null`` in ``to`` parameter.

-------
Example
-------

.. code-block:: javascript

  var medicalData = Data.createDataPayload({
    data: 'hello MediBloc!',
    storage: 'IPFS',
    ownerAccount: new Account(),
    passphrase: '',
    writerPubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
  });
  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    medicalData: medicalData,
    nonce: 4
  }
  Transaction.medicalRecordTx(transactionData);
  > {
    rawTx: {
      alg: 1,
      chain_id: 1010,
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      to: null,
      nonce: 4,
      timestamp: 1526359594043,
      value: '0',
      data: {
        type: 'add_record',
        payload: '{"Hash":[185,204,2,91,234,65,189,143,46,162,254,230,41,46,203,245,160,250,239,207,249,205,164,124,121,180,161,245,29,56,221,235],"Storage":"IPFS","EncKey":"Z2QYhMy24+j9xdGDsIofgzSJk/EMrAleXx3aH/4iKQc=","Seed":"DZIRo4Wlve9RMyaErV/QMw=="}'
      }
    },
    hash: '8948e398873c99ce4136e1c00eeecbf3f400c4f221ee78ad22c91ca066c76ea6',
    signature: null,
    sign: [Function: sign]
  }

---------------------------------------------------------------------------

|

sign
================

.. code-block:: javascript

  var transaction = Transaction.valueTransferTx(transactionData);
  transaction.sign(account, passphrase);

To sign for the transaction and assign signature in the transaction object, you can use ``transaction.sign(account, passphrase)``.

----------
Parameters
----------

1. ``account`` - ``Object`` : The account object from ``Account()``.
2. ``passphrase`` - ``String`` :(Optional) The passphrase to decrypt encrypted private key. If not given, empty string is used to decrypt.

.. note:: transaction.sign doesn't return anything but assign signature string in the transaction object. After sign, ``transaction.signature`` is changed from ``Null`` to ``String``.

-------
Example
-------

.. code-block:: javascript

  var owner = new Account();
  var transactionData = {
    from: owner.pubKey,
    receiver: '0266e30b34c9b377c9699c026872429a0fa582ac802759a3f35f9e90b352b8d932',
    value: '5',
    nonce: 3
  }
  var transaction = Transaction.valueTransferTx(transactionData);
  transaction.sign(owner);
  console.log(transaction);
  > {
    rawTx: {
      from: '0306a88e00517add935be42c878ed1bcd31f7558994a989e37163ccc11d9ea14cf',
      timestamp: 1526451624360,
      nonce: 3,
      to: '0266e30b34c9b377c9699c026872429a0fa582ac802759a3f35f9e90b352b8d932',
      value: '5',
      chain_id: 1,
      alg: 1,
      data: { type: 'binary', payload: null } },
    hash: '9ccd805ea1c201ff691bcdbb8e24879503d26a8ab6f528de3137fb37eb800418',
    signature: '79f945b29f4743e03b5aa1d608b83fa1e63e37f99f0d0ece328fe490a8a845fd473beb92a1c18fe1b19e2d94375740f43f75c408b1fdf8daea66e4b31ebac89e01',
    sign: [Function: sign] }
