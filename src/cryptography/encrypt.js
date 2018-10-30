import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from 'crypto';
import scryptsy from 'scrypt.js';
import _ from 'underscore';
import uuidv4 from 'uuid/v4';
import { sha3 } from 'utils';
import { getPubKey } from './keyGen';

const decryptData = (accessKey = '', encryptedData) => {
  if (!encryptedData) {
    return null;
  }
  const algorithm = 'AES-256-CTR';
  const textParts = encryptedData.split(':');
  if (textParts.length < 2) {
    throw new Error('Invalid encrypted data format');
  }
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const hashedAccessKey = sha3(accessKey);

  const decipher = createDecipheriv(algorithm, Buffer.from(hashedAccessKey, 'hex'), iv);
  const decryptedData = decipher.update(encryptedText, 'hex', 'utf8');

  try {
    return decryptedData + decipher.final('utf8');
  } catch (err) {
    throw new Error('Wrong Access Key');
  }
};

const decryptKey = (password, encryptedKey) => {
  if (!_.isString(password)) {
    throw new Error('Not a valid password');
  }
  const json = (_.isObject(encryptedKey)) ? encryptedKey : JSON.parse(encryptedKey);

  if (json.version !== 3) {
    throw new Error('Not a V3 wallet');
  }

  let derivedKey;
  let kdfParams;
  if (json.crypto.kdf === 'scrypt') {
    kdfParams = json.crypto.kdfparams;

    // FIXME: support progress reporting callback
    derivedKey = scryptsy(Buffer.from(password), Buffer.from(kdfParams.salt, 'hex'), kdfParams.n, kdfParams.r, kdfParams.p, kdfParams.dklen);
  } else if (json.crypto.kdf === 'pbkdf2') {
    kdfParams = json.crypto.kdfparams;

    if (kdfParams.prf !== 'hmac-sha256') {
      throw new Error('Unsupported parameters to PBKDF2');
    }

    derivedKey = pbkdf2Sync(Buffer.from(password), Buffer.from(kdfParams.salt, 'hex'), kdfParams.c, kdfParams.dklen, 'sha256');
  } else {
    throw new Error('Unsupported key derivation scheme');
  }
  const ciphertext = Buffer.from(json.crypto.ciphertext, 'hex');

  const mac = sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));
  if (mac.toString('hex') !== json.crypto.mac) {
    throw new Error('Key derivation failed - possibly wrong passphrase');
  }

  const decipher = createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), Buffer.from(json.crypto.cipherparams.iv, 'hex'));
  return ciphertext.length > 32 ?
    Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString() :
    Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('hex');
};

const encryptData = (accessKey = '', data) => {
  // TODO Need to get stream files also.
  if (!_.isString(data)) {
    throw new Error('Invalid msg type');
  }

  const algorithm = 'AES-256-CTR';
  const iv = randomBytes(16);
  const hashedAccessKey = sha3(accessKey);

  const cipher = createCipheriv(algorithm, Buffer.from(hashedAccessKey, 'hex'), iv);
  const encryptedText = `${cipher.update(data, 'utf8', 'hex')}${cipher.final('hex')}`;
  return `${iv.toString('hex')}:${encryptedText}`;
};

// Taken from https://github.com/ethereumjs/ethereumjs-wallet
const encryptKey = (password, privKey, options) => {
  const opts = options || {};
  const salt = opts.salt || randomBytes(32);
  const iv = opts.iv || randomBytes(16);

  let derivedKey;
  const kdf = opts.kdf || 'scrypt';
  const kdfparams = {
    dklen: opts.dklen || 32,
    salt: salt.toString('hex'),
  };

  if (kdf === 'pbkdf2') {
    kdfparams.c = opts.c || 262144;
    kdfparams.prf = 'hmac-sha256';
    derivedKey = pbkdf2Sync(Buffer.from(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
  } else if (kdf === 'scrypt') {
    // FIXME: support progress reporting callback
    kdfparams.n = opts.n || 8192;
    kdfparams.r = opts.r || 8;
    kdfparams.p = opts.p || 1;
    derivedKey = scryptsy(
      Buffer.from(password),
      salt,
      kdfparams.n,
      kdfparams.r,
      kdfparams.p,
      kdfparams.dklen,
    );
  } else {
    throw new Error('Unsupported kdf');
  }

  const cipher = createCipheriv(opts.cipher || 'aes-128-ctr', derivedKey.slice(0, 16), iv);
  if (!cipher) {
    throw new Error('Unsupported cipher');
  }

  const ciphertext = Buffer.concat([cipher.update(Buffer.from(privKey, 'hex')), cipher.final()]);

  const mac = sha3(Buffer.concat([derivedKey.slice(16, 32), Buffer.from(ciphertext, 'hex')]));

  return {
    version: 3,
    id: uuidv4({ random: opts.uuid || randomBytes(16) }),
    address: getPubKey(privKey),
    crypto: {
      ciphertext: ciphertext.toString('hex'),
      cipherparams: {
        iv: iv.toString('hex'),
      },
      cipher: opts.cipher || 'aes-128-ctr',
      kdf,
      kdfparams,
      mac: mac.toString('hex'),
    },
  };
};

// TODO
// export const encryptDataStream = () => {};

// TODO
// export const decryptDataStream = () => {};

export default {
  decryptData,
  decryptKey,
  encryptData,
  encryptKey,
};
