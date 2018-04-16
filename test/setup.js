import { Assertion } from 'chai';

Assertion.addProperty('hexString', function handleAssert(){
	const obj = this._obj;
	new Assertion(obj).to.be.a('string');
	const expected = Buffer.from(obj, 'hex').toString('hex');
	this.assert(
		expected === obj,
		'expected #{this} to be a hexString',
		'expected #{this} not to be a hexString',
	);
});
