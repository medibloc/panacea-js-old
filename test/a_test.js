import assert from 'assert';
import { expect } from 'chai';
import { BETANET_NODES } from '../lib/utils/a';

describe('Utils utils utils!!!!', () => {
	it('Betanet_nodes should be ad type of url', () => {
		expect(BETANET_NODES).to.be.an('array');
		return BETANET_NODES.forEach(node => expect(node).to.be.a('string'));
	});
});

