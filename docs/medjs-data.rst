.. _data:


================
medjs.local.Data
================

The ``medjs.local.Data`` contains functions which control the data or file.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Data = new medjs.local.Data;

---------------------------------------------------------------------------

.. _data-createPayload:

|

create data payload
===================

.. code-block:: javascript

  Data.createDataPayload(dataObject);

To generate data payload for transaction, you can use ``Data.createDataPayload()``. It generates encrypt key using ECDH, encrypt data with the key, and returns data payload for data upload transaction.

----------
Parameters
----------

``dataObject`` - ``object``

- ``data`` - ``boolean|number|string|object`` : The data can be any type of data which can be hashed.
- ``storage`` - ``string`` : The storage specify the location of the stored data. Usally ``IPFS``
- ``ownerAccount`` - ``object`` : The ownerAccount is the account object from ``new Account()``.
- ``passphrase`` - ``string`` : The passphrase for the ownerAccount. Passphrase is used to decrypt private key from ownerAccount's encrypted private key.
- ``writerPubKey`` - ``string`` : The writerPubKey is the address which is already assigned by owner using ``writerAssignTx()``.

-------
Returns
-------

``Object`` - The data payload object for data upload transaction payload.

- ``EncKey`` - ``String`` : The shared secret key from owner and writer generated from ECDH.
- ``Hash`` - ``String`` : The encrypted data's hash.
- ``Seed`` - ``String`` : The random seed value.
- ``Storage`` - ``String`` : The storage containing input data.

.. note:: To understand this process deeply, see ``How does data payload not reveal personal information?``

-------
Example
-------

.. code-block:: javascript

  Data.createDataPayload({
    data: 'Hello MediBloc',
    storage: 'IPFS',
    ownerAccount: new Account(),
    passphrase: '',
    writerPubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b'
  })
  > {
    EncKey: 'f465a255384b5c18ae50a693d1deace0ddbe8576fcd507dc21a3664cd8d1da02',
    Hash: 'c4e4f6733d44bf4e470ee75d3c07e07a00fb65dab10deb4eec0f8986ffc88f0e',
    Seed: 'daca5276354dc457b9e5c03b1cd39659',
    Storage: 'IPFS',
  }
