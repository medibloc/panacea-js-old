import { expect } from 'chai';
import { writerAssignTx } from 'local/transaction';


// overall writerAssignTx
describe('# writerAssignTx function', () => {
  describe('# TX hash', () => {
    it('Should be matched with go-medibloc', () => {
      // DATA from go-medibloc
      const dataFromGo = {
        from: '03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939',
        writer: '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21',
        nonce: 1,
        timestamp: 1524549462850,
      };
      const txHashFromGo = 'c1f205155baca5f73dd8ab4a072db2f8df9a73758204d6d307c1e2de56860cbd';
      const txFromGo = writerAssignTx(dataFromGo);
      expect(txFromGo.hash).to.be.equal(txHashFromGo);
    });
  });
});
