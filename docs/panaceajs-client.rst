.. _client:

.. include:: include_announcement.rst

============
medjs.client
============

The ``medjs.client`` object allows you to interact with the MediBloc blockchain.

.. code-block:: javascript

  var Medjs = require('medjs');
  var Client = Medjs.client(['http://localhost:9921']);
  //
  // Instead, you can import from medjs like below.
  //
  // var Medjs = require('medjs');
  // var medjs = Medjs.init(['http://localhost:9921']);
  // var Client = medjs.client;

.. include:: include_blockchain_note.rst

---------------------------------------------------------------------------


getAccount
==========

.. code-block:: javascript

  Client.getAccount(address, height, type)

Returns the state of the account at a given block height.


Parameters
----------

1. ``address`` - ``String``: The address of the account of which to get the state.
2. ``height`` - ``Number``: The height of the block.
3. ``type`` - ``String``: The string ``'genesis'``, ``'confirmed'``, ``'tail'``.

.. note:: If type is set among ``'genesis'``, ``'confirmed'`` and ``'tail'``, height is ignored.

Returns
-------

``Promise`` returns ``Object`` - The object of the account state:

  - ``address`` - ``String``: The address of the account.
  - ``balance`` - ``String``: The balance in 1e-12 MED of the account at the block.
  - ``bandwidth`` - ``String``: The consumed bandwidth.
  - ``nonce`` - ``String``: The nonce of the account at the block.
  - ``unstaking`` - ``String``: The amount of MED which is in progress of unstaking.
  - ``vesting`` - ``String``: The vesting in 1e-12 MED of the account at the block.
  - ``voted`` - ``String``: Voted address.

.. note:: ``balance`` and ``vesting`` '1' indicates '0.000000000001' (1e-12) MED.

Example
-------

.. code-block:: javascript

  Client.getAccount('02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c', 1, 'tail')
  .then(console.log);
  > {
    address: "02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c",
    balance: "500000690000000000000",
    bandwidth: "0",
    nonce: "1",
    unstaking: "0",
    vesting: "500000000000000000000",
    voted: ["02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c"],
  }

---------------------------------------------------------------------------


getBlock
========

.. code-block:: javascript

  Client.getBlock(hash, height, type)

Returns a block matching the given block hash.


Parameters
----------

1. ``hash`` - ``String``: The hash of the block.
2. ``height`` - ``Number``: The height of the block.
3. ``type`` - ``String``: The string ``'genesis'``, ``'confirmed'``, ``'tail'``.

.. note:: If hash is sent, other fields are ignored.

Returns
-------

``Promise`` returns ``Object`` - The Block object:

  - ``accs_root`` - ``String``: The root hash of the accounts trie at the block.
  - ``alg`` - ``Number``: The signature algorithm of the block.
  - ``chain_id`` - ``Number``: The chain id of the block.
  - ``coinbase`` - ``String``: The coinbase address of the block.
  - ``dpos_root`` - ``String``: The root hash of the dpos trie at the block.
  - ``hash`` - ``String``: The hash of the block.
  - ``height`` - ``String``: The height of the block.
  - ``parent_hash`` - ``String``: The parent block's hash of the block.
  - ``reward`` - ``String``: The block producing reward.
  - ``sign`` - ``String``: The signature of the block.
  - ``supply`` - ``String``: The total supply of MED.
  - ``timestamp`` - ``String``: The timestamp of the block.
  - ``transactions`` - ``Array``: The transaction objects array of the block.
  - ``txs_root`` - ``String``: The root hash of the transactions trie at the block.


Example
-------

.. code-block:: javascript

  Client.getBlock('4341669cbe7ed0c04640ebb2882e2290abdfbc4b9d162474826e5bd2a6efd259')
  .then(console.log);
  > {
    accs_root: "829745260cde8156131871962eae28db7a57736053c40d49261656e91a49062a"
    alg: 1,
    chain_id: 1,
    coinbase: "02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c",
    dpos_root: "0a2017e57591d063ce1bc6bef82e1067f3e331037be811f3a192e346bd74a6ae06ae1220cd68b8e3a73670bd261712c76464d9814aef9b49012c690096277fc0aaebb2b7",
    hash: "4341669cbe7ed0c04640ebb2882e2290abdfbc4b9d162474826e5bd2a6efd259",
    height: "361",
    parent_hash: "0049aecc65a6383003d7dd392f925c0dfbd79c5e61ca789246f511b59c3970a7",
    reward: "46000000000000",
    sign: "649b96816d3dbc4d3df536f72cf1baf9886d00cd8b91b95132d1103f1308ae1f13101aca4a5f8b9193cb4ac23d19056eaeea45705ab47b13cf4f7e27e131f57f01",
    supply: "10000016560000000000000",
    timestamp: "1536044076",
    transactions: [],
    txs_root: "7a3d9780b7d68a05fb96ac180b67041e1b4c1ca68b8c2772566fce2dadd28dcb"
  }

---------------------------------------------------------------------------


getBlocks
=========

.. code-block:: javascript

  Client.getBlocks(from, to)

Returns blocks in given range.


Parameters
----------

1. ``from`` - ``Number``: The from height of the block.
2. ``to`` - ``Number``: The to height of the block.

Returns
-------

``Promise`` returns ``Array`` - The array of the Blocks:

  - ``accs_root`` - ``String``: The root hash of the accounts trie at the block.
  - ``alg`` - ``Number``: The signature algorithm of the block.
  - ``chain_id`` - ``Number``: The chain id of the block.
  - ``coinbase`` - ``String``: The coinbase address of the block.
  - ``dpos_root`` - ``String``: The root hash of the dpos trie at the block.
  - ``hash`` - ``String``: The hash of the block.
  - ``height`` - ``String``: The height of the block.
  - ``parent_hash`` - ``String``: The parent block's hash of the block.
  - ``reward`` - ``String``: The block producing reward.
  - ``sign`` - ``String``: The signature of the block.
  - ``supply`` - ``String``: The total supply of MED.
  - ``timestamp`` - ``String``: The timestamp of the block.
  - ``transactions`` - ``Array``: The transaction objects array of the block.
  - ``txs_root`` - ``String``: The root hash of the transactions trie at the block.


Example
-------

.. code-block:: javascript

  Client.getBlocks(3, 4)
  .then(console.log);
  > [
    {height: '3', ...},
    {height: '4', ...}
  ]

---------------------------------------------------------------------------


getMedState
===========

.. code-block:: javascript

  Client.getMedState()

Returns the current state of a node.


Returns
-------

``Promise`` returns ``Object`` - The object of the node state:

  - ``chain_id`` - ``Number``: The chain id of the node.
  - ``tail`` - ``String``: The hash of the most recent block.
  - ``height`` - ``String``: The height of the most recent block.
  - ``LIB`` - ``String``: The hash of the last irreversible block.


Example
-------

.. code-block:: javascript

  Client.getMedState()
  .then(console.log);
  > {
    chain_id: 1,
    tail: 'e2bd04e46ffd8ee1226d8ad8577a414ae57e226512d38d6b422e0413df36dfc0',
    height: '541',
    LIB: '432492182c8be7f30b552bceafe3f6bdaacd77a16bd396a9feaa112dbd52b5d5'
  }

---------------------------------------------------------------------------


getCandidates
=============

.. code-block:: javascript

  Client.getCandidates()

Returns the list of candidates.


Returns
-------

``Promise`` returns ``Array`` - The array of the candidates:

  - ``address`` - ``String``: The address of the candidate.
  - ``collatral`` - ``String``: The collatral of the candidate.
  - ``votePower`` - ``String``: The vote power of the candidate.


Example
-------

.. code-block:: javascript

  Client.getCandidates()
  .then(console.log);
  > [
    {
      address: "03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939",
      collatral: "0",
      votePower: "500000000000000000000",
    },
    ...
  ]

---------------------------------------------------------------------------


getDynasty
==========

.. code-block:: javascript

  Client.getDynasty()

Returns the list of block producers.


Returns
-------

``Promise`` returns ``Array`` - The array of the candidates:

  - ``address`` - ``String``: The address of the block producer.


Example
-------

.. code-block:: javascript

  Client.getDynasty()
  .then(console.log);
  > [
    "03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939",
    "02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c",
    ...
  ]

---------------------------------------------------------------------------

getTransaction
==============

.. code-block:: javascript

  Client.getTransaction(hash)

Returns the transaction matching a given transaction hash.


Parameters
----------

``hash`` - ``String``: The hash of the transaction.


Returns
-------

``Promise`` returns ``Object`` - The object of the transaction:

  - ``hash`` - ``String``: The hash of the transaction.
  - ``from`` - ``String``: The address which use it's bandwidth. Or the address which to send this value from.
  - ``to`` - ``String``: The address which to take this value.
  - ``value`` - ``String``: The transferred value in 1e-12 MED.
  - ``payload`` - ``String``: The payload hex string made from protoBuffer.
  - ``tx_type`` - ``String``: The type of the transaction.
  - ``nonce`` - ``String``: The nonce indicates the number of transactions that this account has made.
  - ``chain_id`` - ``Number``: The chain id of the blockchain which this transaction belong to.
  - ``alg`` - ``Number``: The signature algorithm of the transaction.
  - ``sign`` - ``String``: The signature of the transaction.
  - ``payer_sign`` - ``String``: The signature of the payer.
  - ``executed`` - ``Boolean``: ``True if the transaction is executed and included in the block. otherwise, false.``:

.. note:: ``value`` '1' indicates '0.000000000001' (1e-12) MED.

Example
-------

.. code-block:: javascript

  Client.getTransaction('e6e2cbd69c32604f4a5195bbc0063876611c36d42a64ec95c6005bb1f3234d88')
  .then(console.log);
  > {
    hash: 'e6e2cbd69c32604f4a5195bbc0063876611c36d42a64ec95c6005bb1f3234d88',
    from: '02b83999492119eeea90a44bd621059e9a2f0b8219e067fb040473754a1821da07',
    to: '02b83999492119eeea90a44ad621059e9a2f0b8219e067fb040473754a1821da07',
    value: '100000000',
    payload: '',
    tx_type: 'transfer',
    nonce: '3',
    chain_id: 1,
    alg: 1,
    sign: 'ca4b60467a75c53a95f7f85578c7e01a4e72598e6bc10866cd2db54daa59f7786ad07467b45164b47147039d2969863a7b2d208fd6e24042d04431a804333bd501',
    payer_sign: '',
    executed: true
  }

---------------------------------------------------------------------------


sendTransaction
===============

.. code-block:: javascript

  Client.sendTransaction(transaction)

Returns a transaction hash.


Parameters
----------

``transaction`` - ``Object``: The :ref:`Transaction <transaction>` object created and signed.


Returns
-------

``Promise`` returns ``Object`` - The object contains the transaction hash:

  - ``hash`` - ``String``: The hash of the transaction.

.. note:: Receiving hash of the transaction **does not** mean it is valid or it is uploaded to the blockchain.


Example
-------

.. code-block:: javascript

  Client.sendTransaction(tx)
  .then(console.log);
  > {
    hash: '2edfc32b61528cedd3cafe7a794020d32ae3bcbfbc45fb810e169f34a4a30208'
  }
