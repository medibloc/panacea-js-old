import { sign, verifySignature } from 'cryptography';
import { sha3 } from 'utils';

const createCertificate = ({
  expireDate,
  issuer, // highly recommend use webpage url as an issuer
  issuerAccount,
  issueDate,
  passphrase = '',
  pubKey,
}) => {
  if (!(expireDate > issueDate)) throw new Error('Expire date should be later than issue date.');

  const certificate = {
    expireDate,
    issuer,
    issueDate,
    pubKey,
  };
  const certificateHash = sha3(certificate);
  const privKey = issuerAccount.getDecryptedPrivateKey(passphrase);
  certificate.signature = sign(privKey, certificateHash);

  return certificate;
};

const verifyCertificate = (certificate, timeStamp, issuerPubKey) => {
  // check timestamp
  if (certificate.issueDate > timeStamp || certificate.expireDate < timeStamp) return false;

  // check signature owner
  if (!verifySignature(
    issuerPubKey,
    sha3(certificate),
    certificate.signature,
  )) return false;

  return true;
};

export default {
  createCertificate,
  verifyCertificate,
};
