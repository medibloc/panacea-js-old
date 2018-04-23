export default (chai) => {
  chai.Assertion.addProperty('hexString', function handleAssert() {
    const { _obj: obj } = this;
    new chai.Assertion(obj).to.be.a('string');
    const expected = Buffer.from(obj, 'hex').toString('hex');
    this.assert(
      expected === obj,
      'expected #{this} to be a hexString',
      'expected #{this} not to be a hexString',
    );
  });
};
