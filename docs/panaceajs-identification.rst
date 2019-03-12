.. _identification:

.. include:: include_announcement.rst

====================
medjs.identification
====================

The ``medjs.identification`` contains identification functions.

To use this package standalone use:

.. code-block:: javascript

  var Id = require('medjs').identification;
  //
  // Instead, you can import from medjs like below.
  //
  // var Medjs = require('medjs');
  // var medjs = Medjs.init(['http://localhost:9921']);
  // var Id = medjs.identification;

---------------------------------------------------------------------------

createCertificate
==============================

.. code-block:: javascript

  Id.createCertificate({ expireDate, issuer, issuerAccount, issueDate, passphrase, pubKey });

To create certificate, you can use ``Id.createCertificate({ expireDate, issuer, issuerAccount, issueDate, passphrase, pubKey })``. It generates certificate object which contains issuer's signature.

----------
Parameters
----------

``Object``

- ``expireDate`` - ``Number`` : The unix timestamp when certificate is expired.
- ``issuer`` - ``String`` : The issuer's url to check certificate authenticity.
- ``issuerAccount`` - ``Object`` : The certificate issuer's account object from ``new Account()``.
- ``issueDate`` - ``Number`` : The unix timestamp when issuing certificate.
- ``passphrase`` - ``String`` : The passphrase for the issuerAccount. Passphrase is used to decrypt private key from issuerAccount's ``encryptedPrivKey``.
- ``pubKey`` - ``String`` : The public key which to be certified by issuer.

-------
Returns
-------

``Object`` : The certificate object.

- ``expireDate`` - ``Number`` : The unix timestamp when certificate is expired.
- ``issuer`` - ``String`` : The issuer's url to check certificate authenticity.
- ``issueDate`` - ``Number`` : The unix timestamp when issuing certificate.
- ``pubKey`` - ``String`` : The public key which certified by the certificate.
- ``signature`` - ``String`` : The signature of issuer to certificate object.

-------
Example
-------

.. code-block:: javascript

  var issuer = new Account();
  Id.createCertificate({
    expireDate: Date.now() + (365 * 24 * 60 * 60 * 1000),
    issuer: 'https://medibloc.org',
    issuerAccount: issuer,
    issueDate: Date.now(),
    passphrase: '',
    pubKey: '031ae654051968bb57de12e36184fd9118c03d49e6c1d05ef99149074c31a8dcee',
  });
  > {
    expireDate: 1558588202729,
    issuer: 'https://medibloc.org',
    issueDate: 1527052202729,
    pubKey: '031ae654051968bb57de12e36184fd9118c03d49e6c1d05ef99149074c31a8dcee',
    signature: '520282dce69b18f2dfefad8345a68e26a7b84ded32bc64e5a43cf0743e35a946629bc4245fe814f40acd196d19d5f9afcec4f185aae936491a8ad0fc9e73224501',
  }

---------------------------------------------------------------------------

verifyCertificate
==============================

.. code-block:: javascript

  Id.verifyCertificate(certificate, timeStamp, issuerPubKey);

To verify certificate, you can use ``Id.verifyCertificate(certificate, timeStamp, issuerPubKey)``.

----------
Parameters
----------

1. ``certificate`` - ``Object`` : The certificate object from ``createCertificate()``
2. ``timeStamp`` - ``Number`` : The timeStamp to check whether the certificate is valid in the target time.
3. ``issuerPubKey`` - ``String`` : The issuerPubkey is the public key of the certificate issuer.

-------
Returns
-------

``Boolean`` : True if the certificate is valid.

-------
Example
-------

.. code-block:: javascript

  var certificate = {
    expireDate: 1558588202729,
    issuer: 'https://medibloc.org',
    issueDate: 1527052202729,
    pubKey: '031ae654051968bb57de12e36184fd9118c03d49e6c1d05ef99149074c31a8dcee',
    signature: '520282dce69b18f2dfefad8345a68e26a7b84ded32bc64e5a43cf0743e35a946629bc4245fe814f40acd196d19d5f9afcec4f185aae936491a8ad0fc9e73224501'
  };
  Id.verifyCertificate(certificate, Date.now(), '0253f338731d59180253be2a9eee8d8266948b23c71181a85df23b9883b19cb187')
  > true
