import { isAddress } from '../../util';
import Account from './account';

export default class Accounts {
	constructor() {
		this.accounts = [];
	}

	// Generate new account
	newAccount(passphrase, privKey = '') {
		const newAccount = new Account(passphrase, privKey);
		this.accounts.push(newAccount);
	}

	// Remove account from account list
	removeAccount(pubKey) {
		try {
			isAddress(pubKey);
		} catch (err) {
			throw err;
		}
		const removeIndex = this.accounts.map((account) => { return account.pubKey; }).indexOf(pubKey);
		if (removeIndex === -1) throw new Error('Unregistered public key');
		this.accounts.splice(removeIndex, 1);
	}

	// Change default privKey, pubKey
	setDefaultAccount(pubKey) {
		this.accounts.map((account) => {
			if (account.pubKey === pubKey) {
				this.account = account;
			}
			return null;
		});
		throw new Error('Unregistered public key.');
	}

	// Get all accounts registered in local service
	getAccounts() {
		return this.accounts;
	}
}
