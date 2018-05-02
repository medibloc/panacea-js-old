import { expect } from 'chai';
import { signHashedTx } from 'local/transaction/utils/signTx';
import { Account } from 'local/account';

// signHashedTx
describe('# signHashedTx function', () => {
  const txHash = '398b3bddcdcee2e5390ae3538429fd73f9443ce0cdec6dda21bc060ec568b135';
  const signatureFromGoMediBloc = '79f7335918d23ebf7a0506597b42f57a3c1703d4781d53c2427d6c4360c1c2b0566f684f14465882cbb0e98538fa9865f72829ccb14c548c320f08b5a37b5c4f01';
  const userFromGoMedibloc = new Account('', '3a8288fbc483cbda767f4033df444d8e7c1d091fdded779924c38b8167c3bb2c619e3493502a34b2e9fae2a087f57642c2d1243aeab6c1f00f2706c119097e9f');
  const user = new Account('');

  it('Signature should be identical with the signature from go-medibloc', () => {
    const signature1 = signHashedTx(txHash, userFromGoMedibloc, '');
    const signature2 = signHashedTx(txHash, user, '');
    expect(signature1).to.be.equal(signatureFromGoMediBloc);
    expect(signature1).not.to.be.equal(signature2);
  });
});
