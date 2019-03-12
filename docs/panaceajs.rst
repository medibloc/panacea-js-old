.. _panaceajs:

.. include:: include_announcement.rst

=====
panaceajs
=====

.. code-block:: javascript

    var Panaceajs = require('@medibloc/panacea-js');
    var panaceajs = Panaceajs.init(['http://localhost:9921']);


The ``panaceajs`` object has following objects.

- The :ref:`client <client>` object allows you to interact with MediBloc blockchain.
- The :ref:`cryptography <cryptography>` object contains cryptographic functions.
- The :ref:`local.Account <account>` object contains functions to generate MediBloc accounts, which contain encrypted private key and public key and can induce public key from the private key.
- The :ref:`local.transaction <transaction>` object contains functions to generate transaction.
- The :ref:`healthData <healthData>` object helps to encode and decode the health data as :ref:`MHD format <mhd>`.
- The :ref:`identification <identification>` contains identification functions.
- The :ref:`utils <utils>` object provides utility functions for panaceajs.

Parameters
----------

``nodes`` - ``Array``: The array of node URL that will be used for the request.

.. Hint::
    The panaceajs client sends a request to one of the nodes. If the request fails, it automatically retries the request to another node.

.. include:: include_blockchain_note.rst
