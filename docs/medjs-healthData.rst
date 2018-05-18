.. _healthData:

.. include:: include_announcement.rst

=======================
medjs.healthData (TODO)
=======================

The ``medjs.healthData`` object help to create healthDataPayload

.. code-block:: javascript

    var Medjs = require('medjs');
    var medjs = Medjs(['http://localhost:9921']);
    var healthData = medjs.healthData;

.. warning::
  This object is not yet developed in medjs.

.. include:: include_blockchain_note.rst

---------------------------------------------------------------------------

encodeDataFromFile
==================

.. code-block:: javascript

    medjs.healthData.encodeDataFromFile(file_path, type)

Returns encoded ``Buffer|Uint8Array`` object of the health data read from the file path.


Parameters
----------

1. ``file_path`` - ``String``: The path of the file to read.
2. ``type`` - ``String``: The type of the data.

Returns
-------

``Buffer|Uint8Array`` - The buffer or Uint8Array object of the data:

Example
-------

.. code-block:: javascript

    healthData = medjs.healthData.encodeDataFromFile(('./file/path', 'fhir')
    console.log(healthData)
    > {
      // TODO: show example
    }

---------------------------------------------------------------------------

decodeData
==========

.. code-block:: javascript

    medjs.healthData.decodeData(data, type)

Returns decoded data.


Parameters
----------

1. ``data`` - ``Buffer|Uint8Array``: The Buffer or Uint8Array of the data.
2. ``type`` - ``String``: The type of the data.

Returns
-------

``Object`` - The object of the data:

Example
-------

.. code-block:: javascript

    plainData = medjs.healthData.decodeData((//TODO: put data, 'fhir')
    console.log(plainData)
    > {
      // TODO: show example
    }
