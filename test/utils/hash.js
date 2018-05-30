import { Readable } from 'stream';
import chai, { expect } from 'chai';
import utils from 'utils';
import chaiHexString from 'test/helpers/chaiHexString';

chai.use(chaiHexString);

describe('#hash', () => {
  const msg = 'hello MeDiBlOc123!@#';
  const expectedHash = '8a1fb1154b917c9e3df4370008e0bf34c6de6babb1592225371731a71a9b2e13';

  describe('#sha3', () => {
    let msgHash;
    beforeEach(() => {
      msgHash = utils.sha3(msg);
      return Promise.resolve();
    });

    it('should generate hex format string', () => {
      expect(msgHash).to.be.hexString
        .and.to.be.equal(expectedHash);
    });

    it('should generate unique hash for the message', () => {
      const msgTemp = 'hello medibloc123!@#';
      const msgTempHash = utils.sha3(msgTemp);
      expect(msgHash).not.to.be.equal(msgTempHash);
    });
  });

  describe('#sha3Stream', () => {
    let msgHash;
    beforeEach(async () => {
      const inStream = new Readable();
      inStream.push(msg);
      inStream.push(null);
      msgHash = await utils.sha3Stream(inStream);
      return Promise.resolve();
    });

    it('should generate hex format string', () => {
      expect(msgHash).to.be.hexString
        .and.to.be.equal(expectedHash);
    });
  });
});
