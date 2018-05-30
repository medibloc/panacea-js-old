import chai, { expect } from 'chai';
import cryptography from 'cryptography';
import { sha3 } from 'utils';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

// sign and verify
describe('#sign / #verifySignature', () => {
  // Sign for hashed msg
  const msg = 'hello MeDiBlOc123!@#';
  const msgHash = sha3(msg);
  const keyPair = cryptography.getKeyPair();
  describe('should generate signature for the input message and private key', () => {
    it('It should generate hex format string signature', () => {
      const signature = cryptography.sign(keyPair.privKey, msgHash);
      expect(signature).to.be.hexString;
    });
  });
  describe('should verify the owner of the signature', () => {
    it('Signature should be matched with the owner\'s public key', () => {
      const signature = cryptography.sign(keyPair.privKey, msgHash);
      const isValid = cryptography.verifySignature(keyPair.pubKey, msgHash, signature);
      expect(isValid).to.be.true;
    });
    it('Signature should not be matehced with other\'s public key', () => {
      const signature = cryptography.sign(keyPair.privKey, msgHash);
      const anonymousPubKey = cryptography.getKeyPair().pubKey;
      const isValid = cryptography.verifySignature(anonymousPubKey, msgHash, signature);
      expect(isValid).to.be.false;
    });
  });
});
