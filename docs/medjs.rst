.. _medjs:

.. include:: include_announcement.rst

=====
medjs
=====

The ``medjs`` object have following objects.

- The :ref:`client <client>` object allows you to interact with an MediBloc blockchain.
- The *cryptography* object. // TODO
- The :ref:`local.Account <medjs-account>` contains functions to generate MediBloc accounts which contain encrypted private key and public key, induce public key from the private key.
- The :ref:`local.Data <medjs-data>` contains functions which control the data or file.
- The :ref:`local.Transaction <medjs-transactions>` contains functions to generate transaction, hash, signature, and so on.
- The *util* object. // TODO

**Parameters**

1. ``nodes`` - ``Array``: The array of node URL that will be used for the request.


.. include:: include_blockchain_note.rst


**Example**

.. code-block:: javascript

    var Medjs = require('medjs');
    var medjs = Medjs(['http://localhost:9921']);
