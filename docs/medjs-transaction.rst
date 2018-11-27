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
- vote transaction: To vote multiple candidates.
- add certification transaction: To issue certification to the subject.
- revoke certification transaction: To revoke certification from the subject.

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
- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.
- ``payload`` - ``Object`` :(optional) The payload object. Recommend to use ``Transaction.createDefaultPayload(data)``.

  + ``message`` - ``Any Type`` : Any type of message which to store on the blockchain.

.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

.. note:: ``value`` '1' indicates '0.000000000001' (1e-12) MED. If you want to send 1MED, you need to use '1000000000000' (1e+12).

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address from which to send this value.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : The address to which to send this value.
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of value to transfer.
  + ``tx_type`` - ``String`` : The transaction type. For the value transfer transaction, it must be ``transfer``.
  + ``payload`` - ``String`` : The transaction payload from protoBuffer. For the transaction which does not include payload, it must be ``undefined``.

- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    chain_id: 1,
    value: '55',
    nonce: 3,
    payload: Transaction.createDefaultPayload('Hello World'),
  };
  var tx = Transaction.valueTransferTx(transactionData);
  console.log(tx);
  > {
    hash: '270304740f3e26a7c9743d527f095c72271e96522ec54900f2e83b754dcd7994',
    rawTx:
    { chain_id: 1,
      crypto_alg: 1,
      from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
      hash_alg: 2,
      nonce: 3,
      payload: '0a0d2248656c6c6f20576f726c6422',
      timestamp: 1542709665,
      to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
      tx_type: 'transfer',
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
- ``nonce`` - ``Number`` : The nonce indicates the number of transactions that this account has made. It should be exactly 1 larger than current account's nonce. Highly recommend getting account's latest nonce before making transaction.
- ``payload`` - ``Object`` : The medical data payload which to store on the blockchain. Recommend to use ``Transaction.createDataPayload(dataHash)``

  + ``hash`` - ``Buffer|Uint8Array`` : The hash byte array generated from entered data hash.

- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

.. note:: Assigned writer can send transaction using owner(from)'s bandwidth. To use owner's bandwidth, use owner's address as ``from`` and sign the transaction with assigned writer's private key.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address which uses its bandwidth to send transaction.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : '0'
  + ``tx_type`` - ``String`` : The transaction type. For the data upload transaction, it must be ``add_record``
  + ``payload`` - ``String`` : The transaction payload from protoBuffer for the data uploading.

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
      payload: payload,
      nonce: 4,
      chain_id: 1,
    };
    var tx = Transaction.dataUploadTx(transactionData);
    console.log(tx);
  });
  > {
    hash: '03db6b5d4a17433805cd8f65532fdf65f9209d1e552574d29f916b44b5b8eaff',
    rawTx:
     { chain_id: 1,
       crypto_alg: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       hash_alg: 2,
       nonce: 4,
       payload: '0a206e8593b28a3e60e219d2dcf93fa9307dbb30130908e8e2880e4f5469a691b24c',
       timestamp: 1542710151,
       to: null,
       tx_type: 'add_record',
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
- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

.. note:: ``value`` '1' indicates '0.000000000001' (1e-12) MED. If you want to vest 1MED, you need to use '1000000000000' (1e+12).

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address from which to send this value.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of value to vest.
  + ``tx_type`` - ``String`` : The transaction type. For the vest transaction, it must be ``vest``.

- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    value: '100',
    nonce: 3,
    chain_id: 1,
  };
  var tx = Transaction.vestTx(transactionData);
  console.log(tx);
  > {
    hash: '19d44c3dffaebdfbfef06e6235226a1223c1a784897b3c288650b63fe0385ada',
    rawTx:
     { chain_id: 1,
       crypto_alg: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       hash_alg: 2,
       nonce: 3,
       payload: undefined,
       timestamp: 1542710256,
       to: null,
       tx_type: 'vest',
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
- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

.. note:: ``value`` '1' indicates '0.000000000001' (1e-12) MED. If you want to withdraw vesting 1MED, you need to use '1000000000000' (1e+12).

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address from which to send this value.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of value to withdraw vesting.
  + ``tx_type`` - ``String`` : The transaction type. For the withdraw vesting transaction, it must be ``withdraw_vesting``.

- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    value: '100',
    nonce: 3,
    chain_id: 1,
  };
  var tx = Transaction.withdrawVestingTx(transactionData);
  console.log(tx);
  > {
    hash: '8f467917a3c13cacfee41389f3f4c11a3d6f6f55170aae475cc8a498141addb3',
    rawTx:
     { chain_id: 1,
       crypto_alg: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       hash_alg: 2,
       nonce: 3,
       payload: undefined,
       timestamp: 1542710373,
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
- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

.. note:: ``value`` '1' indicates '0.000000000001' (1e-12) MED. If you want to guarantee collateral 1MED, you need to use '1000000000000' (1e+12).

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address from which to become a candidate for delegate.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : The amount of collateral.
  + ``tx_type`` - ``String`` : The transaction type. For the become candidate transaction, it must be ``become_candidate``.

- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    value: '10000',
    nonce: 2,
    chain_id: 1,
  };
  var tx = Transaction.becomeCandidateTx(transactionData);
  console.log(tx);
  > {
    hash: '662de2b1459b3eefa44cf175b43c24567a808e571bffbf35e1fa00b6f0b082e8',
    rawTx:
     { chain_id: 1,
       crypto_alg: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       hash_alg: 2,
       nonce: 2,
       payload: undefined,
       timestamp: 1542710427,
       to: null,
       tx_type: 'become_candidate',
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
- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address from which to quit a candidate for delegate.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : ``null``
  + ``tx_type`` - ``String`` : The transaction type. For the quit candidate transaction, it must be ``quit_candidate``.

- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    nonce: 3,
    chain_id: 1,
  };
  var tx = Transaction.quitCandidacyTx(transactionData);
  console.log(tx);
  > {
    hash: '8fd2d93804c79285c99fa7d5ac2a3b7e475091fa814bf138c67e7e29adeea64c',
    rawTx:
     { chain_id: 1,
       crypto_alg: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       hash_alg: 2,
       nonce: 3,
       payload: undefined,
       timestamp: 1542710535,
       to: null,
       tx_type: 'quit_candidacy',
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
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``payload`` - ``Object`` : The payload object from candidate list. Recommend to use ``Transaction.createVotePayload([candidates])``

  + ``candidates`` - ``Array`` : The array of the candidates id byte array.

- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address of voter.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : ``null``
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : ``null``
  + ``tx_type`` - ``String`` : The transaction type. For the vote transaction, it must be ``vote``.
  + ``payload`` - ``String`` : The transaction payload from protoBuffer.

- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
	  nonce: 4,
	  chain_id: 1,
    payload: Transaction.createVotePayload([
      '5b803d26142699fa59ef51e5e39a6968f1fd1ef73908d2fdbdc1c51db723682f',
      '0e25e27e8f9ddb374d97f3c03664c1c5d044524e44145aa49ee33ae87ac1f118']),
  };
  var tx = Transaction.voteTx(transactionData);
  console.log(tx);
  > {
    hash: '6f4ef63a945efc995b34e80db0e7adc8650d863f973582fc87aadb7c90c4fa2e',
    rawTx:
     { chain_id: 1,
       crypto_alg: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       hash_alg: 2,
       nonce: 4,
       payload: '0a205b803d26142699fa59ef51e5e39a6968f1fd1ef73908d2fdbdc1c51db723682f0a200e25e27e8f9ddb374d97f3c03664c1c5d044524e44145aa49ee33ae87ac1f118',
       timestamp: 1542707910,
       to: null,
       tx_type: 'vote',
       value: '0' },
    sign: null
  }

---------------------------------------------------------------------------


addCertificationTx
==================

.. code-block:: javascript

  Transaction.addCertificationTx(transactionData);

Returns a transaction which type is ``"add certification"``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address of issuer.
- ``to`` - ``String`` : The address of receiver.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``payload`` - ``Object`` : The payload object from the certificate data. Recommend to use ``Transaction.createAddCertificationPayload(data)``.

  + ``issueTime`` - ``Number`` : The timestamp of the issuance. The unit must be seconds.
  + ``expirationTime`` - ``Number`` : The timestamp of the expiration. The unit must be seconds.
  + ``hash`` - ``String`` : The hash string of the certificate.

- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address of voter.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : The address of receiver.
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : ``null``
  + ``tx_type`` - ``String`` : The transaction type. For the vote transaction, it must be ``add_certification``.
  + ``payload`` - ``String`` : The transaction payload from protoBuffer.

- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
	nonce: 4,
	chain_id: 1,
    payload: Transaction.createAddCertificationPayload({
      issueTime: Math.floor(Date.now() / 1000),
      expirationTime: Math.floor(Date.now() / 1000),
      hash: '487b69767e201f485a67b915f1726e39a9d84d72ce3753dfdc824ebdf22e9b33',
    }),
  };
  var tx = Transaction.addCertificationTx(transactionData);
  console.log(tx);
  > {
    hash: '5cfce13ff0e32342d6b70225cded0dde5f124982e316cbe98030d9565755020b',
    rawTx:
     { chain_id: 1,
       crypto_alg: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       hash_alg: 2,
       nonce: 4,
       payload: '088cecb7dc05108cecb7dc051a30e3cedbebdefaededb4d5fe3ce5aebb6fdd797f5ef6e9edfd6bd77ce1def671edfbe7775f75cf36e1e6dd7f6d9ef5bdf7',
       timestamp: 1542710664,
       to: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
       tx_type: 'add_certification',
       value: '0' },
    sign: null
  }

---------------------------------------------------------------------------


revokeCertificationTx
=====================

.. code-block:: javascript

  Transaction.revokeCertificationTx(transactionData);

Returns a transaction which type is ``"revoke certification"``.

----------
Parameters
----------

``transactionData`` - ``Object``

- ``from`` - ``String`` : The address of issuer.
- ``nonce`` - ``Number`` : The nonce indicates how many transactions that this account has made. It should be exactly 1 larger than the current account's nonce. Highly recommend getting an account's latest nonce before making any transaction.
- ``payload`` - ``Object`` : The payload object from the certificate hash. Recommend to use ``Transaction.createRevokeCertificationPayload(data)``.

  + ``hash`` - ``Buffer|Uint8Array`` : The hash byte array generated from entered data hash.

- ``chain_id`` - ``Number`` :(optional) The chain id of the blockchain. If not given, default chainId is automatically set. (For the testnet, ``181112``)
- ``timestamp`` - ``Number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.

-------
Returns
-------

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``Object`` : The rawTx contains transaction elements.

  + ``chain_id`` - ``Number`` : The chain id of the blockchain.
  + ``crypto_alg`` - ``Number`` : The algorithm used to compute signature.
  + ``from`` - ``String`` : The address of voter.
  + ``hash_alg`` - ``Number`` : The algorithm used to calculate hash.
  + ``to`` - ``String`` : The address of receiver.
  + ``nonce`` - ``Number`` : The nonce.
  + ``timestamp`` - ``Number`` : The unix timestamp.
  + ``value`` - ``String`` : ``null``
  + ``tx_type`` - ``String`` : The transaction type. For the vote transaction, it must be ``add_certification``.
  + ``payload`` - ``String`` : The transaction payload from protoBuffer.

- ``hash`` - ``String`` : The hash to the transaction.
- ``sign`` - ``String`` : The signature to the transaction hash. Default is ``null``.

-------
Example
-------

.. code-block:: javascript

  var transactionData = {
    from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
    nonce: 4,
    chain_id: 1,
    payload: Transaction.createRevokeCertificationPayload('487b69767e201f485a67b915f1726e39a9d84d72ce3753dfdc824ebdf22e9b33'),
  };
  var tx = Transaction.revokeCertificationTx(transactionData);
  console.log(tx);
  > {
    hash: 'e6b06960f13267e475b6ce56545ce8c378011ed67bdd9d31719ca7752da0ae49',
    rawTx:
     { chain_id: 1,
       crypto_alg: 1,
       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
       hash_alg: 2,
       nonce: 4,
       payload: '0a20487b69767e201f485a67b915f1726e39a9d84d72ce3753dfdc824ebdf22e9b33',
       timestamp: 1542710900,
       to: null,
       tx_type: 'revoke_certification',
       value: '0' },
    sign: null
  }

---------------------------------------------------------------------------

createDefaultPayload
====================

.. code-block:: javascript

  Transaction.createDefaultPayload(message);

To generate default payload transaction, you can use ``Transaction.createDefaultPayload(message)``. It is not executed on the blockchain, but only stored.

----------
Parameters
----------

``message`` - ``Any type``: Any type of message can be entered. It automatically changed to string.

-------
Returns
-------

``Object`` - The payload object.

- ``message`` - ``String`` : The stringified data.

-------
Example
-------

.. code-block:: javascript

  var payload = Transaction.createDefaultPayload({Medi: 'Bloc'});
  console.log(payload);
  > {
    message: "{"Medi":"Bloc"}"
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

``Object`` - The data payload object for data upload transaction.

- ``hash`` - ``Buffer|Uint8Array`` : The hash of the data.

-------
Example
-------

.. code-block:: javascript

  medjs.healthData.hashData('hello MediBloc!', 'pghd').then((hash) => {
    var payload = Transaction.createDataPayload(hash);
    console.log(payload);
  });
  > {
    hash: [110, 133, 147, ...]
  }

---------------------------------------------------------------------------

createVotePayload
=================

.. code-block:: javascript

  Transaction.createVotePayload([candidateIds]);

To generate vote payload transaction, you can use ``Transaction.createVotePayload([candidateIds])``. It returns payload for ``voteTx``.

----------
Parameters
----------

``candidateIds`` - ``Array``: The array of the candidates id.

-------
Returns
-------

``Object`` - The vote payload object for vote transaction.

- ``candidates`` - ``Array`` : The array of the candidate id byte array.

-------
Example
-------

.. code-block:: javascript

  var payload = Transaction.createVotePayload([
    '5b803d26142699fa59ef51e5e39a6968f1fd1ef73908d2fdbdc1c51db723682f',
    '0e25e27e8f9ddb374d97f3c03664c1c5d044524e44145aa49ee33ae87ac1f118',
  ]);
  console.log(payload);
  > {
    candidates: [
      <Buffer 5b 80 3d 26 14 26 99 fa 59 ef 51 e5 e3 9a 69 68 f1 fd 1e f7 39 08 d2 fd bd c1 c5 1d b7 23 68 2f>,
      <Buffer 0e 25 e2 7e 8f 9d db 37 4d 97 f3 c0 36 64 c1 c5 d0 44 52 4e 44 14 5a a4 9e e3 3a e8 7a c1 f1 18>
    ]
  }

---------------------------------------------------------------------------

createAddCertificationPayload
=============================

.. code-block:: javascript

  Transaction.createAddCertificationPayload(data);

To generate add certification payload transaction, you can use ``Transaction.createAddCertificationPayload(data)``. It returns payload for ``addCertificationTx``.

----------
Parameters
----------

``Object`` - The data object for certification.

- ``issueTime`` - ``Number`` : The timestamp of the issuance. The unit must be seconds.
- ``expirationTime`` - ``Number`` : The timestamp of the expiration. The unit must be seconds.
- ``hash`` - ``String`` : The hash string of the certificate.

-------
Returns
-------

``Object`` - The certification payload object for add certification transaction.

- ``issueTime`` - ``Number`` : The timestamp of the issuance. The unit must be seconds.
- ``expirationTime`` - ``Number`` : The timestamp of the expiration. The unit must be seconds.
- ``hash`` - ``Buffer|Uint8Array`` : The hash byte array generated from entered certification hash.

-------
Example
-------

.. code-block:: javascript

  var payload = Transaction.createAddCertificationPayload({
    issueTime: Math.floor(Date.now() / 1000),
    expirationTime: Math.floor(Date.now() / 1000),
    hash: '487b69767e201f485a67b915f1726e39a9d84d72ce3753dfdc824ebdf22e9b33',
  });
  console.log(payload);
  > {
    expirationTime: 1536039205,
    hash: [72, 123, 105, 118, ...],
    issueTime: 1536039205,
  }

---------------------------------------------------------------------------

createRevokeCertificationPayload
================================

.. code-block:: javascript

  Transaction.createRevokeCertificationPayload(hash);

To generate revoke certification payload transaction, you can use ``Transaction.createRevokeCertificationPayload(hash)``. It returns payload for ``revokeCertificationTx``.

----------
Parameters
----------

``hash`` - ``String`` : The hash string of the certificate.

-------
Returns
-------

``Object`` - The certification payload object for revoke certification transaction.

- ``hash`` - ``Buffer|Uint8Array`` : The hash byte array generated from entered certification hash.

-------
Example
-------

.. code-block:: javascript

  var payload = Transaction.createRevokeCertificationPayload('487b69767e201f485a67b915f1726e39a9d84d72ce3753dfdc824ebdf22e9b33');
  console.log(payload);
  > {
    hash: [72, 123, 105, 118, ...]
  }

---------------------------------------------------------------------------

recoverPayload
==============

.. code-block:: javascript

  Transaction.recoverPayload(transaction);

recover a payload of the transaction matched with its type.

----------
Parameters
----------

``transaction`` - ``Object`` : The transaction contains the payload to recover.

-------
Returns
-------

``Object`` - The recovered payload.

-------
Example
-------

.. code-block:: javascript

  var payload = Transaction.createDefaultPayload('Hello MediBloc!');
  var fields = {
    from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
    nonce: 1,
    payload,
    to: '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21',
    value: '10',
  };
  var tx = Transaction.valueTransferTx(fields);
  var recoveredPayload = Transaction.recoverPayload(tx);
  console.log(recoveredPayload);
  > {
    message: '"Hello MediBloc!"'
  }

---------------------------------------------------------------------------

recoverPayloadWithType
======================

.. code-block:: javascript

  Transaction.recoverPayloadWithType(payload, type);

recover a payload matched with its type.

----------
Parameters
----------

1. ``payload`` - ``Object`` : The payload to recover.
2. ``type`` - ``string : transaction type matching with the payload

-------
Returns
-------

``Object`` - The recovered payload.

-------
Example
-------

.. code-block:: javascript

  var payload = Transaction.createDefaultPayload('Hello MediBloc!');
  var recoveredPayload = Transaction.recoverPayloadWithType(payload, 'transfer');
  console.log(recoveredPayload);
  > {
    message: '"Hello MediBloc!"'
  }
