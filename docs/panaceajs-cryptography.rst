.. _cryptography:

.. include:: include_announcement.rst

==================
panaceajs.cryptography
==================

The ``panaceajs.cryptography`` contains cryptographic functions.

To use this package in a standalone use:

.. code-block:: javascript

  var Cryptography = require('@medibloc/panacea-js').cryptography;
  //
  // Instead, you can import from panaceajs like below.
  //
  // var Panaceajs = require('@medibloc/panacea-js');
  // var panaceajs = Panaceajs.init(['http://localhost:9921']);
  // var Cryptography = panaceajs.cryptography;

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

.. note:: In decryption, ``encryptedData`` must be the string generated through ``Cryptography.encryptData``. If not, this function returns a wrong result.

-------
Returns
-------

``String`` - The original data.

-------
Example
-------

.. code-block:: javascript

  Cryptography.decryptData('this is access key !', 'cc3ecbfc39c59fcab796d63458ff27fb:a32ae9c5c19068c6a3c90f57cc8662');
  > 'hello medibloc!'

---------------------------------------------------------------------------

encryptKey
==========

.. code-block:: javascript

  Cryptography.encryptKey(password, privKey, options);

To encrypt key you can use ``Cryptography.encryptKey(password, privKey, options)``. This function generates an encrypted key defined as same as `Ethereum web3 secret storage definition <https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition#pbkdf2-sha-256>`_.

----------
Parameters
----------

1. ``password`` - ``String`` : The password to encrypt key. It should be long and complicated.
2. ``privKey`` - ``String`` : The private key to encrypt with the password.
3. ``options`` - ``Object`` :(optional) Encryption options such as ``salt``, ``iv``, ``kdf``, etc.

-------
Returns
-------

``Object`` - The encrypted key.

-------
Example
-------

.. code-block:: javascript

  var encryptedKey = Cryptography.encryptKey('medibloc12345^&*()', '337c72130334930ee3ad42a9fe323648bc33f4b4ff8fd2a7d71ea816078f7a27');
  console.log(encryptedKey);
  > {
    version: 3,
    id: '8a58575c-4367-4be8-a5de-cdf82931b53e',
    address: '0256b32f907826155408d41662b51e77878ef9bb58f8dfcdae98eb2eaf4dc3ce7a',
    crypto: {
      ciphertext: '303460753670210a53f023aac4e7252e04d0cd93b79f0aa3889f6735de729919fea0fdf0c22be8d5d427c09d51902210494ed58b3b12dfd77cf93187a252da55',
      cipherparams: {
        iv: 'd1f1f735155432b640b5229c8a5de5d1'
      },
      cipher: 'aes-128-ctr',
      kdf: 'scrypt',
      kdfparams:{
        dklen: 32,
        salt: '932db3b379fb2a3762e876a5714079a89188f686c85c3b880775eebbd3c3b0c8',
        n: 8192,
        r: 8,
        p: 1
      },
      mac: 'a59dcc2e6dfaadb5aca6d1270e6341207817a64618323cb95f23d7b027318f54'
      }
    }

---------------------------------------------------------------------------

decryptKey
==========

.. code-block:: javascript

  Cryptography.decryptKey(password, encryptedKey);

To decrypt encrypted key you can use ``Cryptography.decryptKey(password, encryptedKey)``. This function decrypts the encrypted key.

----------
Parameters
----------

1. ``password`` - ``String`` : The password used to encrypt ``encryptedKey``.
2. ``encryptedKey`` - ``Object|String`` : The encrypted key to decrypt.

.. note:: In decryption, ``encryptedKey`` must be the object or string generated through ``Cryptography.encryptKey``. If not, this function returns a error.

-------
Returns
-------

``String`` - The original key.

-------
Example
-------

.. code-block:: javascript

  var encryptedKey = {
    version: 3,
    id: '8a58575c-4367-4be8-a5de-cdf82931b53e',
    address: '0256b32f907826155408d41662b51e77878ef9bb58f8dfcdae98eb2eaf4dc3ce7a',
    ...
  };

  var decryptedKey = Cryptography.decryptData('medibloc12345^&*()', encryptedKey);
  console.log(decryptedKey);
  > '337c72130334930ee3ad42a9fe323648bc33f4b4ff8fd2a7d71ea816078f7a27'

---------------------------------------------------------------------------

getKeyPair
==========

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

getKeyPairFromPassphrase
========================

.. code-block:: javascript

  Cryptography.getKeyPairFromPassphrase(passphrase);

To get a new private, public key pair from passphrase, you can use ``Cryptography.getKeyPairFromPassphrase(passphrase)``.

----------
Parameters
----------

``passphrase`` - ``String`` : The passphrase using as a seed to generate the key pair.

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

  Cryptography.getKeyPairFromPassphrase('med med med med med med med med med med med med');
  > {
    privKey: 'c16d3c171c37faf691ec87814296fe8aa9b5e53390b06c548d325b2c0aa8668c',
    pubKey: '02406b3e2fd06f97b822cd3c6bb661c9ecf13c0c13f1bf2117faf6ea1695dd9876'
  }

---------------------------------------------------------------------------

getPubKey
=========

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

``String`` - The public key induced from the private key.

-------
Example
-------

.. code-block:: javascript

  Cryptography.getPubKey('1719e598983d472efbd3303cc3c4a619d89aef27a6d285443efe8e07f8100cbd');
  > '03aa5632864e042271c375c95d1a7418407f986a45d36829879d106883a2e03cb3'

---------------------------------------------------------------------------

getSharedSecretKey
==================

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

``String`` - The public key from the private key.

-------
Example
-------

.. code-block:: javascript

  Cryptography.getSharedSecretKey('1719e598983d472efbd3303cc3c4a619d89aef27a6d285443efe8e07f8100cbd', '03aa5632864e042271c375c95d1a7418407f986a45d36829879d106883a2e03cb3');
  > '21175492259a998204538e66d9cd3cd099147329683e601c408edff9e1e7f93f'

---------------------------------------------------------------------------

recoverPubKeyFromSignature
==========================

.. code-block:: javascript

  Cryptography.recoverPubKeyFromSignature(msgHash, signature);

To recover the public key from the signature, you can use ``Cryptography.recoverPubKeyFromSignature(msgHash, signature)``.

----------
Parameters
----------

1. ``msgHash`` - ``String`` : The hash string of the message.
2. ``signature`` - ``String`` : The signature for the ``msgHash``.

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
====

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
===============

.. code-block:: javascript

  Cryptography.verifySignature(pubKey, msgHash, signature);

To verify the signature, you can use ``Cryptography.verifySignature(pubKey, msgHash, signature)``.

----------
Parameters
----------

1. ``pubKey`` - ``String`` : The public key of the signature.
2. ``msgHash`` - ``String`` : The hash string of the message.
3. ``signature`` - ``String`` : The signature for the ``msgHash``.

-------
Returns
-------

``Boolean`` - If a signature is made from a valid public key and message hash pair, ``true`` is returned.

-------
Example
-------

.. code-block:: javascript

  Cryptography.verifySignature('03047cd865161c3243c7b7a4d389ff407befbb3dd23f520152bc2a6ff2e2f0463d', '9e2d90f1ebc39cd7852973c6bab748579d82c93e4a2aa5b44a7769e51a606fd9', 'c4f3d2cc47d999cfff0eb6845fb41cab3a0735afecd1fa178235d10e3d9aac835fdea24640626f6bae8795594f82c7ad86c3a1413d059c6fa38e7c442b58d6e001');
  > true
