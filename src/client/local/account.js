import { keyGen, encrypt } from '../../crypto';


export default class Account {
	constructor(passphrase, privKey = '') {
		if (privKey === '') this.generateAccount(passphrase);
		else this.setEncryptedPrivateKey(privKey);
	}

	// generate new keypair and register.
	generateAccount(passphrase) {
		const keyPair = keyGen.getKeyPair();
		this.privKey = encrypt.encryptData(passphrase, keyPair.privKey);
		this.pubKey = keyPair.pubKey;
	}

	// set encrypted private key
	setEncryptedPrivateKey(passphrase, encryptedPrivKey) {
		let pubKey = '';
		try {
			const privKey = encrypt.decryptData(passphrase, encryptedPrivKey);
			pubKey = keyGen.getPubKey(privKey);
		} catch (err) {
			throw err;
		}
		this.privKey = encryptedPrivKey;
		this.pubKey = pubKey;
	}

	// get decrypted private key
	getPrivateKey(passphrase) {
		try {
			const privKey = encrypt.decryptData(passphrase, this.privKey);
			return privKey;
		} catch (err) {
			throw err;
		}
	}

	// get account information.
	getAccount() {
		const { privKey, pubKey } = this;
		return { privKey, pubKey };
	}
}
