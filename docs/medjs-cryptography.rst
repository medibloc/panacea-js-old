.. _medjs-cryptography:


====
medjs.cryptography
====

The ``medjs.cryptography`` contains cryptographic functions.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Cryptography =  medjs.cryptography

----

.. _cryptography-encrypt:

|
encrypt data
====

.. code-block:: javascript

  var encryptUtil = Cryptography.encrypt;
  encryptUtil.encryptData(accessKey, msg);

To encrypt data you can use ``Cryptography.encrypt.encryptData(accessKey, msg)``. It generates encrypted string message using AES-256-CTR algorithm. Initialization vector(IV) is generated from access key. So there's no need to store iv value, but only need to use access key.

.. note:: Encrypt algorithm can be changed.

----
Parameters
----

1. ``accessKey`` - ``String`` : The access key to encrypt data using symmetric key algorithm. If not given, empty string is used.
2. ``msg`` - ``String|Object|Number`` : The message is stringified and encrypted with the access key.

----
Returns
----

``String`` - The encrypted message with hexadecimal format.

----
Example
----

.. code-block:: javascript

  var encryptUtil = Cryptography.encrypt;
  encryptUtil.encryptData('this is access key !', 'hello medibloc!');
  > 'fe062e8327e88a06b5d3eb98ea12b4'


|
decrypt data
====

.. code-block:: javascript

  var encryptUtil = Cryptography.encrypt;
  encryptUtil.decryptData(accessKey, encryptedMsg);

To decrypt data you can use ``Cryptography.encrypt.decryptData(accessKey, encryptedMsg)``. It decrypt encrypted message using AES-256-CTR algorithm. Initialization vector(IV) is generated from access key.

.. note:: Decrypt algorithm can be changed.

----
Parameters
----

1. ``accessKey`` - ``String`` : The access key to decrypt data using symmetric key algorithm. If not given, empty string is used.
2. ``encryptedMsg`` - ``String`` : The encryptedMsg is hexadecimal string.

.. note:: In decrypt, ``encryptedMsg`` must be the string generated through ``Cryptography.encrypt``. If not it returns wrong result.

----
Returns
----

``String`` - The encrypted message with hexadecimal format.

----
Example
----

.. code-block:: javascript

  var encryptUtil = Cryptography.encrypt;
  encryptUtil.decryptData('this is access key !', 'fe062e8327e88a06b5d3eb98ea12b4');
  > 'hello medibloc!'

|
hash data
====

.. code-block:: javascript

  var hashUtil = Cryptography.hash;
  hashUtil.hashData(msg);

To hash message, you can use ``Cryptography.hash.hashData(msg)``. It use SHA3_256 algorithm and returns 256bit hexadecimal string.

----
Parameters
----

- ``msg`` - ``String|Object|Number`` : The message is stringified.

----
Returns
----

``String`` - The hash string with hexadecimal format.

----
Example
----

.. code-block:: javascript

  var hashUtil = Cryptography.hash;
  hashUtil.hashData('Hello MediBloc!!!');
  > '25cd0631574c642502446ace0c9c46811f1404e39d6d892771b346724851dd7e'
