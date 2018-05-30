import chai, { expect } from 'chai';
import { getKeyPair } from 'cryptography';
import utils from 'utils';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

describe('#utils', () => {
  describe('#randomHash', () => {
    it('should generate 16 bytes size hex string', () => {
      const randomHexString = utils.randomHex();
      expect(Buffer.byteLength(randomHexString, 'hex'))
        .to.be.equal(16);
      expect(randomHexString)
        .to.be.hexString
        .and.not.to.be.equal(utils.randomHex());
    });
  });

  describe('#isAddress', () => {
    describe('Validate public key', () => {
      const { pubKey } = getKeyPair();
      it('Address should be hex format', () => {
        expect(pubKey).to.be.hexString;
      });
      it('It\'s byte length should be 33', () => {
        const isValid = utils.isAddress(pubKey);
        expect(isValid).to.be.true;
      });
    });
  });
});
