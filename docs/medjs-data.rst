.. _data:

================
medjs.local.Data
================

The ``medjs.local.Data`` contains functions which control the data or file.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Data = medjs.local.Data;

---------------------------------------------------------------------------

.. _data-createPayload:

createDataPayload
===================

.. code-block:: javascript

  Data.createDataPayload(dataObject);

To generate data payload for transaction, you can use ``Data.createDataPayload()``. It generates encrypt key using ECDH, encrypt data with the key, and returns data payload for data upload transaction.

----------
Parameters
----------

``dataObject`` - ``object``

- ``data`` - ``Boolean|Number|String|Object`` : The data can be any type which can be hashed.
- ``storage`` - ``String`` : The storage specify the location of the stored data. ``Local`` is used when you store the data on your device. (Storage usage guideline will be announced.)
- ``ownerAccount`` - ``Object`` : The ownerAccount is the account object from ``new Account()``.
- ``passphrase`` - ``String`` : The passphrase for the ownerAccount. Passphrase is used to decrypt private key from ownerAccount's ``encryptedPrivKey``.
- ``writerPubKey`` - ``String`` : The writerPubKey is the address which is already assigned by owner using ``writerAssignTx()``.

-------
Returns
-------

``Object`` - The data payload object for data upload transaction payload.

- ``EncKey`` - ``String`` : The shared secret key from owner and writer generated from ECDH.
- ``Hash`` - ``String`` : The encrypted data's hash.
- ``Seed`` - ``String`` : The random seed value.
- ``Storage`` - ``String`` : The storage storing data.

.. note:: To understand this process deeply, see ``How does data payload not reveal personal information?``

-------
Example
-------

.. code-block:: javascript

  Data.createDataPayload({
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
