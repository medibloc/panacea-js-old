import chai, { expect } from 'chai';
import { isAddress } from 'util';
import { keyGen } from 'cryptography';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

// getKeyPair
describe('#isAddress', () => {
  describe('Validate public key', () => {
    const { pubKey } = keyGen.getKeyPair();
    it('Address should be hex format', () => {
      expect(pubKey).to.be.hexString;
    });
    it('It\'s byte length should be 33', () => {
      const isValid = isAddress(pubKey);
      expect(isValid).to.be.true;
    });
  });
});

