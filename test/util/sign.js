import { expect } from 'chai';
import {
	sign,
	verifySignature,
} from '../../src/util/sign';
import {
	hashData,
} from '../../src/util/hash';
import {
	getKeyPair,
} from '../../src/util/keyGen';


// sign and verify
describe('#sign / #verifySignature', () => {
	// Sign for hashed msg
	const msg = 'hello MeDiBlOc123!@#';
	const msgHash = hashData(msg);
	const keyPair = getKeyPair();
	describe('should generate signature for the input message and private key', () => {
		it('It should generate hex format string signature', () => {
			const signature = sign(keyPair.privKey, msgHash);
			expect(signature).to.be.hexString;
		});
	});
	describe('should verify the owner of the signature', () => {
		it('Signature should be matched with the owner\'s public key', () => {
			const signature = sign(keyPair.privKey, msgHash);
			const isValid = verifySignature(keyPair.pubKey, msgHash, signature);
			expect(isValid).to.be.true;
		});
		it('Signature should not be matehced with other\'s public key', () => {
			const signature = sign(keyPair.privKey, msgHash);
			const anonymousPubKey = getKeyPair().pubKey;
			const isValid = verifySignature(anonymousPubKey, msgHash, signature);
			expect(isValid).to.be.false;
		});
	});
});
