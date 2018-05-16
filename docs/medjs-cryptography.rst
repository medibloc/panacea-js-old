.. _cryptography:

==================
medjs.cryptography
==================

The ``medjs.cryptography`` contains cryptographic functions.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Cryptography =  medjs.cryptography

---------------------------------------------------------------------------

.. _cryptography-encrypt:

encryptData
============

.. code-block:: javascript

  var encryptUtil = Cryptography.encrypt;
  encryptUtil.encryptData(accessKey, msg);

To encrypt data you can use ``Cryptography.encrypt.encryptData(accessKey, msg)``. It generates encrypted string message using AES-256-CTR algorithm. Initialization vector(IV) is generated from access key. So there's no need to store iv value, but only need to use access key.

.. note:: Encrypt algorithm can be changed.

----------
Parameters
----------

1. ``accessKey`` - ``String`` : The access key to encrypt data using symmetric key algorithm. If not given, empty string is used.
2. ``msg`` - ``String|Object|Number`` : The message is stringified and encrypted with the access key.

-------
Returns
-------

``String`` - The encrypted message in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  var encryptUtil = Cryptography.encrypt;
  encryptUtil.encryptData('this is access key !', 'hello medibloc!');
  > 'fe062e8327e88a06b5d3eb98ea12b4'

---------------------------------------------------------------------------

decryptData
============

.. code-block:: javascript

  var encryptUtil = Cryptography.encrypt;
  encryptUtil.decryptData(accessKey, encryptedMsg);

To decrypt data you can use ``Cryptography.encrypt.decryptData(accessKey, encryptedMsg)``. It decrypt encrypted message using AES-256-CTR algorithm. Initialization vector(IV) is generated from access key.

.. note:: Decrypt algorithm can be changed.

----------
Parameters
----------

1. ``accessKey`` - ``String`` : The access key to decrypt data using symmetric key algorithm. If not given, empty string is used.
2. ``encryptedMsg`` - ``String`` : The encryptedMsg should be a hexadecimal string.

.. note:: In decryption, ``encryptedMsg`` must be the string generated through ``Cryptography.encrypt``. If not, it returns wrong result.

-------
Returns
-------

``String`` - The encrypted message in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  var encryptUtil = Cryptography.encrypt;
  encryptUtil.decryptData('this is access key !', 'fe062e8327e88a06b5d3eb98ea12b4');
  > 'hello medibloc!'

---------------------------------------------------------------------------

hashData
=========

.. code-block:: javascript

  var hashUtil = Cryptography.hash;
  hashUtil.hashData(msg);

To hash message, you can use ``Cryptography.hash.hashData(msg)``. It use SHA3_256 algorithm and returns 256bit hexadecimal string.

----------
Parameters
----------

``msg`` - ``String|Object|Number`` : The message is stringified.

-------
Returns
-------

``String`` - The hash string in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  var hashUtil = Cryptography.hash;
  hashUtil.hashData('Hello MediBloc!!!');
  > '25cd0631574c642502446ace0c9c46811f1404e39d6d892771b346724851dd7e'

---------------------------------------------------------------------------

getKeyPair
=====================

.. code-block:: javascript

  var keyUtil = Cryptography.keyGen;
  keyUtil.getKeyPair();

To get new private, public key pair, you can use ``Cryptography.keyGen.getKeyPair()``. Secp256k1 is used in generating random key pair.

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

  var keyUtil = Cryptography.keyGen;
  keyUtil.getKeyPair();
  > {
    privKey: '1719e598983d472efbd3303cc3c4a619d89aef27a6d285443efe8e07f8100cbd',
    pubKey: '03aa5632864e042271c375c95d1a7418407f986a45d36829879d106883a2e03cb3'
  }

---------------------------------------------------------------------------

getPubKey
==============

.. code-block:: javascript

  var keyUtil = Cryptography.keyGen;
  keyUtil.getPubKey(privKey);

To get the public key induced from the private key, you can use ``Cryptography.keyGen.getPubKey(privKey)``.

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

  var keyUtil = Cryptography.keyGen;
  keyUtil.getPubKey('1719e598983d472efbd3303cc3c4a619d89aef27a6d285443efe8e07f8100cbd');
  > '03aa5632864e042271c375c95d1a7418407f986a45d36829879d106883a2e03cb3'

---------------------------------------------------------------------------

getSharedSecretKey
=====================

.. code-block:: javascript

  var keyUtil = Cryptography.keyGen;
  keyUtil.getSharedSecretKey(privKey, pubKey);

To get the shared secret key using ECDH, you can use ``Cryptography.keyGen.getSharedSecretKey(privKey, pubKey)``.

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

  var keyUtil = Cryptography.keyGen;
  keyUtil.getSharedSecretKey('1719e598983d472efbd3303cc3c4a619d89aef27a6d285443efe8e07f8100cbd', '03aa5632864e042271c375c95d1a7418407f986a45d36829879d106883a2e03cb3');
  > '21175492259a998204538e66d9cd3cd099147329683e601c408edff9e1e7f93f'

---------------------------------------------------------------------------

getRandomSeed
=============

.. code-block:: javascript

  var keyUtil = Cryptography.keyGen;
  keyUtil.getRandomSeed(length);

To get random seed number, you can use ``Cryptography.keyGen.getRandomSeed(length)``.

----------
Parameters
----------

``length`` - ``Number`` : The bytes size of random seed number. If not given, 16 is used.

-------
Returns
-------

``String`` - The random number in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  var keyUtil = Cryptography.keyGen;
  keyUtil.getRandomSeed();
  > 'baab6c02ce89592e03b8f9bbea8eb553'

---------------------------------------------------------------------------

concatKeys
===========

.. code-block:: javascript

  var keyUtil = Cryptography.keyGen;
  keyUtil.concatKeys(string1, string2);

To concat keys, you can use ``Cryptography.keyGen.concatKeys(string1, string2)``.

----------
Parameters
----------

1. ``string1`` - ``String`` : The left side string.
2. ``string2`` - ``String`` : The right side string.

-------
Returns
-------

``String`` - The concat string.

-------
Example
-------

.. code-block:: javascript

  var keyUtil = Cryptography.keyGen;
  keyUtil.concatKeys('Hello ', 'MediBloc');
  > 'Hello MediBloc'

---------------------------------------------------------------------------

recoverPubKeyFromSignature
=================================

.. code-block:: javascript

  var signUtil = Cryptography.sign;
  signUtil.recoverPubKeyFromSignature(msgHash, signature);

To recover public key from the signature, you can use ``Cryptography.sign.recoverPubKeyFromSignature(msgHash, signature)``.

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

  var signUtil = Cryptography.sign;
  signUtil.recoverPubKeyFromSignature('9e2d90f1ebc39cd7852973c6bab748579d82c93e4a2aa5b44a7769e51a606fd9', 'c4f3d2cc47d999cfff0eb6845fb41cab3a0735afecd1fa178235d10e3d9aac835fdea24640626f6bae8795594f82c7ad86c3a1413d059c6fa38e7c442b58d6e001');
  > '03047cd865161c3243c7b7a4d389ff407befbb3dd23f520152bc2a6ff2e2f0463d'

---------------------------------------------------------------------------

sign
====

.. code-block:: javascript

  var signUtil = Cryptography.sign;
  signUtil.sign(privKey, msgHash);

To make a signature for the message, you can use ``Cryptography.sign.sign(privKey, msgHash)``.

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

  var signUtil = Cryptography.sign;
  signUtil.sign('aaca80d340f0cc94ea3baf128994376b2de7343f46e9c78efebea9c587edc7d3', '9e2d90f1ebc39cd7852973c6bab748579d82c93e4a2aa5b44a7769e51a606fd9');
  > 'c4f3d2cc47d999cfff0eb6845fb41cab3a0735afecd1fa178235d10e3d9aac835fdea24640626f6bae8795594f82c7ad86c3a1413d059c6fa38e7c442b58d6e001'

---------------------------------------------------------------------------

verifySignature
================

.. code-block:: javascript

  var signUtil = Cryptography.sign;
  signUtil.verifySignature(pubKey, msgHash, signature);

To verify signature, you can use ``Cryptography.sign.verifySignature(pubKey, msgHash, signature)``.

----------
Parameters
----------

1. ``pubKey`` - ``String`` : The public key.
2. ``msgHash`` - ``String`` : The message hash string.
3. ``signature`` - ``String`` : The signature.

-------
Returns
-------

``Bool`` - If signature is made from public key and signature, ``true`` is return.

-------
Example
-------

.. code-block:: javascript

  var signUtil = Cryptography.sign;
  signUtil.verifySignature('03047cd865161c3243c7b7a4d389ff407befbb3dd23f520152bc2a6ff2e2f0463d', '9e2d90f1ebc39cd7852973c6bab748579d82c93e4a2aa5b44a7769e51a606fd9', 'c4f3d2cc47d999cfff0eb6845fb41cab3a0735afecd1fa178235d10e3d9aac835fdea24640626f6bae8795594f82c7ad86c3a1413d059c6fa38e7c442b58d6e001');
  > true
