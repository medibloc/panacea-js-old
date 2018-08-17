import { expect } from 'chai';
import { encryptKey } from 'cryptography/encrypt';
import { Account } from 'local/account';
import valueTransferTx from 'local/transaction/tx_valueTransfer';

// overall valueTransferTx
describe('# valueTransferTx function', () => {
  const user = new Account('');
  const valueTransferTxData = {
    from: user.pubKey,
    to: user.pubKey,
    value: '1000',
    nonce: 1,
  };

  describe('# TX validation', () => {
    it('It should have \'from\' field', () => {
      const tempTxData = Object.assign(
        {},
        valueTransferTxData,
        {
          from: undefined,
        },
      );
      expect(() => valueTransferTx(tempTxData)).to.throw(Error, 'Transaction should have from field.');
    });

    it('It should have adequate transfer value', () => {
      const tempTxData = Object.assign(
        {},
        valueTransferTxData,
        {
          value: -5,
        },
      );
      expect(() => valueTransferTx(tempTxData)).to.throw(Error, 'Type of value need to be string');
    });
  });

  // describe('# TX hash', () => {
  //   it('Should be matched with go-medibloc', () => {
  //     // DATA from go-medibloc
  //     const dataFromGo = {
  //       from: '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939',
  //       to: '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21',
  //       value: '10',
  //       nonce: 1,
  //       timestamp: 1524549462850,
  //     };
  //     const txHashFromGo = 'f5c0b9c45aa71f0cef10cbf5da9bfbf009d84a1b3226e2e355f209e33ed9de57';
  //     const txFromGo = valueTransferTx(dataFromGo);
  //     expect(txFromGo.hash).to.be.equal(txHashFromGo);
  //   });
  // });
  // TODO @ggomma check core-medibloc

  describe('# TX signature', () => {
    const privKeyFromGo = 'ee8ea71e9501306fdd00c6e58b2ede51ca125a583858947ff8e309abf11d37ea';
    const hashFromGo = '398b3bddcdcee2e5390ae3538429fd73f9443ce0cdec6dda21bc060ec568b135';
    const signatureFromGo = '79f7335918d23ebf7a0506597b42f57a3c1703d4781d53c2427d6c4360c1c2b0566f684f14465882cbb0e98538fa9865f72829ccb14c548c320f08b5a37b5c4f01';
    const encryptedPrivKey = encryptKey('passphrase', privKeyFromGo);
    const tx = valueTransferTx(valueTransferTxData);
    it('Should be matched with go-medibloc', () => {
      user.encryptedPrivKey = encryptedPrivKey;
      tx.hash = hashFromGo;
      user.signTx(tx, 'passphrase');
      expect(tx.sign).to.be.equal(signatureFromGo);
    });

    it('Throw error if user put unmatched passphrase', () => {
      expect(() => user.signTx(tx, 'wrongPassphrase')).to.throw(Error);
    });
  });
});
