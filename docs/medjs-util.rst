.. _medjs-utils:


====
medjs.utils
====

The ``medjs.utils`` provides utility functions for medjs.

To use this package standalone use:

.. code-block:: javascript

  var Medjs = require('medjs');
  var medjs = Medjs(['http://localhost:9921']);
  var Utils = new medjs.utils;

----

.. _utils:

|
check address type
====

.. code-block:: javascript

  Utils.isAddress(pubKey);

To validate the public key, you can use ``Utils.isAddress(pubKey)``.

.. note:: MediBloc use public key as an address.

----
Parameters
----

``pubKey`` - ``String`` : The public key to be validated

----
Returns
----

``Boolean`` - It is ``true`` if the public key is valid.

----
Example
----

.. code-block:: javascript

  Utils.isAddress('037d91596727bc522553510b34815f382c2060cbb776f2765deafb48ae528d324b');
  > true


|
check hexadecimal type
====

.. code-block:: javascript

  Utils.isHexadecimal(string);

To check the type of the string, you can use ``Utils.isHexadecimal(string)``.

----
Parameters
----

``string`` - ``String`` : The string to be validated

----
Returns
----

``Boolean`` - It is ``true`` if the string is hexadecimal.

----
Example
----

.. code-block:: javascript

  Utils.isHexadecimal('1234567890abcdef');
  > true
