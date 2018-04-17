import { expect } from 'chai';
import { Account, Accounts } from '../../../src/client/local';


// Account
describe('# Accounts class', () => {
  describe('can generate account object array', () => {
    const accounts = new Accounts();
    it('New Accounts init the accounts array', () => {
      expect(accounts.list).to.have.length(0);
    });
    it('New account is pushed to the list automatically', () => {
      accounts.newAccount();
      expect(accounts.list).to.have.length(1);
      expect(accounts.list[0]).have.own.property('privKey');
      expect(accounts.list[0]).have.own.property('pubKey');
      accounts.newAccount();
      expect(accounts.list).to.have.length(2);
    });
    it('Accounts list contains all account information', () => {
      const accountList = accounts.getAccounts();
      if (accountList.length !== 0) {
        accountList.forEach((account) => {
          expect(account).have.own.property('privKey');
          expect(account).have.own.property('pubKey');
        });
      }
    });
    it('Add account with existed passphrase and private key', () => {
      const passphrase = 'MediBloc';
      const newAccount = new Account(passphrase);
      const { privKey, pubKey } = newAccount;
      accounts.newAccount(passphrase, privKey);
      expect(accounts.list).to.deep.include({ privKey, pubKey });
    });
    it('Remove account with it\'s public key', () => {
      const passphrase = 'MediBloc';
      const newAccount = new Account(passphrase);
      const { privKey, pubKey } = newAccount;
      accounts.newAccount(passphrase, privKey);
      expect(accounts.list).to.deep.include({ privKey, pubKey });
      accounts.removeAccount(pubKey);
      expect(accounts.list).to.not.deep.include({ privKey, pubKey });
    });
    it('Change default account', () => {
      const defaultAccount = accounts.getDefaultAccount();
      expect(defaultAccount).have.own.property('privKey');
      expect(defaultAccount).have.own.property('pubKey');
      const lastAccount = accounts.list[accounts.list.length - 1];
      accounts.setDefaultAccount(lastAccount.pubKey);
      const newDefaultAccount = accounts.getDefaultAccount();
      expect(newDefaultAccount).have.own.property('privKey');
      expect(newDefaultAccount.privKey).not.to.be.equal(defaultAccount.privKey);
      expect(newDefaultAccount).have.own.property('pubKey');
      expect(newDefaultAccount.pubKey).not.to.be.equal(defaultAccount.pubKey);
      expect(newDefaultAccount).to.be.equal(lastAccount);
    });
  });
});
