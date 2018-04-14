import assert from 'assert';
import { expect } from 'chai';
import { getKeyPair } from '../../src/util/keyGen';


describe('Generate private, public Key Pair', () => {
	it('it should return private, public key pair', () => {
		let privKey, pubKey = getKeyPair();

		return expect(privKet).to.be.a('string');

	});
});

