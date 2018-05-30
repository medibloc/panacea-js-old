import chai, { expect } from 'chai';
import { keyGen } from 'cryptography';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

describe('#keyGen', () => {
  let keyPair;
  beforeEach(() => {
    keyPair = keyGen.getKeyPair();
    return Promise.resolve();
  });

  describe('#getKeyPair', () => {
    it('should return 32 bytes private key in hex format', () => {
      expect(keyPair)
        .to.have.property('privKey')
        .and.to.be.hexString;
      expect(Buffer.byteLength(keyPair.privKey, 'hex'))
        .to.be.equal(32);
    });

    it('should return 33 bytes public key in hex format', () => {
      expect(keyPair)
        .to.have.property('pubKey')
        .and.to.be.hexString;
      expect(Buffer.byteLength(keyPair.pubKey, 'hex'))
        .to.be.equal(33);
    });
  });

  describe('#getPubKey', () => {
    it('should be matched with the public key', () => {
      expect(keyPair.pubKey)
        .to.be.equal(keyGen.getPubKey(keyPair.privKey));
    });
  });

  describe('#getRandomSeed', () => {
    it('should generate 16 bytes size hex string', () => {
      const randomSeed = keyGen.getRandomSeed();
      expect(Buffer.byteLength(randomSeed, 'hex'))
        .to.be.equal(16);
      expect(randomSeed)
        .to.be.hexString
        .and.not.to.be.equal(keyGen.getRandomSeed());
    });
  });

  describe('#getSharedSecretKey', () => {
    it('should same with each other', () => {
      const secondKeyPair = keyGen.getKeyPair();
      expect(keyGen.getSharedSecretKey(keyPair.privKey, secondKeyPair.pubKey))
        .to.be.equal(keyGen.getSharedSecretKey(secondKeyPair.privKey, keyPair.pubKey));
    });
  });
});
