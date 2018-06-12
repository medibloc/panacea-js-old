.. _transaction:

.. include:: include_announcement.rst

=======================
medjs.local.transaction
=======================

The ``medjs.local.transaction`` contains functions to generate transaction.

To use this package in a standalone use:

.. code-block:: javascript

  var Transaction = require('medjs').local.transaction;
  //
  // Instead, you can import from medjs like below.
  //
  // var Medjs = require('medjs');
  // var medjs = Medjs(['http://localhost:9921']);
  // var Transaction = medjs.local.transaction;

---------------------------------------------------------------------------

.. _transaction-types:

Transaction types
=================

MediBloc blockchain has 3 transaction types.

- value transfer transaction : To transfer MED from one account to another.
- writer assign transaction : To assign an address that can use owner's bandwidth to write.
- data upload transaction : To upload the hash of the data on the blockchain.

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
  var tx = Transaction.valueTransferTx(transactionData);
  console.log(tx);
  > {
    rawTx: {
      alg: 1,
      chain_id: 1,
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
      nonce: 3,
      timestamp: 1528081588884,
      value: '55',
      data: {
        type: 'binary',
      }
    },
    hash: '20761ec51cb312d231343f8803cada003ada97e94e4a4074980ee6917ec3b159',
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
  var tx = Transaction.writerAssignTx(transactionData);
  console.log(tx);
  > {
    rawTx: {
      alg: 1,
      chain_id: 1,
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      to: null,
      nonce: 3,
      timestamp: 1528081711031,
      value: '0',
      data: {
        type: 'register_wkey',
        payload: '{"Writer":[3,125,145,89,103,39,188,82,37,83,81,11,52,129,95,56,44,32,96,203,183,118,242,118,93,234,251,72,174,82,141,50,75]}'
      }
    },
    hash: '9790340160c16101e516cd539bed8f678501dd8612157fe8873e8424cb22665d',
    sign: null,
  }

---------------------------------------------------------------------------

dataUploadTx
============

.. code-block:: javascript

  Transaction.dataUploadTx(transactionData);

To generate data upload transaction, you can use ``Transaction.dataUploadTx(transactionData)``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address that spends bandwidth to upload data.
- ``medicalData`` - ``Object`` : The medical data object generated from ``Data.createDataPayload(dataObject)``.

  + ``Hash`` - ``String`` : The encrypted data's hash.
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

  medjs.healthData.hashData('hello MediBloc!', 'pghd').then((hash) => {
    var payload = Transaction.createDataPayload(hash);
    var transactionData = {
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      medicalData: payload,
      nonce: 4,
    };
    var tx = Transaction.dataUploadTx(transactionData);
    console.log(tx);
  });
  > {
    rawTx: {
      alg: 1,
      chain_id: 1,
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      to: null,
      nonce: 4,
      timestamp: 1528077453209,
      value: '0',
      data: {
        type: 'add_record',
        payload: '{"Hash":"boWTsoo+YOIZ0tz5P6kwfbswEwkI6OKIDk9UaaaRskw="}'
      }
    },
    hash: 'ba5b1abc9a5db23a00adfba35e0c0fc96255e70a25ed3c6480af801284fa6587',
    sign: null,
  }

---------------------------------------------------------------------------

createDataPayload
=================

.. code-block:: javascript

  Transaction.createDataPayload(hash);

To generate data payload transaction, you can use ``Transaction.createDataPayload(hash)``. It returns data payload for ``dataUploadTx``.

----------
Parameters
----------

``hash`` - ``String``: The hash of the data.

-------
Returns
-------

``Object`` - The data payload object for data upload transaction payload.

- ``Hash`` - ``String`` : The hash of the data.

-------
Example
-------

.. code-block:: javascript

  medjs.healthData.hashData('hello MediBloc!', 'pghd').then((hash) => {
    var payload = Transaction.createDataPayload(hash);
    console.log(payload);
  });
  > {
    Hash: '6e8593b28a3e60e219d2dcf93fa9307dbb30130908e8e2880e4f5469a691b24c',
  }
