import { expect } from 'chai';
import { signHashedTx } from 'local/transaction/utils/signTx';
import { Account } from 'local/account';

// signHashedTx
describe('# signHashedTx function', () => {
  const txHash = '398b3bddcdcee2e5390ae3538429fd73f9443ce0cdec6dda21bc060ec568b135';
  const signatureFromGoMediBloc = '79f7335918d23ebf7a0506597b42f57a3c1703d4781d53c2427d6c4360c1c2b0566f684f14465882cbb0e98538fa9865f72829ccb14c548c320f08b5a37b5c4f01';
  const userFromGoMedibloc = new Account('', '11af15e3f3051671787c3c36747d3a4397eeddaf75043ab5ef762621ccbe3263700d937029b6abe76329446635cb062dacd12a359a1a345d5b178e1373492010');
  const user = new Account('');

  it('Signature should be identical with the signature from go-medibloc', () => {
    const signature1 = signHashedTx(txHash, userFromGoMedibloc, '');
    const signature2 = signHashedTx(txHash, user, '');
    expect(signature1).to.be.equal(signatureFromGoMediBloc);
    expect(signature1).not.to.be.equal(signature2);
  });
});
