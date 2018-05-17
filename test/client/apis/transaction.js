// import { expect } from 'chai';
// import { encrypt } from 'cryptography';
// import client from 'client/client';
// import { Account } from 'local/account';

// describe('account api', () => {
//   const defaultNodes = ['http://localhost:10000'];

//   describe('#getAccountState', () => {
//     let newClient;
//     let user1;
//     let user2;
//     beforeEach(() => {
//       newClient = client(defaultNodes);
//       const passphrase1 = 'test1';
//       const passphrase2 = 'test2';
//       const privKey1 = 'ee8ea71e9501306fdd00c6e58b2ede51ca125a583858947ff8e309abf11d37ea';
//       const encPrivKey1 = encrypt.encryptData(passphrase1, privKey1);
//       user1 = new Account(passphrase1, encPrivKey1);
//       user2 = new Account(passphrase2);
//       return Promise.resolve();
//     });

//     it('should retuns correct account state', () => {

//       newClient.getAccountState()

//       return expect(newClient)
//         .to.be.an('object');
//     });
//   });
// });
