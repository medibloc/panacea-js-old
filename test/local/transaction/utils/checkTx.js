import { expect } from 'chai';
import { Account } from 'local/account';
import { checkTx, constants, setTx } from 'local/transaction/utils';

// chechTx
describe('# chechTx function', () => {
  const { checkRequiredParams } = checkTx;
  const {
    REQUIRED_VALUE_TRANSFER_TX_PARAMETERS,
    REQUIRED_WRITER_ASSIGN_TX_PARAMETERS,
  } = constants;

  const user = new Account('');
  const valueTransferTxData = {
    from: user.pubKey,
    to: user.pubKey,
    value: '5',
    nonce: 3,
    type: 'binary',
  };
  const valueTransferTx = setTx(valueTransferTxData);

  const writerAssignTxData = {
    from: user.pubKey,
    nonce: 3,
    type: 'register_wkey',
    payload: {
      Writer: user.pubKey,
    },
  };
  const writerAssignTx = setTx(writerAssignTxData);

  it('Throw error if transaction doesn\'t have required params', () => {
    REQUIRED_VALUE_TRANSFER_TX_PARAMETERS.forEach((param) => {
      const tempTx = Object.assign(
        {},
        valueTransferTx,
        {
          [param]: undefined,
          data: {
            [param]: undefined,
          },
        },
      );
      if (param !== 'type') tempTx.data.type = 'binary';
      expect(() => checkRequiredParams(tempTx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS)).to.throw(Error, `Transaction should have ${param} field.`);
    });

    REQUIRED_WRITER_ASSIGN_TX_PARAMETERS.forEach((param) => {
      const tempTx = Object.assign(
        {},
        writerAssignTx,
        {
          [param]: undefined,
        },
      );
      tempTx.data = Object.assign({}, tempTx.data, { [param]: undefined });
      expect(() => checkRequiredParams(tempTx, REQUIRED_WRITER_ASSIGN_TX_PARAMETERS)).to.throw(Error, `Transaction should have ${param} field.`);
    });
  });
});
