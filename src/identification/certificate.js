import { sign, hash } from 'cryptography';

const createCertificate = ({
  expireDate,
  issuer, // highly recommend use webpage url as an issuer
  issuerAccount,
  issueDate,
  passphrase,
  pubKey,
}) => {
  if (!(expireDate > issueDate)) throw new Error('Expire date should be later than issue date.');

  const certificate = {
    expireDate,
    issuer,
    issueDate,
    pubKey,
  };
  const certificateHash = hash.hashData(certificate);
  const privKey = issuerAccount.getDecryptedPrivateKey(passphrase);
  certificate.signature = sign.sign(privKey, certificateHash);

  return certificate;
};

const verifiyCertificate = (certificate, timeStamp, issuerPubKey) => {
  // check timestamp
  if (certificate.issueDate > timeStamp || certificate.expireDate < timeStamp) return false;

  // check signature owner
  if (!sign.verifySignature(
    issuerPubKey,
    hash.hashData(certificate),
    certificate.signature,
  )) return false;

  return true;
};

export default {
  createCertificate,
  verifiyCertificate,
};
