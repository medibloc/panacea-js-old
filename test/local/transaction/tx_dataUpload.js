import { expect } from 'chai';
import { dataUploadTx } from 'local/transaction';

// overall dataUploadTx
describe('# dataUploadTx function', () => {
  describe('# TX hash', () => {
    it('Should be matched with go-medibloc', () => {
      const dataFromGo = {
        from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
        medicalData: {
          Hash: '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e',
        },
        nonce: 1,
        timestamp: 1524549462850,
      };
      const txHashFromGo = '5dc5c13eded57aa7f6f314f751c46d99edf56fdf1ea9bbb5a727a6eaaa0ac5d3';

      const tx = dataUploadTx(dataFromGo);
      expect(tx.hash).to.be.equal(txHashFromGo);
    });
  });
});
