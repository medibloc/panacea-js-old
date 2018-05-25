.. _transaction:

.. include:: include_announcement.rst

=======================
medjs.local.transaction
=======================

The ``medjs.local.transaction`` contains functions to generate transaction, hash, signature, and so on.

To use this package in a standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Transaction = medjs.local.transaction;

---------------------------------------------------------------------------

.. _transaction-types:

Transaction types
=================

MediBloc blockchain has 3 transaction types.

- value transfer transaction : To transfer MED from one account to another.
- writer assign transaction : To assign an address that can use owner's bandwidth to write.
- data upload transaction : To upload data related information on the , such as data hash, location, encrypt key and so on, on the blockchain.

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

- ``from`` - ``String`` : The address from which to send the value.
- ``to`` - ``String`` : The address to which to send the value.
- ``value`` - ``String`` : The amount of value to transfer. It must not exceed the amount that the sender address has.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

.. note:: ``value`` '1' indicates '0.00000001' (1e-8) MED. If you want to send 1MED, you need to use '100000000' (1e+8).

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorithm that is used in transaction.
  + ``chain_id`` - ``Number`` : The chain to send transaction.
  + ``from`` - ``String`` : The address from which to send this value.
  + ``to`` - ``String`` : The address to which to send this value.
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of value to transfer.
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the value transfer transaction, it must be ``binary``.
- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
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
    sign: null,
  }

---------------------------------------------------------------------------

writerAssignTx
==============

.. code-block:: javascript

  Transaction.writerAssignTx(transactionData);

To generate writer-assigned transaction, you can use ``Transaction.writerAssignTx(transactionData)``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address which allows a writer to use its bandwidth.
- ``writer`` - ``String`` : The address that takes the authority to use the transaction sender's bandwidth.
- ``nonce`` - ``Number`` : The nonce indicates the number of transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting the account's latest nonce before making transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorithm used in transaction.
  + ``chain_id`` - ``Number`` : The chain to send transaction.
  + ``from`` - ``String`` : The address which allows writer to use its bandwidth.
  + ``to`` - ``String`` : ``null``.
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : '0'.
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the writer assign transaction, it must be ``register_wkey``.
    * ``payload`` - ``String`` : The payload for the writer assigning. It is the string from json object. (Will be changed to protoBuffer)
- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

.. note:: Transaction for writer assigning does not send any value to any address. Therefore, it has ``null`` in ``to`` parameter.

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
        payload: '{'Writer':[3,125,145,89,103,39,188,82,37,83,81,11,52,129,95,56,44,32,96,203,183,118,242,118,93,234,251,72,174,82,141,50,75]}'
      }
    },
    hash: 'ecb980d1886da7c1be3cefe445d9554bc0adb8697b43577a8e1d8d7ef2991c34',
    sign: null,
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

- ``from`` - ``String`` : The address that spends bandwidth to upload data.
- ``medicalData`` - ``Object`` : The medical data object generated from ``Data.createDataPayload(dataObject)``.

  + ``EncKey`` - ``String`` : The shared secret key generated from owner and writer from ECDH.
  + ``Hash`` - ``String`` : The encrypted data's hash.
  + ``Seed`` - ``String`` : The random seed value.
  + ``Storage`` - ``String`` : The storage containing input data.
- ``nonce`` - ``Number`` : The nonce indicates the number of transactions that this account has made. It should be exactly 1 larger than current account's nonce. Highly recommend getting account's latest nonce before making transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

.. note:: Assigned writer can send transaction using owner(from)'s bandwidth. To use owner's bandwidth, use owner's address as ``from`` and sign the transaction with assigned writer's private key.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorithm used in transaction.
  + ``chain_id`` - ``Number`` : The chain to send transaction.
  + ``from`` - ``String`` : The address which uses its bandwidth to send transaction.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : '0'
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the data upload transaction, it must be ``add_record``
    * ``payload`` - ``String`` : The payload for the data uploading. It is a string from json object. (Will be changed to protoBuffer)
- ``hash`` - ``String`` : The hash to the transaction
- ``signature`` - ``String`` : The signature to the transaction hash. Default is ``null``.
- ``sign`` - ``Function`` : The function for signing the transaction. It assigns signature string to ``signature``.


.. note:: Data upload transaction does not send any value to any address. Hence, it has ``null`` in ``to`` parameter.

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
        payload: '{'Hash':[185,204,2,91,234,65,189,143,46,162,254,230,41,46,203,245,160,250,239,207,249,205,164,124,121,180,161,245,29,56,221,235],'Storage':'IPFS','EncKey':'Z2QYhMy24+j9xdGDsIofgzSJk/EMrAleXx3aH/4iKQc=','Seed':'DZIRo4Wlve9RMyaErV/QMw=='}'
      }
    },
    hash: '8948e398873c99ce4136e1c00eeecbf3f400c4f221ee78ad22c91ca066c76ea6',
    sign: null,
  }

---------------------------------------------------------------------------

createDataPayload
===================

.. code-block:: javascript

  Transaction.createDataPayload(dataObject);

To generate data payload transaction, you can use ``Transaction.createDataPayload(dataObject)``. It generates an encryption key using ECDH, encrypts data with the key, and returns data payload for ``dataUploadTx``.

----------
Parameters
----------

``dataObject`` - ``object``

- ``data`` - ``Boolean|Number|String|Object`` : The data can be any type that can be hashed.
- ``storage`` - ``String`` : The storage specifies the location of the stored data. ``Local`` is used when you store the data on your device. (Storage usage guideline will be announced)
- ``ownerAccount`` - ``Object`` : The ownerAccount is the account object from ``new Account()``.
- ``passphrase`` - ``String`` : The passphrase for the ownerAccount. The passphrase is used to decrypt private key from ownerAccount's ``encryptedPrivKey``.
- ``writerPubKey`` - ``String`` : The writerPubKey is the address, which is already assigned by owner using ``writerAssignTx()``.

-------
Returns
-------

``Object`` - The data payload object for data upload transaction payload.

- ``EncKey`` - ``String`` : The shared secret key from owner and writer from ECDH.
- ``Hash`` - ``String`` : The encrypted data's hash.
- ``Seed`` - ``String`` : The random seed value.
- ``Storage`` - ``String`` : The storage storing data.

.. note:: To understand this process deeply, see ``How does data payload not reveal personal information?``

-------
Example
-------

.. code-block:: javascript

  Transaction.createDataPayload({
    data: 'Hello MediBloc',
    storage: 'Local',
    ownerAccount: new Account(),
    passphrase: '',
    writerPubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b'
  })
  > {
    EncKey: '665b9300cb06c856e3f857d65b668d9965c48c0b62cbe3c6ce71281d84c027bd',
    Hash: 'b06207ba101ab9e8195146581d2d1f720b74fcd42b54ee7c99358c5c6ef9f3b3',
    Seed: '87d3f849b0d5654f59502b88fad59c26',
    Storage: 'Local',
  }
