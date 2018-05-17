import chai, { expect } from 'chai';
import {
  hash,
  sign,
  keyGen,
} from 'cryptography';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

// sign and verify
describe('#sign / #verifySignature', () => {
  // Sign for hashed msg
  const msg = 'hello MeDiBlOc123!@#';
  const msgHash = hash.hashData(msg);
  const keyPair = keyGen.getKeyPair();
  describe('should generate signature for the input message and private key', () => {
    it('It should generate hex format string signature', () => {
      const signature = sign.sign(keyPair.privKey, msgHash);
      expect(signature).to.be.hexString;
    });
  });
  describe('should verify the owner of the signature', () => {
    it('Signature should be matched with the owner\'s public key', () => {
      const signature = sign.sign(keyPair.privKey, msgHash);
      const isValid = sign.verifySignature(keyPair.pubKey, msgHash, signature);
      expect(isValid).to.be.true;
    });
    it('Signature should not be matehced with other\'s public key', () => {
      const signature = sign.sign(keyPair.privKey, msgHash);
      const anonymousPubKey = keyGen.getKeyPair().pubKey;
      const isValid = sign.verifySignature(anonymousPubKey, msgHash, signature);
      expect(isValid).to.be.false;
    });
  });
});
