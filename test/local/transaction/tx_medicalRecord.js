import { expect } from 'chai';
import { medicalRecordTx } from 'local/transaction';


// overall medicalRecordTx
describe('# medicalRecordTx function', () => {
  describe('# Medical Data', () => {
    // TODO after format is specified.
  });

  describe('# TX hash', () => {
    it('Should be matched with go-medibloc', () => {
      const dataFromGo = {
        from: '02bdc97dfc02502c5b8301ff46cbbb0dce56cd96b0af75edc50560630de5b0a472',
        medicalData: {
          Hash: '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e',
          EncKey: 'abcdef',
          Seed: '5eed',
          Storage: 'ipfs',
        },
        nonce: 1,
        timestamp: 1524549462850,
      };
      const txHashFromGo = '9dc55ac69f9882c41a59790b95c1d23b23347f1d958373f61b71cb1910939d44';

      const tx = medicalRecordTx(dataFromGo);
      expect(tx.hash).to.be.equal(txHashFromGo);
    });
  });
});
