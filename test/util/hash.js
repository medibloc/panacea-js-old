import { expect } from 'chai';
import { hash } from '../../src/crypto';

// hashData
describe('#hashData', () => {
  describe('should generate hash for the input message', () => {
    const msg = 'hello MeDiBlOc123!@#';
    const msgHash = hash.hashData(msg);
    it('It should generate hex format string', () => {
      expect(msgHash).to.be.hexString;
    });
    it('It should generate unique hash for the message', () => {
      const msgTemp = 'hello medibloc123!@#';
      const msgTempHash = hash.hashData(msgTemp);
      expect(msgHash).not.to.be.equal(msgTempHash);
    });
  });
});
