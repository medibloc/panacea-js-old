.. _utils:

.. include:: include_announcement.rst

===========
medjs.utils
===========

The ``medjs.utils`` provides utility functions for medjs.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Utils = medjs.utils;

---------------------------------------------------------------------------

.. _utils-isAddress:

isAddress
=========

.. code-block:: javascript

  Utils.isAddress(pubKey);

To validate the public key, you can use ``Utils.isAddress(pubKey)``.

.. note:: MediBloc use public key as an address.

----------
Parameters
----------

``pubKey`` - ``String`` : The public key to validate.

-------
Returns
-------

``Boolean`` - It is ``true`` if the public key is valid.

-------
Example
-------

.. code-block:: javascript

  Utils.isAddress('037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b');
  > true

---------------------------------------------------------------------------

isHexadecimal
=============

.. code-block:: javascript

  Utils.isHexadecimal(string);

To check the type of the string, you can use ``Utils.isHexadecimal(string)``.

----------
Parameters
----------

``string`` - ``String`` : The string to be validated.

-------
Returns
-------

``Boolean`` - It is ``true`` if the string is in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  Utils.isHexadecimal('1234567890abcdef');
  > true

---------------------------------------------------------------------------

randomHex
============

.. code-block:: javascript

  Utils.randomHex(length);

To get a random seed number, you can use ``Utils.randomHex(length)``.

----------
Parameters
----------

``length`` - ``Number`` : (optional) The byte size of a random seed number. If not given, 16 is used.

-------
Returns
-------

``String`` - The random number in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  Utils.randomHex();
  > 'baab6c02ce89592e03b8f9bbea8eb553'

---------------------------------------------------------------------------

sha3
====

.. code-block:: javascript

  Utils.sha3(msg);

To hash messages, you can use ``Utils.sha3(msg)``. This function uses SHA3_256 algorithm and returns 256bit hexadecimal string.

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

  Utils.sha3('Hello MediBloc!!!');
  > '25cd0631574c642502446ace0c9c46811f1404e39d6d892771b346724851dd7e'

---------------------------------------------------------------------------

sha3Stream
==========

.. code-block:: javascript

  Utils.sha3Stream(stream);

To hash stream, you can use ``Utils.sha3Stream(stream)``. This function uses SHA3_256 algorithm and returns 256bit hexadecimal string.

----------
Parameters
----------

``stream`` - ``Stream`` : The readable stream.

-------
Returns
-------

``String`` - The hash string in hexadecimal format.

-------
Example
-------

.. code-block:: javascript

  Utils.sha3Stream(stream); // some readable stream
  > '8a1fb1154b917c9e3df4370008e0bf34c6de6babb1592225371731a71a9b2e13'
