.. _utils:''

.. include:: include_announcement.rst

===========
medjs.utils
===========

The ``medjs.utils`` provides utility functions for medjs.

To use this package standalone use:

.. code-block:: javascript

  var Utils = require('medjs').utils;
  //
  // Instead, you can import from medjs like below.
  //
  // var Medjs = require('medjs');
  // var medjs = Medjs.init(['http://localhost:9921']);
  // var Utils = medjs.utils;

---------------------------------------------------------------------------

genHexBuf
=========

.. code-block:: javascript

  Utils.genHexBuf(str, bytesLen);

Returns ``Buffer`` or ``Uint8Array`` from a string with exact length in bytes.

----------
Parameters
----------

1. ``str`` - ``String`` : The string to generate a buffer.
2. ``bytesLen`` - ``Number`` : The target length in bytes.

-------
Returns
-------

``Buffer|Uint8Array`` - The result Buffer or Uint8Array.

-------
Example
-------

.. code-block:: javascript

  Utils.genHexBuf('12ab', 5);
  > <Buffer 00 00 00 12 ab>

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

padLeftWithZero
===============

.. code-block:: javascript

  Utils.padLeftWithZero(str, len);

Adds a ``'0'`` padding on the left of a string.

----------
Parameters
----------

1. ``str`` - ``String`` : The string to add padding on the left.
2. ``len`` - ``Number`` : The total length of the string should have.

-------
Returns
-------

``String`` - The padded string.

-------
Example
-------

.. code-block:: javascript

  Utils.padLeftWithZero('12ab', 10);
  > '00000012ab'

---------------------------------------------------------------------------

randomHex
=========

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
