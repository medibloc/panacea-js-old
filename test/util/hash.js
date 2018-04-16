import { expect } from 'chai';
import {
	hashData,
} from '../../src/util/hash';

// hashData
describe('#hashData', () => {
	describe('should generate hash for the input message', () => {
		const msg = 'hello MeDiBlOc123!@#';
		const msgHash = hashData(msg);
		it('It should generate hex format string', () => {
			expect(msgHash).to.be.hexString;
		});
		it('It should generate unique hash for the message', () => {
			const msgTemp = 'hello medibloc123!@#';
			const msgTempHash = hashData(msgTemp);
			expect(msgHash).not.to.be.equal(msgTempHash);
		});
	});
});
