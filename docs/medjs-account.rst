.. _medjs-account:


====
medjs.local.Account
====

The ``medjs.local.Account`` contains functions to generate MediBloc accounts which contain encrypted private key and public key, induce public key from the private key.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Account = new medjs.local.Account;

----

.. _account-create:

|
create
====

.. code-block:: javascript

  new medjs.account(passphrase, encryptedPrivateKey);

To generate account, you can use ``medjs.account()``. Basically account is just a private and public keypair which has several methods described below.

.. note:: MediBloc use public key as an address.

----
Parameters
----

1. ``passphrase`` - ``string`` :(optional) A random string to encrypt private key. If not given it will encrypt private key with empty string.
2. ``encryptedPrivateKey`` - ``string`` :(optional) Restore account matched with the given encrypted private key. If not given it will generate new keypair.

.. note:: If ``passphrase`` isn't matched with ``encryptedPrivateKey``, it will return a different private key.

----
Returns
----

``Object`` - The account object with the following structure:

- ``pubKey`` - ``string``: The account's public key.
- ``encPrivKey`` - ``string``: The account's encrypted private key. This should never be shared or stored
- ``getDecryptedPrivateKey(passphrase)`` - ``Function``: The function to decrypt account's encrypted private key and return it.

----
Example
----

.. code-block:: javascript

  new Account();
  > {
    encryptedPrivKey: '6cd4d5aa9385c9897f7b143adc104e8c7d185a4c87eb21c828…fefa6b2a087f47445908b766bebe9c5f05c2551901c0e29cb',
    pubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    getDecryptedPrivateKey: function(passphrase){...}
  }

  new Account('123456789abcdeABCDE!@#');
  > {
    encryptedPrivKey: '6cd4d5aa9385c9897f7b143adc104e8c7d185a4c87eb21c828…fefa6b2a087f47445908b766bebe9c5f05c2551901c0e29cb',
    pubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    getDecryptedPrivateKey: function(passphrase){...}
  }

  new Account('123456789abcdeABCDE!@#', '6cd4d5aa9385c9897f7b143adc104e8c7d185a4c87eb21c828…fefa6b2a087f47445908b766bebe9c5f05c2551901c0e29cb');
  > {
    encryptedPrivKey: '6cd4d5aa9385c9897f7b143adc104e8c7d185a4c87eb21c828…fefa6b2a087f47445908b766bebe9c5f05c2551901c0e29cb',
    pubKey: '037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b',
    getDecryptedPrivateKey: function(passphrase){...}
  }

.. note:: SDK doesn't hold or share unencrypted private key. Account object holds encrypted private key and only right passphrase can retrieve unencrypted private key.

|
----

|
get decrypted private key
====

.. code-block:: javascript

  var account = new Account();
  account.getDecryptedPrivateKey(passphrase);

Decrypt encrypted private key with the passphrase from the ``account`` object.

----
Parameters
----

``passphrase`` - ``string`` :(optional) Passphrase string to encrypt private key. If not given, empty string is used to decrypt.

.. note:: If ``passphrase`` isn't matched with ``encryptedPrivateKey``, it will return a different private key.

----
Returns
----

``string`` - Decrypted private key in hex format.

----
Example
----

.. code-block:: javascript

  var account = new Account('123456789abcdeABCDE!@#');
  account.getDecryptedPrivateKey('123456789abcdeABCDE!@#');
  > "960d2ea9a19b2b939b2ecbdbba75ffb50aafa0b63a73cd1b614cb53c50482d26"
