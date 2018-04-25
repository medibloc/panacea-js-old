import { isAddress } from 'util';
import Account from './account';


export default class Accounts {
  constructor() {
    // { pubKey : Account }
    this.list = {};
    this.default = '';
  }

  // Generate new account
  newAccount(passphrase, privKey = '') {
    if (passphrase === undefined) return false;
    const newAccount = new Account(passphrase, privKey);
    this.list[newAccount.pubKey] = newAccount;
    if (this.default === '') this.setDefaultAccount(newAccount.pubKey);
    return newAccount;
  }

  // Remove account from account list
  removeAccount(pubKey) {
    if (!isAddress(pubKey)) return false;
    if (this.default === pubKey) return false;
    delete this.list[pubKey];
    return this.list;
  }

  // Change default privKey, pubKey
  setDefaultAccount(pubKey) {
    if (this.list[pubKey] === undefined) return false;
    this.default = pubKey;
    return this.default;
  }

  // Get specific account matched with pubKey
  getAccount(pubKey) {
    if (!isAddress(pubKey)) return false;
    if (this.list[pubKey] === undefined) return false;
    return this.list[pubKey];
  }

  // Get default account
  getDefaultAccount() {
    return this.getAccount(this.default);
  }
}
