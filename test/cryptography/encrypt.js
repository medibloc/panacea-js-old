import chai, { expect } from 'chai';
import cryptography from 'cryptography';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

// encrypt and decrypt data
describe('#encryptData / #decryptData', () => {
  const accessKey = 'hello medibloc';
  const fakeAccessKey = 'hello medibloc!';
  const data = 'Hello medibloc. It\'s good time to surf';
  const testData = 'Hello medibloc. It\'s good time to surf!';
  describe('should make encrypted message', () => {
    const encryptedData = cryptography.encryptData(accessKey, data);
    const encryptedTestData = cryptography.encryptData(accessKey, testData);
    it('Encrypted data should be unique', () => {
      expect(encryptedData).not.to.be.equal(data);
      expect(encryptedData).not.to.be.equal(encryptedTestData);
    });
  });
  describe('can be decrypted with right access key', () => {
    const encryptedData = cryptography.encryptData(accessKey, data);
    it('Access key can decrypt message', () => {
      const decryptedMsg = cryptography.decryptData(accessKey, encryptedData);
      expect(decryptedMsg).to.be.equal(data);
    });
    it('encrypted message format should have delimiter ":"', () => {
      try {
        cryptography.decryptData(fakeAccessKey, 'hello medibloc');
      } catch (err) {
        expect(err.message).to.equal('Invalid encrypted data format');
      }
    });
    it('Only right access key should work', () => {
      const mismatchedData = cryptography.decryptData(fakeAccessKey, encryptedData);
      expect(mismatchedData).not.to.equal(data);
    });
  });
});
