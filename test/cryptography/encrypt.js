import chai, { expect } from 'chai';
import { encrypt } from 'cryptography';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

// encrypt and decrypt message
describe('#encryptData / #decryptData', () => {
  const accessKey = 'hello medibloc';
  const fakeAccessKey = 'hello medibloc!';
  const msg = 'Hello medibloc. It\'s good time to surf';
  const testMsg = 'Hello medibloc. It\'s good time to surf!';
  describe('should make encrypted message', () => {
    const encryptedMsg = encrypt.encryptData(accessKey, msg);
    const encryptedTestMsg = encrypt.encryptData(accessKey, testMsg);
    it('Encrypted data should be hex formatted', () => {
      expect(encryptedMsg).to.be.hexString;
    });
    it('Encrypted data should be unique', () => {
      expect(encryptedMsg).not.to.be.equal(msg);
      expect(encryptedMsg).not.to.be.equal(encryptedTestMsg);
    });
  });
  describe('can be decrypted with right access key', () => {
    const encryptedMsg = encrypt.encryptData(accessKey, msg);
    it('Access key can decrypt message', () => {
      const decryptedMsg = encrypt.decryptData(accessKey, encryptedMsg);
      expect(decryptedMsg).to.be.equal(msg);
    });
    it('encrypted message format should be hexadecimal', () => {
      try {
        encrypt.decryptData(fakeAccessKey, 'hello medibloc');
      } catch (err) {
        expect(err.message).to.equal('Message should be hexadecimal');
      }
    });
    it('Only right access key should work', () => {
      const unMatchedMsg = encrypt.decryptData(fakeAccessKey, encryptedMsg);
      expect(unMatchedMsg).not.to.equal(msg);
    });
  });
});
