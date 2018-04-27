// DEPRECTED

// import { isAddress } from 'util';
// import Account from './account';

// class Accounts {
//   constructor() {
//     // { pubKey : Account }
//     this.accounts = {};
//     this.default = '';
//   }

//   newAccount(passphrase) {
//     if (passphrase === undefined) return false;
//     const newAccount = new Account(passphrase);
//     this.accounts[newAccount.pubKey] = newAccount;
//     if (this.default === '') this.setDefaultAccount(newAccount.pubKey);
//     return newAccount;
//   }

//   // Generate new account
//   addAccount(passphrase, privKey = '') {
//     if (passphrase === undefined) return false;
//     const newAccount = new Account(passphrase, privKey);
//     this.accounts[newAccount.pubKey] = newAccount;
//     if (this.default === '') this.setDefaultAccount(newAccount.pubKey);
//     return newAccount;
//   }

//   // Remove account from account list
//   removeAccount(pubKey) {
//     if (!isAddress(pubKey)) return false;
//     if (this.default === pubKey) return false;
//     delete this.accounts[pubKey];
//     return this.accounts;
//   }

//   // Change default privKey, pubKey
//   setDefaultAccount(pubKey) {
//     if (this.accounts[pubKey] === undefined) return false;
//     this.default = pubKey;
//     return this.default;
//   }

//   getAccounts() {
//     return this.accounts;
//   }

//   // Get specific account matched with pubKey
//   getAccount(pubKey) {
//     if (!isAddress(pubKey)) return false;
//     if (this.accounts[pubKey] === undefined) return false;
//     return this.accounts[pubKey];
//   }

//   // Get default account
//   getDefaultAccount() {
//     return this.getAccount(this.default);
//   }
// }

// export default Accounts;
