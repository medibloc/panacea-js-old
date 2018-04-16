import { expect } from 'chai';
import {
	isAddress,
} from '../../src/util/isAddress';
import {
	getKeyPair,
} from '../../src/util/keyGen';

// getKeyPair
describe('#isAddress', () => {
	describe('Validate public key', () => {
		const { pubKey } = getKeyPair();
		it('Address should be hex format', () => {
			expect(pubKey).to.be.hexString;
		});
		it('It\'s byte length should be 33', () => {
			const isValid = isAddress(pubKey);
			expect(isValid).to.be.true;
		});
	});
});

