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
  // var medjs = Medjs.init(['http://localhost:9921']);
  // var Transaction = medjs.local.transaction;

---------------------------------------------------------------------------

.. _transaction-types:

Transaction types
=================

MediBloc blockchain has below transaction types.

- value transfer transaction : To transfer MED from one account to another.
- data upload transaction : To upload the hash of the data on the blockchain.
- vest transaction: To vest MED from balance of the account.
- withdraw vesting transaction: To withdraw vesting MED.
- become candidate transaction: To become candidate of the delegate.
- quit candidacy transaction: To quit candidacy for the delegate.
- vote transaction: To vote one of the candidate.(It could be change to multiple voting.)

---------------------------------------------------------------------------

valueTransferTx
===============

.. code-block:: javascript

  Transaction.valueTransferTx(transactionData);

Returns a transaction which type is ``"value transfer"``.

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
  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``from`` - ``String`` : The address from which to send this value.
  + ``to`` - ``String`` : The address to which to send this value.
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of value to transfer.
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the value transfer transaction, it must be ``transfer``.
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
    hash: 'e7e838973c9ee679cfc34d950304d3b3ce1ad539a4f3a9946ad289ac19aa2bb1',
    rawTx:
    { alg: 1,
      chain_id: 1,
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      nonce: 3,
      data: { type: 'transfer' },
      timestamp: 1530854902566,
      to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
      value: '55' },
    sign: null
  }

---------------------------------------------------------------------------


dataUploadTx
============

.. code-block:: javascript

  Transaction.dataUploadTx(transactionData);

Returns a transaction which type is ``"data upload"``.

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
  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
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
    hash: 'd668ba9f62542e882e8b1699b4a678d79f8bddc82f0be03861abfcf1b9a4dda9',
    rawTx:
     { alg: 1,
       chain_id: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       nonce: 4,
       data:
        { payload: '{"Hash":"boWTsoo+YOIZ0tz5P6kwfbswEwkI6OKIDk9UaaaRskw="}',
          type: 'add_record' },
       timestamp: 1530855002759,
       to: null,
       value: '0' },
    sign: null
  }

---------------------------------------------------------------------------


vestTx
======

.. code-block:: javascript

  Transaction.vestTx(transactionData);

Returns a transaction which type is ``"vest"``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address from which to vest the value.
- ``value`` - ``String`` : The amount of value to vest. It must not exceed the amount that the address has.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

.. note:: ``value`` '1' indicates '0.00000001' (1e-8) MED. If you want to vest 1MED, you need to use '100000000' (1e+8).

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorithm that is used in transaction.
  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``from`` - ``String`` : The address from which to send this value.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of value to vest.
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the vest transaction, it must be ``vest``.
- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    value: '100',
    nonce: 3
  }
  var tx = Transaction.vestTx(transactionData);
  console.log(tx);
  > {
    hash: '108dcbd0eb0c72f4e42220191acbe572853a92a9c94fc8bf5693894f98728823',
    rawTx:
     { alg: 1,
       chain_id: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       nonce: 3,
       data: { type: 'vest' },
       timestamp: 1531800108373,
       to: null,
       value: '100' },
    sign: null
  }

---------------------------------------------------------------------------


withdrawVestingTx
=================

.. code-block:: javascript

  Transaction.withdrawVestingTx(transactionData);

Returns a transaction which type is ``"withdraw vesting"``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address from which to withdraw the vesting value.
- ``value`` - ``String`` : The amount of value to withdraw vesting. It must not exceed the amount that the address vesting.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

.. note:: ``value`` '1' indicates '0.00000001' (1e-8) MED. If you want to withdraw vesting 1MED, you need to use '100000000' (1e+8).

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorithm that is used in transaction.
  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``from`` - ``String`` : The address from which to send this value.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of value to withdraw vesting.
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the vest transaction, it must be ``withdraw_vesting``.
- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    value: '100',
    nonce: 3
  }
  var tx = Transaction.withdrawVestingTx(transactionData);
  console.log(tx);
  > {
    hash: '92fc4a56a34d9b67990c7e5b238e30920f13d4d353065336a9296e3440b3d5c2',
    rawTx:
     { alg: 1,
       chain_id: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       nonce: 3,
       data: { type: 'withdraw_vesting' },
       timestamp: 1531800486773,
       to: null,
       value: '100' },
    sign: null
  }

---------------------------------------------------------------------------


becomeCandidateTx
=================

.. code-block:: javascript

  Transaction.becomeCandidateTx(transactionData);

Returns a transaction which type is ``"become candidate"``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address from which to withdraw the vesting value.
- ``value`` - ``String`` : The amount of collateral. It must not exceed the amount that the address has.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

.. note:: ``value`` '1' indicates '0.00000001' (1e-8) MED. If you want to guarantee collateral 1MED, you need to use '100000000' (1e+8).

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorithm that is used in transaction.
  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``from`` - ``String`` : The address from which to become a candidate for delegate.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of collateral.
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the become candidate transaction, it must be ``become_candidate``.
- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    value: '10000',
    nonce: 2
  }
  var tx = Transaction.becomeCandidateTx(transactionData);
  console.log(tx);
  > {
    hash: '4f5acb2f6ae8cf57e1625fc6d6e10c56d9a2de5a6bb284d38b59b23a9383fa30',
    rawTx:
     { alg: 1,
       chain_id: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       nonce: 2,
       data: { type: 'become_candidate' },
       timestamp: 1531801596611,
       to: null,
       value: '10000' },
    sign: null
  }

---------------------------------------------------------------------------


quitCandidacyTx
===============

.. code-block:: javascript

  Transaction.quitCandidacyTx(transactionData);

Returns a transaction which type is ``"quit candidacy"``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address from which to withdraw the vesting value.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorithm that is used in transaction.
  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``from`` - ``String`` : The address from which to quit a candidate for delegate.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : ``null``
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the quit candidate transaction, it must be ``quit_candidate``.
- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    nonce: 3
  }
  var tx = Transaction.quitCandidacyTx(transactionData);
  console.log(tx);
  > {
    hash: 'd11b5c325e5ae5d8eefa1602a3862971a5af99fa8dac013b011007741c34cf8e',
    rawTx:
     { alg: 1,
       chain_id: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       nonce: 3,
       data: { type: 'quit_candidate' },
       timestamp: 1531801875679,
       to: null,
       value: '0' },
    sign: null
  }

---------------------------------------------------------------------------


voteTx
======

.. code-block:: javascript

  Transaction.voteTx(transactionData);

Returns a transaction which type is ``"vote"``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address of voter.
- ``to`` - ``String`` : The address of candidate to vote.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``alg`` - ``Number`` : The algorithm that is used in transaction.
  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``from`` - ``String`` : The address of voter.
  + ``to`` - ``String`` : The address of candidate to vote.
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : ``null``
  + ``data`` - ``Object``

    * ``type`` - ``String`` : The transaction type. For the value transfer transaction, it must be ``vote``.
- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    to: '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939',
    nonce: 4
  }
  var tx = Transaction.voteTx(transactionData);
  console.log(tx);
  > {
    hash: '5e42da19675f22c9523642735dadbd5c2bc70f95ef43a741dd6ace5f691189fe',
    rawTx:
     { alg: 1,
       chain_id: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       nonce: 4,
       data: { type: 'vote' },
       timestamp: 1531802070310,
       to: '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939',
       value: '0' },
    sign: null
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
    Hash: 'boWTsoo+YOIZ0tz5P6kwfbswEwkI6OKIDk9UaaaRskw=',
  }
