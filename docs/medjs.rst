.. _medjs:

.. include:: include_announcement.rst

=====
medjs
=====

The ``medjs`` object have following objects.

- The :ref:`client <client>` object allows you to interact with an MediBloc blockchain.
- The :ref:`cryptography <cryptography>` object contains cryptographic functions.
- The :ref:`local.Account <account>` object contains functions to generate MediBloc accounts which contain encrypted private key and public key, induce public key from the private key.
- The :ref:`local.Transaction <transaction>` object contains functions to generate transaction, hash, signature, and so on.
- The :ref:`utils <utils>` object provides utility functions for medjs.

**Parameters**

``nodes`` - ``Array``: The array of node URL that will be used for the request.

.. Hint::
    The medjs client sends a request to one of the nodes. If the request failed, it automatically retries the request to another node.

.. include:: include_blockchain_note.rst


**Example**

.. code-block:: javascript

    var Medjs = require('medjs');
    var medjs = Medjs(['http://localhost:9921']);
