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
      const txHashFromGo = 'b83ca0fa0faaac93f72bf40f41caaac80745bc67899553ccf8500753f6f9fa69';

      const tx = dataUploadTx(dataFromGo);
      expect(tx.hash).to.be.equal(txHashFromGo);
    });
  });
});
