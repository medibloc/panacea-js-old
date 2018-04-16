import { expect } from 'chai';
import {
	encryptData,
	decryptData,
} from '../../src/util/encrypt';

// encrypt and decrypt message
describe('#encryptData / #decryptData', () => {
	const accessKey = 'hello medibloc';
	const fakeAccessKey = 'hello medibloc!';
	const msg = 'Hello medibloc. It\'s good time to surf';
	const testMsg = 'Hello medibloc. It\'s good time to surf!';
	describe('should make encrypted message', () => {
		const encryptedMsg = encryptData(accessKey, msg);
		const encryptedTestMsg = encryptData(accessKey, testMsg);
		it('Encrypted data should be hex formatted', () => {
			expect(encryptedMsg).to.be.hexString;
		});
		it('Encrypted data should be unique', () => {
			expect(encryptedMsg).not.to.be.equal(msg);
			expect(encryptedMsg).not.to.be.equal(encryptedTestMsg);
		});
	});
	describe('can be decrypted with right access key', () => {
		const encryptedMsg = encryptData(accessKey, msg);
		it('Access key can decrypt message', () => {
			const decryptedMsg = decryptData(accessKey, encryptedMsg);
			expect(decryptedMsg).to.be.equal(msg);
		});
		it('Only right access key should work', () => {
			try {
				decryptData(fakeAccessKey, encryptedMsg);
			} catch (err) {
				expect(err).to.equal(new Error('Wrong Access Key'));
			}
		});
	});
});
