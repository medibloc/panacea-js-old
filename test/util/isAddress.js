import { expect } from 'chai';
import { isAddress } from '../../src/util';
import { keyGen } from '../../src/crypto';

// getKeyPair
describe('#isAddress', () => {
  describe('Validate public key', () => {
    const { pubKey } = keyGen.getKeyPair();
    it('Address should be hex format', () => {
      expect(pubKey).to.be.hexString;
    });
    it('It\'s byte length should be 33', () => {
      const isValid = isAddress.isAddress(pubKey);
      expect(isValid).to.be.true;
    });
  });
});

