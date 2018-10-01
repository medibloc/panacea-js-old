import { expect } from 'chai';
import { randomBytes } from 'crypto';
import { getPubKey } from 'cryptography';
import { Account } from 'local/account';

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
