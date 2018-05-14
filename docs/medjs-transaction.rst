.. _medjs-transactions:


====
medjs.local.Transaction
====

The ``medjs.local.Transaction`` contains functions to generate transaction, hash, signature, and so on.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Transaction = new medjs.local.Transaction;

----

.. _transaction-types:

|
transaction types
====

MediBloc blockchain has 3 transaction types.

- value transfer transaction : To transfer MED from one to another.
- writer assign transaction : To assign the address who can use owner's bandwidth.
- data upload transaction : To upload data related infomation on the blockchain. Such as data hash, location, encrypt key and so on.
- voting : TODO
- ...

|
value transfer transaction
====

.. code-block:: javascript

  Transaction.valueTransferTx(transactionData);

To generate value transfer transaction, you can use ``Transaction.valueTransferTx(transactionData)``.

----
Parameters
----

``transactionData`` - ``Object``

- ``from`` - ``string`` : The address which to send this value from.
- ``receiver`` - ``string`` : The address which to take this value.
- ``value`` - ``string`` : The value to transfer. It must not exceed the amount which the address has.
- ``nonce`` - ``number`` : The nonce indicates how many transactions does this account have made. It should be exactly 1 larger than current account's nonce. Highly recommend getting account's latest nonce before making transaction.
- ``timestamp`` - ``number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.
-  TODO : chain ID?
-  TODO : algorythm?


.. note:: ``value`` must be an integer between 0 and 340282366920938463463374607431768211455. And it's type should be a string.

----
Returns
----

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``object`` : The rawTx contains transaction elements.

  + ``alg`` - ``number`` : The algorythm used in transaction.
  + ``chain_id`` - ``number`` : The chain to send transaction.
  + ``from`` - ``string`` : The address which to send this value from.
  + ``to`` - ``string`` : The address which to take this value.
  + ``nonce`` - ``number`` : The nonce.
  + ``timestamp`` - ``number`` : The unix timestamp.
  + ``value`` - ``string`` : The value to transfer.
  + ``data`` - ``object``

    * ``type`` - ``string`` : The transaction type. For the value transfer transaction, it must be ``binary``
- ``hash`` - ``string`` : The hash to the transaction
- ``sign`` - ``string`` : The signature to the transaction hash. Default is ``null``

----
Example
----

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
    sign: null
  }

|
writer assign transaction
====

.. code-block:: javascript

  Transaction.writerAssignTx(transactionData);

To generate writer assigning transaction, you can use ``Transaction.writerAssignTx(transactionData)``.

----
Parameters
----

``transactionData`` - ``Object``

- ``from`` - ``string`` : The address which allows writer to use it's bandwidth.
- ``writer`` - ``string`` : The address which to take authority to use transaction sender's bandwidth.
- ``nonce`` - ``number`` : The nonce indicates how many transactions does this account have made. It should be exactly 1 larger than current account's nonce. Highly recommend getting account's latest nonce before making transaction.
- ``timestamp`` - ``number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.
-  TODO : chain ID?
-  TODO : algorythm?


----
Returns
----

``Object`` - The transaction object with the following structure:

- ``rawTx`` - ``object`` : The rawTx contains transaction elements.

  + ``alg`` - ``number`` : The algorythm used in transaction.
  + ``chain_id`` - ``number`` : The chain to send transaction.
  + ``from`` - ``string`` : The address which allows writer to use it's bandwidth.
  + ``to`` - ``string`` : ``null``
  + ``nonce`` - ``number`` : The nonce.
  + ``timestamp`` - ``number`` : The unix timestamp.
  + ``value`` - ``string`` : ``0``
  + ``data`` - ``object``

    * ``type`` - ``string`` : The transaction type. For the writer assign transaction, it must be ``register_wkey``
    * ``payload`` - ``string`` : The payload for the writer assigning. It is the string from json object. (Will be changed soon)
- ``hash`` - ``string`` : The hash to the transaction
- ``sign`` - ``string`` : The signature to the transaction hash. Default is ``null``


.. note:: Transaction for writer assigning doesn't send value to any address. So it has ``null`` in ``to`` parameter.

----
Example
----

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
    sign: null
  }

.. |
.. data upload transaction
.. ====

.. .. code-block:: javascript

..   Transaction.medicalRecordTx(transactionData);

.. To generate data upload transaction, you can use ``Transaction.medicalRecordTx(transactionData)``.

.. ----
.. Parameters
.. ----

.. ``transactionData`` - ``Object``

.. - ``from`` - ``string`` : The address which allows writer to use it's bandwidth.
.. - ``writer`` - ``string`` : The address which to take authority to use transaction sender's bandwidth.
.. - ``nonce`` - ``number`` : The nonce indicates how many transactions does this account have made. It should be exactly 1 larger than current account's nonce. Highly recommend getting account's latest nonce before making transaction.
.. - ``timestamp`` - ``number`` :(optional) The unix timestamp. If not given, current timestamp is automatically set.
.. -  TODO : chain ID?
.. -  TODO : algorythm?


.. ----
.. Returns
.. ----

.. ``Object`` - The transaction object with the following structure:

.. - ``rawTx`` - ``object`` : The rawTx contains transaction elements.

..   + ``alg`` - ``number`` : The algorythm used in transaction.
..   + ``chain_id`` - ``number`` : The chain to send transaction.
..   + ``from`` - ``string`` : The address which allows writer to use it's bandwidth.
..   + ``to`` - ``string`` : ``null``
..   + ``nonce`` - ``number`` : The nonce.
..   + ``timestamp`` - ``number`` : The unix timestamp.
..   + ``value`` - ``string`` : ``0``
..   + ``data`` - ``object``

..     * ``type`` - ``string`` : The transaction type. For the writer assign transaction, it must be ``register_wkey``
..     * ``payload`` - ``string`` : The payload for the writer assigning. It is the string from json object. (Will be changed soon)
.. - ``hash`` - ``string`` : The hash to the transaction
.. - ``sign`` - ``string`` : The signature to the transaction hash. Default is ``null``


.. .. note:: Transaction for writer assigning doesn't send value to any address. So it has ``null`` in ``to`` parameter.

.. ----
.. Example
.. ----

.. .. code-block:: javascript

..   var transactionData = {
..     from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
..     writer: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
..     nonce: 3
..   }
..   Transaction.writerAssignTx(transactionData);
..   > {
..     rawTx: {
..       alg: 1,
..       chain_id: 1010,
..       from: '0367e7dee7bb273147991cb1d2b99a4daf069064fb77bd9a70c7998c5f1a00d58c',
..       to: null,
..       nonce: 3,
..       timestamp: 1526284778755,
..       value: '0',
..       data: {
..         type: 'register_wkey',
..         payload: '{"Writer":[3,125,145,89,103,39,188,82,37,83,81,11,52,129,95,56,44,32,96,203,183,118,242,118,93,234,251,72,174,82,141,50,75]}'
..       }
..     },
..     hash: 'ecb980d1886da7c1be3cefe445d9554bc0adb8697b43577a8e1d8d7ef2991c34',
..     sign: null
..   }
