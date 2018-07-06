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


getAccountState
===============

.. code-block:: javascript

  Client.getAccountState(address, height)

Returns the state of the account at a given block height.


Parameters
----------

1. ``address`` - ``String``: The address of the account of which to get the state.
2. ``height`` - ``Number|String``: The height of the block. Or the string ``'genesis'``, ``'confirmed'``, ``'tail'``.



Returns
-------

``Promise`` returns ``Object`` - The object of the account state:

  - ``address`` - ``String``: The address of the account.
  - ``balance`` - ``String``: The balance in 1e-8 MED of the account at the block.
  - ``certs_issued`` - ``Array``: Account addresses certificated by the account.
  - ``certs_received`` - ``Array``: Account addresses that have certificated the account.
  - ``nonce`` - ``String``: The nonce of the account at the block.
  - ``records`` - ``Array``: Hash list of records.
  - ``vesting`` - ``String``: The vesting in 1e-8 MED of the account at the block.
  - ``voted`` - ``String``: Voted address.

.. note:: ``balance`` and ``vesting`` '1' indicates '0.00000001' (1e-8) MED.

Example
-------

.. code-block:: javascript

  Client.getAccountState('02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c', 1)
  .then(console.log);
  > {
    address: '02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c',
    balance: '100000000000000000',
    certs_issued: [],
    certs_received: [],
    nonce: '0',
    records: [],
    vesting: '0',
    voted: ''
  }


  Client.getAccountState('02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c', 'latest')
  .then(console.log);
  > {
    address: '02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c',
    balance: '99999999000000000',
    certs_issued: [],
    certs_received: [],
    nonce: '1',
    records: [],
    vesting: '0',
    voted: ''
  }

---------------------------------------------------------------------------


getBlock
========

.. code-block:: javascript

  Client.getBlock(hash)

Returns a block matching the given block hash.


Parameters
----------

``hash`` - ``String``: The hash of the block. Or the string ``'genesis'``, ``'confirmed'``, ``'tail'``.


Returns
-------

``Promise`` returns ``Object`` - The Block object:

  - ``hash`` - ``String``: The hash of the block.
  - ``parent_hash`` - ``String``: The parent block's hash of the block.
  - ``coinbase`` - ``String``: The coinbase address of the block.
  - ``timestamp`` - ``String``: The timestamp of the block.
  - ``chain_id`` - ``Number``: The chain id of the block.
  - ``alg`` - ``Number``: The signature algorithm of the block.
  - ``sign`` - ``String``: The signature of the block.
  - ``accs_root`` - ``String``: The root hash of the accounts trie at the block.
  - ``txs_root`` - ``String``: The root hash of the transactions trie at the block.
  - ``usage_root`` - ``String``: The root hash of the usage trie at the block.
  - ``records_root`` - ``String``: The root hash of the records trie at the block.
  - ``consensus_root`` - ``String``: The root hash of the consensus trie at the block.
  - ``transactions`` - ``Array``: The transaction objects array of the block.
  - ``height`` - ``String``: The height of the block.


Example
-------

.. code-block:: javascript

  Client.getBlock('1091173fe2bc7087e559bedf871a04e99927c92dad42d6270ae22c1bba720c30')
  .then(console.log);
  > {
    hash: '1091173fe2bc7087e559bedf871a04e99927c92dad42d6270ae22c1bba720c30',
    parent_hash: 'eb71569022ead2d290123bae4563a361a207109c1ef18969646570b566aa02e2',
    coinbase: '02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c',
    timestamp: '1526033040',
    chain_id: 1,
    alg: 1,
    sign: '8844c0ab33338906f64c45bd4849b7916a458dd9d8a960428b3e5d27369054cd3250fc08133cceeac4f2d75220e3fa8c365ad7bdff167d84fcffd6c62d7cecee01',
    accs_root: 'f70f08d05514f549748620aa7cf677ae5303b8489f872e81078d09a538fcbec6',
    txs_root: '0362e767ab9fe76d940368cf97ae0318a99fb38dce60dd0bb56d23e28b86c3d7',
    usage_root: '7788b87f9b2be5b10e27cc080cf662e144b5f78d7222bd265b5721c7481ba39a',
    records_root: '7788b87f9b2be5b10e27cc080cf662e144b5f78d7222bd265b5721c7481ba39a',
    consensus_root: 'bc28b8ef7f709b7457f5459db562a011e481232148dcbcb44b1e9f3d0eefdfbc',
    transactions: [],
    height: '5093'
  }

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
  - ``value`` - ``String``: The transferred value in 1e-8 MED.
  - ``timestamp`` - ``String``: The timestamp of the transaction.
  - ``data`` - ``Object``: The transaction data object corresponding to each :ref:`transaction types <transaction-types>`.
  - ``nonce`` - ``String``: The nonce indicates the number of transactions that this account has made.
  - ``chain_id`` - ``Number``: The chain id of the blockchain which this transaction belong to.
  - ``alg`` - ``Number``: The signature algorithm of the transaction.
  - ``sign`` - ``String``: The signature of the transaction.
  - ``payer_sign`` - ``String``: The signature of the payer.
  - ``executed`` - ``Boolean``: ``True if the transaction is executed and included in the block. otherwise, false.``:

.. note:: ``value`` '1' indicates '0.00000001' (1e-8) MED.

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
    timestamp: '1530853255670',
    data: { type: 'binary', payload: '' },
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
