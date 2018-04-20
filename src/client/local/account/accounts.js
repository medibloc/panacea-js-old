import { isAddress } from '../../../util';
import Account from './account';


export default class Accounts {
  constructor() {
    this.list = [];
    this.default = {};
  }

  // Generate new account
  newAccount(passphrase = '', privKey = '') {
    const newAccount = new Account(passphrase, privKey);
    this.list.push(newAccount);
    if (this.list.length === 1) {
      this.setDefaultAccount(newAccount.pubKey);
    }
    return newAccount;
  }

  // Remove account from account list
  removeAccount(pubKey) {
    try {
      isAddress(pubKey);
    } catch (err) {
      throw err;
    }
    const removeIndex = this.list.map(account => account.pubKey).indexOf(pubKey);
    if (removeIndex === -1) throw new Error('Unregistered public key');
    this.list.splice(removeIndex, 1);
  }

  // Change default privKey, pubKey
  setDefaultAccount(pubKey) {
    this.list.forEach((account) => {
      if (account.pubKey === pubKey) {
        this.default = account;
      }
    });
    // throw new Error('Unregistered public key.');
  }

  // Get specific account matched with pubKey
  getAccount(pubKey) {
    try {
      isAddress(pubKey);
    } catch (err) {
      throw err;
    }
    this.list.forEach((account) => {
      if (account.pubKey === pubKey) return account;
      return null;
    });
    return null;
  }

  // Get default account
  getDefaultAccount() {
    return this.default;
  }
}
