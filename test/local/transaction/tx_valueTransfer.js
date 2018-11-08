import { expect } from 'chai';
import { encryptKey } from 'cryptography/encrypt';
import { Account } from 'local/account';
import {
  createDefaultPayload,
  valueTransferTx,
  recoverPayload,
} from 'local/transaction';
import { constants } from 'local/transaction/utils';

const {
  REQUIRED_TX_PARAMS,
  VALUE_TRANSFER,
} = constants;

// overall valueTransferTx
describe('# valueTransferTx function', () => {
  const user = new Account('');
  const valueTransferTxData = {
    to: user.pubKey,
    value: '1000',
    nonce: 1,
    type: 'transfer',
  };

  describe('# TX validation', () => {
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

  describe('# TX hash', () => {
    it('Should be matched with go-medibloc', () => {
      // DATA from go-medibloc
      const dataFromGo = {
        chain_id: 1,
        to: '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21',
        value: '10000000000000',
        nonce: 1,
        timestamp: 1540000000,
      };
      const txHashFromGo = '2ba4cef8b5ff415128ebfea642243e9b51b054cdcfe1f9c3fc3d42794a6a7c71';
      const txFromGo = valueTransferTx(dataFromGo);
      console.log(txFromGo);
      expect(txFromGo.hash).to.be.equal(txHashFromGo);
    });
  });

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

describe('# valueTransferTx', () => {
  const payload = createDefaultPayload('Hello MediBloc!');
  const fields = {
    chain_id: 1,
    nonce: 1,
    payload,
    timestamp: 1540000000,
    to: '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21',
    value: '10000000000000',
  };
  const tx = valueTransferTx(fields);
  console.log(tx);
  const txHashFromGo = 'be8d1e82c16f082904b12618b8dc64924abd6658863e75e96f96d40269670904';

  it('should return transaction contains hash', () => {
    expect(tx).to.have.property('hash')
      .to.equal(txHashFromGo);
  });
  it('should return transaction contains rawTx', () => {
    expect(tx).to.have.property('rawTx')
      .to.contain.all.keys(REQUIRED_TX_PARAMS[VALUE_TRANSFER].map(param => param.split('.')[0]));
  });
  it('should return transaction not contains signature', () => {
    expect(tx).to.have.property('sign')
      .to.equal(null);
  });

  describe('# recoverPayload', () => {
    it('should recover expected transaction payload', () => {
      expect(recoverPayload(tx)).to.eql(payload);
    });
  });
});
