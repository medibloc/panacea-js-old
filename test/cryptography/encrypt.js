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

// encrypt and decrypt key
describe('#key encryption', () => {
  const password = 'medibloc12345^&*()';
  const privKey = '47a9bf274c67c6d2e79baf830d96c4595d2ba46b19155c873b61f39c38218a20';

  it('should be done with pbkdf2 algorithm', () => {
    const options = {
      iv: Buffer.from('eeed284aa6811376b1fc43bd0d2649f8', 'hex'),
      kdf: 'pbkdf2',
      salt: Buffer.from('7f64efa7aae09d54655544b351dd1948c41237f8be9d795a615f3215413b470e', 'hex'),
    };
    const expectedCrypto = {
      ciphertext: '4daa96ce3c87a52fb4ee8022e6b7f2ee0211975124de7d72ada17a99818a405b',
      cipherparams: { iv: 'eeed284aa6811376b1fc43bd0d2649f8' },
      cipher: 'aes-128-ctr',
      kdf: 'pbkdf2',
      kdfparams: {
        dklen: 32,
        salt: '7f64efa7aae09d54655544b351dd1948c41237f8be9d795a615f3215413b470e',
        c: 262144,
        prf: 'hmac-sha256',
      },
      mac: '430cc755203ce23caca3b63e4e58b331b7cdb754da8cdde517267072c066ec6c',
    };
    const encryptedPrivKey = cryptography.encryptKey(password, privKey, options);
    expect(encryptedPrivKey).to.be.a('object')
      .to.have.property('crypto')
      .to.eql(expectedCrypto);
  });
  it('should be done with scrypt algorithm', () => {
    const options = {
      iv: Buffer.from('eeed284aa6811376b1fc43bd0d2649f8', 'hex'),
      kdf: 'scrypt',
      salt: Buffer.from('7f64efa7aae09d54655544b351dd1948c41237f8be9d795a615f3215413b470e', 'hex'),
    };
    const expectedCrypto = {
      ciphertext: '9883a3936282a816d75591bbf330c0dc644b91e8619e892ccbb29a25a4063cad',
      cipherparams: { iv: 'eeed284aa6811376b1fc43bd0d2649f8' },
      cipher: 'aes-128-ctr',
      kdf: 'scrypt',
      kdfparams: {
        dklen: 32,
        salt: '7f64efa7aae09d54655544b351dd1948c41237f8be9d795a615f3215413b470e',
        n: 8192,
        r: 8,
        p: 1,
      },
      mac: '51a2041e8ea6e44d31e8a7050b5dac0f4e56391a156cd60d7d7ff0d5ae37f76b',
    };
    const encryptedPrivKey = cryptography.encryptKey(password, privKey, options);
    expect(encryptedPrivKey).to.be.a('object')
      .to.have.property('crypto')
      .to.eql(expectedCrypto);
  });
});

// encrypt and decrypt key
describe('#key decryption', () => {
  const password = 'medibloc12345^&*()';
  const expectedPrivKey = '47a9bf274c67c6d2e79baf830d96c4595d2ba46b19155c873b61f39c38218a20';

  it('should be done with pbkdf2 algorithm', () => {
    const encryptedPrivKey = {
      version: 3,
      id: 'd3f4a51b-575b-4b25-abcd-a1160cb1acee',
      address: '03b7f30a8f815a4d31c711ce374b9bd491fcb354dc6d6f9d9b8fc5ed1194703edb',
      crypto: {
        ciphertext: '4daa96ce3c87a52fb4ee8022e6b7f2ee0211975124de7d72ada17a99818a405b',
        cipherparams: { iv: 'eeed284aa6811376b1fc43bd0d2649f8' },
        cipher: 'aes-128-ctr',
        kdf: 'pbkdf2',
        kdfparams: {
          dklen: 32,
          salt: '7f64efa7aae09d54655544b351dd1948c41237f8be9d795a615f3215413b470e',
          c: 262144,
          prf: 'hmac-sha256',
        },
        mac: '430cc755203ce23caca3b63e4e58b331b7cdb754da8cdde517267072c066ec6c',
      },
    };
    expect(cryptography.decryptKey(password, encryptedPrivKey)).to.equal(expectedPrivKey);
  });
  it('should be done with scrypt algorithm', () => {
    const encryptedPrivKey = {
      version: 3,
      id: 'dae02e97-06d2-45bf-b2a1-7f342cf5deff',
      address: '03b7f30a8f815a4d31c711ce374b9bd491fcb354dc6d6f9d9b8fc5ed1194703edb',
      crypto: {
        ciphertext: '9883a3936282a816d75591bbf330c0dc644b91e8619e892ccbb29a25a4063cad',
        cipherparams: { iv: 'eeed284aa6811376b1fc43bd0d2649f8' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
          dklen: 32,
          salt: '7f64efa7aae09d54655544b351dd1948c41237f8be9d795a615f3215413b470e',
          n: 8192,
          r: 8,
          p: 1,
        },
        mac: '51a2041e8ea6e44d31e8a7050b5dac0f4e56391a156cd60d7d7ff0d5ae37f76b',
      },
    };
    expect(cryptography.decryptKey(password, encryptedPrivKey)).to.equal(expectedPrivKey);
  });
  it('should be done with scrypt algorithm with previous format', () => {
    const encryptedPrivKey = {
      version: 3,
      id: '25ce59ce-75fd-4fd8-8b21-15f60893971a',
      address: '03b7f30a8f815a4d31c711ce374b9bd491fcb354dc6d6f9d9b8fc5ed1194703edb',
      crypto: {
        ciphertext: 'eb1d7d8d4c835cf304ad080f9d9060b75c570ce119eded98c0b7508fff1383b46e2eb20b41c0aafd9afcea50b1e41e89a9598d13af976e64220167832f70d0db',
        cipherparams: { iv: 'eeed284aa6811376b1fc43bd0d2649f8' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
          dklen: 32,
          salt: '7f64efa7aae09d54655544b351dd1948c41237f8be9d795a615f3215413b470e',
          n: 8192,
          r: 8,
          p: 1,
        },
        mac: '0260b761d2661388f449c0b162c56c919d3802e6c04e25d0ef0fb5d9e7564b92',
      },
    };

    expect(cryptography.decryptKey(password, encryptedPrivKey)).to.equal(expectedPrivKey);
  });
});
