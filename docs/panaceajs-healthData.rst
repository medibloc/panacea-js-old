.. _healthData:

.. include:: include_announcement.rst

================
medjs.healthData
================

The ``medjs.healthData`` object helps to encode and decode the health data as :ref:`MHD format <mhd>`.

.. code-block:: javascript

  var HealthData = require('medjs').healthData;
  //
  // Instead, you can import from medjs like below.
  //
  // var Medjs = require('medjs');
  // var medjs = Medjs.init(['http://localhost:9921']);
  // var HealthData = medjs.healthData;

.. include:: include_blockchain_note.rst

---------------------------------------------------------------------------

.. _mhd:

MediBloc Health Data(MHD) Format
================================

========  ==========   ===============================================
Offset    Bytes        Description
--------  ----------   -----------------------------------------------
0         4            magic number(=0x004d4844)
4         2            protocol version
6         2            | type code
                       | ( unknown: 0, medical-fhir: 1,
                       | claim-fhir: 2, dicom: 3, ... )
8         2            | subtype code of each type
                       | ( for medical-fhir type,
                       | null: 0, patient: 1,
                       | observation: 2, ... )
10        32           hash of the encoded health data
42        6            encoded health data size(m)
48        m            encoded health data
========  ==========   ===============================================

We defined the MediBloc Health Data(MHD) format like above.
More types of health data and its subtype will be supported.

User should upload the hash of the encoded health data to the MediBloc blockchain.
By storing or transferring the health data as MHD type, it is easy to handle the health data with the blockchain.

.. warning::
  This format can be changed.

---------------------------------------------------------------------------

decodeData
==========

.. code-block:: javascript

  HealthData.decodeData(data)

Returns decoded health data.

Parameters
----------

``data`` - ``Buffer|Uint8Array``: The MHD format health data.

Returns
-------

``Promise`` returns ``Object`` - The JSON object of the health data.

Example
-------

.. code-block:: javascript

  var data = fs.readFileSync('/file/path');
  console.log(data);
  > <Buffer 00 4d 48 44 00 00 00 01 00 02 eb 36 d0 60 6f f8 4b ba 5a e8 4e 2a f0 f2 19 7b 2f f4 27 2c 3d 22 c4 6f fa 27 ca 17 85 1c ea 7f 00 00 00 00 01 15 0a 05 ... >

  HealthData.decodeData(data)
  .then(console.log);
  > {
      status: 'final',
      category: [ { coding: [Array] } ],
      code: { coding: [ [Object], [Object] ] },
      resourceType: 'Observation',
      effectiveDateTime: '2017-05-15',
      id: 'f101',
      context: { reference: 'Encounter/f100' },
      subject: { reference: 'Patient/f100' },
      valueQuantity:
      { code: 'kg',
        unit: 'kg',
        value: 78,
        system: 'http://unitsofmeasure.org' } }

---------------------------------------------------------------------------


decodeDataFromFile
==================

.. code-block:: javascript

  HealthData.decodeDataFromFile(filePath)

Returns decoded health data from the file path.

Parameters
----------

``filePath`` - ``String``: The path of the MHD format file to read.

Returns
-------

``Promise`` returns ``Object`` - The JSON object of the health data.

Example
-------

.. code-block:: javascript

  HealthData.decodeDataFromFile('/file/path')
  .then(console.log);
  > {
    status: 'final',
    category: [ { coding: [Array] } ],
    code: { coding: [ [Object], [Object] ] },
    resourceType: 'Observation',
    effectiveDateTime: '2017-05-15',
    id: 'f101',
    context: { reference: 'Encounter/f100' },
    subject: { reference: 'Patient/f100' },
    valueQuantity:
    { code: 'kg',
      unit: 'kg',
      value: 78,
      system: 'http://unitsofmeasure.org' } }

---------------------------------------------------------------------------


encodeData
==========

.. code-block:: javascript

  HealthData.encodeData(data, type, subType)

Returns encoded ``Buffer|Uint8Array`` object as MHD format of the health data.


Parameters
----------

1. ``data`` - ``Object|Uint8Array|Buffer``: The health data to encode.
2. ``type`` - ``String``: The type of the health data.
3. ``subType`` - ``String``:(optional) The subtype of the health data.

Returns
-------

``Promise`` returns ``Buffer|Uint8Array`` - The MHD format object of the health data.

Example
-------

.. code-block:: javascript

  var data = {
    resourceType: 'Observation',
    id: 'f101',
    status: 'final',
    category: [
      {
      coding: [
        {
        system: 'http://hl7.org/fhir/observation-category',
        code: 'vital-signs',
        display: 'Vital Signs',
        },
      ],
      },
    ],
    ...
  };

  HealthData.encodeData(data, 'medical-fhir', 'observation')
  .then(console.log);
  > {
    <Buffer 00 4d 48 44 00 00 00 01 00 02 eb 36 d0 60 6f f8 4b ba 5a e8 4e 2a f0 f2 19 7b 2f f4 27 2c 3d 22 c4 6f fa 27 ca 17 85 1c ea 7f 00 00 00 00 01 15 0a 05 ... >
  }

---------------------------------------------------------------------------


encodeDataFromFile
==================

.. code-block:: javascript

  HealthData.encodeDataFromFile(filePath, type, subType)

Returns encoded ``Buffer|Uint8Array`` object as MHD format object of the health data reading from the file path.


Parameters
----------

1. ``filePath`` - ``String``: The path of the file to read.
2. ``type`` - ``String``: The type of the health data.
3. ``subType`` - ``String``:(optional) The subtype of the health data.


Returns
-------

``Promise`` returns ``Buffer|Uint8Array`` - The MHD format object of the health data.

Example
-------

.. code-block:: javascript

  HealthData.encodeDataFromFile('/file/path', 'medical-fhir', 'observation')
  .then(console.log);
  > {
    <Buffer 00 4d 48 44 00 00 00 01 00 02 eb 36 d0 60 6f f8 4b ba 5a e8 4e 2a f0 f2 19 7b 2f f4 27 2c 3d 22 c4 6f fa 27 ca 17 85 1c ea 7f 00 00 00 00 01 15 0a 05 ... >
  }

---------------------------------------------------------------------------


hashData
========

.. code-block:: javascript

  HealthData.hashData(data, type, subType)

Returns the hash ``String`` of the health data.


Parameters
----------

1. ``data`` - ``Object|Uint8Array|Buffer``: The health data to encode.
2. ``type`` - ``String``: The type of the health data.
3. ``subType`` - ``String``:(optional) The subtype of the health data.


Returns
-------

``Promise`` returns ``String`` - The hash of the health data.

Example
-------

.. code-block:: javascript

  var data = {
    resourceType: 'Observation',
    id: 'f101',
    status: 'final',
    category: [
      {
      coding: [
        {
        system: 'http://hl7.org/fhir/observation-category',
        code: 'vital-signs',
        display: 'Vital Signs',
        },
      ],
      },
    ],
    ...
  };

  HealthData.hashData(data, 'medical-fhir', 'observation')
  .then(console.log);
  > {
    'eb36d0606ff84bba5ae84e2af0f2197b2ff4272c3d22c46ffa27ca17851cea7f'
  }

---------------------------------------------------------------------------

hashDataFromFile
================

.. code-block:: javascript

  HealthData.hashDataFromFile(filePath, type, subType)

Returns the hash ``String`` of the health data reading from the file path.


Parameters
----------

1. ``filePath`` - ``String``: The path of the file to read.
2. ``type`` - ``String``: The type of the health data.
3. ``subType`` - ``String``:(optional) The subtype of the health data.


Returns
-------

``Promise`` returns ``String`` - The hash of the health data.

Example
-------

.. code-block:: javascript

  HealthData.hashDataFromFile('/file/path', 'medical-fhir', 'observation')
  .then(console.log);
  > {
    'eb36d0606ff84bba5ae84e2af0f2197b2ff4272c3d22c46ffa27ca17851cea7f'
  }
