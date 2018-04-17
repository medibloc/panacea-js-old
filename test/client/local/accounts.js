import { expect } from 'chai';
import { Account, Accounts } from '../../../src/client/local';
import { keyGen, encrypt } from '../../../src/crypto';


// Account
describe('# Accounts class', () => {
	describe('can generate account object array', () => {
		const accountList = new Accounts();
		it('New Accounts init the accounts array', () => {
			console.log(accountList)
			// expect(accountList).to.have.own.property('privKey');
		});
	});
});
