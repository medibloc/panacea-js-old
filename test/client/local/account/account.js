import { expect } from 'chai';
import { Account } from '../../../../src/client/local/account';
import { keyGen, encrypt } from '../../../../src/crypto';


// Account
describe('# Account class', () => {
  describe('can generate account object', () => {
    it('Account object can be made without any arguments', () => {
      const newAccount = new Account();
      expect(newAccount).to.have.own.property('privKey');
      expect(newAccount).to.have.own.property('pubKey');
    });
    it('Account object can be made with passphrase', () => {
      const newAccount = new Account('');
      const newAccountWithPassphrase = new Account('medibloc');
      expect(newAccount).to.have.own.property('privKey');
      expect(newAccount).to.have.own.property('pubKey');
      expect(newAccountWithPassphrase).to.have.own.property('privKey');
      expect(newAccountWithPassphrase).to.have.own.property('pubKey');
    });
    it('Account object can not be made with decrypted privKey', () => {
      const { privKey } = keyGen.getKeyPair();
      const passphrase = 'medibloc';
      let newAccount = {};
      try {
        newAccount = new Account(passphrase, privKey);
      } catch (err) {
        expect(err.message).to.equal('Wrong format of private key');
      }
      expect(newAccount).to.not.have.own.property('privKey');
    });
    it('Account object can be made with encrypted privKey', () => {
      const { privKey } = keyGen.getKeyPair();
      const passphrase = 'medibloc';
      const encryptedPrivKey = encrypt.encryptData(passphrase, privKey);
      const newAccount = new Account(passphrase, encryptedPrivKey);
      expect(newAccount).to.have.own.property('privKey');
      expect(newAccount).to.have.own.property('pubKey');
    });
    it('Get decrypted private key with appropriate passphrase', () => {
      const passphrase = 'medibloc';
      const wrongPassphrase = 'medibloc!';
      const newAccount = new Account(passphrase);
      const decryptedPrivKey = newAccount.getDecryptedPrivateKey(passphrase);
      const wrongDecryptedPrivKey = newAccount.getDecryptedPrivateKey(wrongPassphrase);
      expect(keyGen.getPubKey(decryptedPrivKey)).to.be.equal(newAccount.pubKey);
      expect(wrongDecryptedPrivKey).not.to.be.equal(newAccount.pubKey);
    });
  });
});
