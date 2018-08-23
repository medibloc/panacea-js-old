import { expect } from 'chai';
import { dataUploadTx } from 'local/transaction';

// overall dataUploadTx
describe('# dataUploadTx function', () => {
  describe('# TX hash', () => {
    it('Should be matched with go-medibloc', () => {
      const dataFromGo = {
        from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
        payload: {
          hash: 'nspxKECfYJsqcvwkmFZFZlu7mRUrSxQmHDw8k/sXz1Q=',
        },
        nonce: 1,
        timestamp: 1524549462850,
      };
      const txHashFromGo = '9488940ef63487be2dcac2afc2982050a8ebe7a6a34efbd2b1dedb5f1a34f382';
      const tx = dataUploadTx(dataFromGo);
      expect(tx.hash).to.be.equal(txHashFromGo);
    });
  });
});
