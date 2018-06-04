.. _cryptography:

.. include:: include_announcement.rst

==================
medjs.cryptography
==================

The ``medjs.cryptography`` contains cryptographic functions.

To use this package in a standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Cryptography =  medjs.cryptography

---------------------------------------------------------------------------

.. _cryptography-encrypt:

encryptData
===========

.. code-block:: javascript

  Cryptography.encryptData(accessKey, data);

To encrypt data you can use ``Cryptography.encryptData(accessKey, data)``. This function generates an encrypted string using AES-256-CTR algorithm. Initialization vector(IV) is randomly generated and prepended with the delimiter ``:``.

.. note:: Encryption algorithm can be added or changed.

----------
Parameters
----------

1. ``accessKey`` - ``String`` : The access key to encrypt data using symmetric key algorithm. If not given, empty string is used.
2. ``data`` - ``String`` : The data to encrypt with the access key.

-------
Returns
-------

``String`` - The encrypted data.

-------
Example
-------

.. code-block:: javascript

  Cryptography.encryptData('this is access key !', 'hello medibloc!');
  > 'cc3ecbfc39c59fcab796d63458ff27fb:a32ae9c5c19068c6a3c90f57cc8662'

---------------------------------------------------------------------------

decryptData
===========

.. code-block:: javascript

  Cryptography.decryptData(accessKey, encryptedData);

To decrypt data you can use ``Cryptography.decryptData(accessKey, encryptedData)``. This function decrypts the encrypted data using AES-256-CTR algorithm. Initialization vector(IV) is parsed from the encrypted data.

.. note:: Decrypt algorithm can be added or changed.

----------
Parameters
----------

1. ``accessKey`` - ``String`` : The access key to decrypt data using symmetric key algorithm. If not given, empty string is used.
2. ``encryptedData`` - ``String`` : The encrypted data.

.. note:: In decryption, ``encryptedData`` must be the string generated through ``Cryptography.encrypt``. If not, this function returns a wrong result.

-------
Returns
-------

``String`` - The original data.

-------
Example
-------

.. code-block:: javascript

  Cryptography.decryptData('this is access key !', ''cc3ecbfc39c59fcab796d63458ff27fb:a32ae9c5c19068c6a3c90f57cc8662'');
  > 'hello medibloc!'

---------------------------------------------------------------------------

getKeyPair
=================

.. code-block:: javascript

  Cryptography.getKeyPair();

To get a new private, public key pair, you can use ``Cryptography.getKeyPair()``. Secp256k1 is used in generating a random key pair.

-------
Returns
-------

``Object`` - The key pair

- ``privKey`` - ``String`` : The private key string in hexadecimal format.
- ``pubKey`` - ``String`` : The public key string in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  Cryptography.getKeyPair();
  > {
    privKey: '1719e598983d472efbd3303cc3c4a619d89aef27a6d285443efe8e07f8100cbd',
    pubKey: '03aa5632864e042271c375c95d1a7418407f986a45d36829879d106883a2e03cb3'
  }

---------------------------------------------------------------------------

getPubKey
================

.. code-block:: javascript

  Cryptography.getPubKey(privKey);

To get the public key induced from the private key, you can use ``Cryptography.getPubKey(privKey)``.

----------
Parameters
----------

``privKey`` - ``String`` : The private key in hexadecimal format.

-------
Returns
-------

``String`` - The public key induced from the private key

-------
Example
-------

.. code-block:: javascript

  Cryptography.getPubKey('1719e598983d472efbd3303cc3c4a619d89aef27a6d285443efe8e07f8100cbd');
  > '03aa5632864e042271c375c95d1a7418407f986a45d36829879d106883a2e03cb3'

---------------------------------------------------------------------------

getSharedSecretKey
=========================

.. code-block:: javascript

  Cryptography.getSharedSecretKey(privKey, pubKey);

To get the shared secret key using ECDH, you can use ``Cryptography.getSharedSecretKey(privKey, pubKey)``.

----------
Parameters
----------

1. ``privKey`` - ``String`` : The private key in hexadecimal format.
2. ``pubKey`` - ``String`` : The public key in hexadecimal format.

-------
Returns
-------

``String`` - The public key from the private key

-------
Example
-------

.. code-block:: javascript

  Cryptography.getSharedSecretKey('1719e598983d472efbd3303cc3c4a619d89aef27a6d285443efe8e07f8100cbd', '03aa5632864e042271c375c95d1a7418407f986a45d36829879d106883a2e03cb3');
  > '21175492259a998204538e66d9cd3cd099147329683e601c408edff9e1e7f93f'

---------------------------------------------------------------------------

recoverPubKeyFromSignature
===============================

.. code-block:: javascript

  Cryptography.recoverPubKeyFromSignature(msgHash, signature);

To recover the public key from the signature, you can use ``Cryptography.recoverPubKeyFromSignature(msgHash, signature)``.

----------
Parameters
----------

1. ``msgHash`` - ``String`` : The hash string of the message.
2. ``signature`` - ``String`` : The signature for the ``msgHash``

-------
Returns
-------

``String`` - The public key from the message hash and signature.

-------
Example
-------

.. code-block:: javascript

  Cryptography.recoverPubKeyFromSignature('9e2d90f1ebc39cd7852973c6bab748579d82c93e4a2aa5b44a7769e51a606fd9', 'c4f3d2cc47d999cfff0eb6845fb41cab3a0735afecd1fa178235d10e3d9aac835fdea24640626f6bae8795594f82c7ad86c3a1413d059c6fa38e7c442b58d6e001');
  > '03047cd865161c3243c7b7a4d389ff407befbb3dd23f520152bc2a6ff2e2f0463d'

---------------------------------------------------------------------------

sign
=========

.. code-block:: javascript

  Cryptography.sign(privKey, msgHash);

To make a signature for a message, you can use ``Cryptography.sign(privKey, msgHash)``.

----------
Parameters
----------

1. ``privKey`` - ``String`` : The private key.
2. ``msgHash`` - ``String`` : The hash string of the message.

-------
Returns
-------

``String`` - The signature for the ``msgHash``.

-------
Example
-------

.. code-block:: javascript

  Cryptography.sign('aaca80d340f0cc94ea3baf128994376b2de7343f46e9c78efebea9c587edc7d3', '9e2d90f1ebc39cd7852973c6bab748579d82c93e4a2aa5b44a7769e51a606fd9');
  > 'c4f3d2cc47d999cfff0eb6845fb41cab3a0735afecd1fa178235d10e3d9aac835fdea24640626f6bae8795594f82c7ad86c3a1413d059c6fa38e7c442b58d6e001'

---------------------------------------------------------------------------

verifySignature
====================

.. code-block:: javascript

  Cryptography.verifySignature(pubKey, msgHash, signature);

To verify the signature, you can use ``Cryptography.verifySignature(pubKey, msgHash, signature)``.

----------
Parameters
----------

1. ``pubKey`` - ``String`` : The public key.
2. ``msgHash`` - ``String`` : The message hash string.
3. ``signature`` - ``String`` : The signature.

-------
Returns
-------

``Bool`` - If a signature is made from a valid public key and message hash pair, ``true`` is returned.

-------
Example
-------

.. code-block:: javascript

  Cryptography.verifySignature('03047cd865161c3243c7b7a4d389ff407befbb3dd23f520152bc2a6ff2e2f0463d', '9e2d90f1ebc39cd7852973c6bab748579d82c93e4a2aa5b44a7769e51a606fd9', 'c4f3d2cc47d999cfff0eb6845fb41cab3a0735afecd1fa178235d10e3d9aac835fdea24640626f6bae8795594f82c7ad86c3a1413d059c6fa38e7c442b58d6e001');
  > true
