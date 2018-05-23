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

MediBloc Health Data(MHD) Format
================================

========  ==========   =================================
Offset    Bytes        Description
--------  ----------   ---------------------------------
0         4            magic number(0x004d4844)
4         2            protocol version
6         2            type
8         2            subtype
10        32           hash of the encoded health data
42        6            encoded health data size(m)
48        m            encoded health data
========  ==========   =================================

.. warning::
  This format may be changed.

---------------------------------------------------------------------------

decodeData
==========

.. code-block:: javascript

    medjs.healthData.decodeData(data)

Returns decoded health data.

Parameters
----------

``data`` - ``Buffer|Uint8Array``: The MHD format health data.

Returns
-------

``Promise`` returns ``Object`` - The json object of the health data:

Example
-------

.. code-block:: javascript

    medjs.healthData.decodeData(data).then(console.log)
    > {
    // TODO show example
    }

---------------------------------------------------------------------------


decodeDataFromFile
==================

.. code-block:: javascript

    medjs.healthData.decodeDataFromFile(filePath)

Returns decoded health data from the file path.

Parameters
----------

``filePath`` - ``String``: The path of the MHD format file to read.

Returns
-------

``Promise`` returns ``Object`` - The json object of the health data:

Example
-------

.. code-block:: javascript

    var plainData = medjs.healthData.decodeDataFromFile('./file/path')
    console.log(plainData)
    > {
    // TODO show example
    }

---------------------------------------------------------------------------


encodeData
==========

.. code-block:: javascript

    medjs.healthData.encodeData(data, type, subType)

Returns encoded ``Buffer|Uint8Array`` object as MHD format of the health data.


Parameters
----------

1. ``data`` - ``Object``: The object of the health data to encode.
2. ``type`` - ``String``: The type of the health data.
3. ``subType`` - ``String``: (optional) The subtype of the health data.

Returns
-------

``Promise`` returns ``Buffer|Uint8Array`` - The MHD format object of the health data.

Example
-------

.. code-block:: javascript

    medjs.healthData.encodeData(data, 'fhir', 'patient').then(console.log)
    > {
    // TODO show example
    }

---------------------------------------------------------------------------


encodeDataFromFile
==================

.. code-block:: javascript

    medjs.healthData.encodeDataFromFile(filePath, type, subType)

Returns MHD format object of the health data reading from the file path.


Parameters
----------

1. ``filePath`` - ``String``: The path of the file to read.
2. ``type`` - ``String``: The type of the health data.
3. ``subType`` - ``String``: (optional) The subtype of the health data.


Returns
-------

``Promise`` returns ``Buffer|Uint8Array`` - The MHD format object of the health data.

Example
-------

.. code-block:: javascript

    medjs.healthData.encodeDataFromFile('./file/path', 'fhir', 'patient').then(console.log)
    > {
    // TODO show example
    }
