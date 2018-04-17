import { expect } from 'chai';
import { keyGen } from '../../src/crypto';


// getKeyPair
describe('#getKeyPair / #getPubKey', () => {
  describe('Generate private, public Key Pair', () => {
    const keyPair = keyGen.getKeyPair();
    it('It should return private, public key pair in hex format', () => {
      expect(keyPair).to.have.property('privKey').be.hexString;
      expect(keyPair).to.have.property('pubKey').be.hexString;
    });
    it('PublicKey shouuld have 33 byte size', () => {
      const pubKeyBuffer = Buffer.from(keyPair.pubKey, 'hex');
      expect(pubKeyBuffer.byteLength).equal(33);
    });
    it('PrivateKey and PublicKey should be matched', () => {
      const pubKeyFromPrivKey = keyGen.getPubKey(keyPair.privKey);
      expect(keyPair.pubKey).equal(pubKeyFromPrivKey);
    });
  });
});

