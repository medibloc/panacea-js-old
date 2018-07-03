import chai, { expect } from 'chai';
import cryptography from 'cryptography';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

describe('#keyGen', () => {
  let keyPair;
  let keyPairFP; // keyPairFromPassphrase
  const passphrase = 'a b c d e f g h i j k l';
  beforeEach(() => {
    keyPair = cryptography.getKeyPair();
    keyPairFP = cryptography.getKeyPairFromPassphrase(passphrase);
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

  describe('#getKeyPairFromPassphrase', () => {
    describe('#without password', () => {
      it('should return 32 bytes private key in hex format', () => {
        expect(keyPairFP)
          .to.have.property('privKey')
          .and.to.be.hexString;
        expect(Buffer.byteLength(keyPairFP.privKey, 'hex'))
          .to.be.equal(32);
      });

      it('should return 33 bytes public key in hex format', () => {
        expect(keyPairFP)
          .to.have.property('pubKey')
          .and.to.be.hexString;
        expect(Buffer.byteLength(keyPairFP.pubKey, 'hex'))
          .to.be.equal(33);
      });
    });
  });

  describe('#getPubKey', () => {
    it('should be matched with the public key', () => {
      expect(keyPair.pubKey)
        .to.be.equal(cryptography.getPubKey(keyPair.privKey));
      expect(keyPairFP.pubKey)
        .to.be.equal(cryptography.getPubKey(keyPairFP.privKey));
    });
  });

  describe('#getSharedSecretKey', () => {
    it('should same with each other', () => {
      const secondKeyPair = cryptography.getKeyPair();
      expect(cryptography.getSharedSecretKey(keyPair.privKey, secondKeyPair.pubKey))
        .to.be.equal(cryptography.getSharedSecretKey(secondKeyPair.privKey, keyPair.pubKey));
    });
  });
});
