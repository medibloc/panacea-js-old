import { expect } from 'chai';
import { randomBytes } from 'crypto';
import { getPubKey } from 'cryptography';
import { Account } from 'local/account';
import Transaction from '../../../src/local/transaction';

// Account
describe('# Account class', () => {
  let account;
  let passphrase;
  beforeEach(() => {
    passphrase = 'medibloc';
    account = new Account(passphrase);
    return Promise.resolve();
  });
  describe('can generate account object', () => {
    it('Account object can be made without any arguments', () => {
      const newAccount = new Account();
      expect(newAccount).to.have.own.property('encryptedPrivKey');
      expect(newAccount).to.have.own.property('pubKey');
    });
    it('Account object can be made with passphrase', () => {
      expect(account).to.have.own.property('encryptedPrivKey');
      expect(account).to.have.own.property('pubKey');
    });
    it('Account object can not be made with decrypted privKey', () => {
      const privKey = randomBytes(32).toString('hex');
      expect(() => new Account(passphrase, privKey)).to.throw(Error);
    });
    it('Account object can be made with encrypted privKey', () => {
      const newAccount = new Account(passphrase, account.encryptedPrivKey);
      expect(newAccount).to.have.own.property('encryptedPrivKey')
        .to.eq(account.encryptedPrivKey);
      expect(newAccount).to.have.own.property('pubKey')
        .to.equal(account.pubKey);
    });
    it('Account object can be made with encrypted privKey and pubKey', () => {
      const newAccount = new Account(null, account.encryptedPrivKey, account.pubKey);
      expect(newAccount).to.have.own.property('encryptedPrivKey')
        .to.eq(account.encryptedPrivKey);
      expect(newAccount).to.have.own.property('pubKey')
        .to.equal(account.pubKey);
    });
    it('Get decrypted private key with appropriate passphrase', () => {
      const decryptedPrivKey = account.getDecryptedPrivateKey(passphrase);
      expect(getPubKey(decryptedPrivKey)).to.be.equal(account.pubKey);
    });
    it('Get decrypted private key with appropriate passphrase', () => {
      const wrongPassphrase = 'medibloc!';
      expect(() => account.getDecryptedPrivateKey(wrongPassphrase)).to.throw(Error, 'Key derivation failed - possibly wrong passphrase');
    });
  });
});

describe('# Account object', () => {
  let account1;
  let account2;
  const passphrase1 = 'MediBloc1!';
  const passphrase2 = 'MediBloc2@';
  const pubKey1 = '028b51f14da514bd29683da96c39b07ca9a5c008c3c5d392fe5f16db36388e73d1';
  const pubKey2 = '03c236cdff9cbd4a1e896dc2ea8b30f6ce2afe14a6da4a5aaec176970b519ed9bf';
  const encryptedPrivKey1 = {
    version: 3,
    id: '33ed4df1-e57b-436f-8cdc-29a8cc359503',
    address: '028b51f14da514bd29683da96c39b07ca9a5c008c3c5d392fe5f16db36388e73d1',
    crypto: {
      ciphertext: '2e8a30aad53bb99c7c5913425feeef84033f00a33157e674672cc5aceb91db03c3032a36bdb19cb1673a0121d3a7c26e436cb550132571555455542ef95693de',
      cipherparams: {
        iv: '972e35a23ca7f41b1becfb1f6db6cbff',
      },
      cipher: 'aes-128-ctr',
      kdf: 'scrypt',
      kdfparams: {
        dklen: 32,
        salt: '4f0080d7939f3902443703b13613a3ff25ccd2c1c3b6d666026048f49b83aff1',
        n: 8192,
        r: 8,
        p: 1,
      },
      mac: '052e319223f86812c34e61921908dc133a81cb427a494a778aa19803e3907dbc',
    },
  };
  const encryptedPrivKey2 = {
    version: 3,
    id: '0952fdd3-e2f7-44df-b22c-d092eeb6be5b',
    address: '03c236cdff9cbd4a1e896dc2ea8b30f6ce2afe14a6da4a5aaec176970b519ed9bf',
    crypto: {
      ciphertext: '600e485cdf5defa5bc1b234c781ffab3bf562e25e4550510cdd027d6e5dbafce90017deda9cd40f5cfdd5817dd7d8dd4d73f6e5a579bba9cae0ad692ac2d8fd5',
      cipherparams: {
        iv: '48d6e2e5aaf9efb00a08acb430a3b8fa',
      },
      cipher: 'aes-128-ctr',
      kdf: 'scrypt',
      kdfparams: {
        dklen: 32,
        salt: '3d36647a323c3400eb89e6639dd5b1b4d013a377412cdc1aee442fc84692ba77',
        n: 8192,
        r: 8,
        p: 1,
      },
      mac: '599b11bf8390174a960fa990792dfc5dd0f36d9b9e48bc309cb2be410f9ee617',
    },
  };
  const payerSignFromGo = 'e8592d40e28ec1f38ce80ff46d07fc1896e67f1bd230806d4d4728092043129223674bbe2e7e5e986764b5bb9f15079e315680ce9c8aefe20adefbd8c89f2d8500';
  beforeEach(() => {
    account1 = new Account(passphrase1, encryptedPrivKey1, pubKey1);
    account2 = new Account(passphrase2, encryptedPrivKey2, pubKey2);
    return Promise.resolve();
  });

  it('can sign transaction as payer', () => {
    const txHashFromGo = 'cb315e2f485d45e3c136b8795006c2bf1ff1a0ef6539d78cebffcb79424edb69';
    const txData = {
      chain_id: 1,
      from: '028b51f14da514bd29683da96c39b07ca9a5c008c3c5d392fe5f16db36388e73d1',
      to: '03c236cdff9cbd4a1e896dc2ea8b30f6ce2afe14a6da4a5aaec176970b519ed9bf',
      nonce: 1,
    };
    const tx = Transaction.valueTransferTx(txData);
    console.log(tx);
    account1.signTx(tx, 'MediBloc1!');
    account2.signTxAsPayer(tx, 'MediBloc2@');

    expect(tx.hash).to.equal(txHashFromGo);
    expect(tx.payerSign).to.equal(payerSignFromGo);
  });
});
