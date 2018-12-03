import { expect } from 'chai';
import {
  createAddCertificationPayload,
  createDataPayload,
  createDefaultPayload,
  createRevokeCertificationPayload,
  createVotePayload,
  recoverPayloadWithType,
} from 'local/transaction/payload';
import {
  ADD_CERTIFICATION,
  DATA_UPLOAD,
  PAYLOAD_TYPES,
  REVOKE_CERTIFICATION,
  VALUE_TRANSFER,
  VOTE,
} from 'local/transaction/utils/constants';
import protobuf from 'protobufjs/light';
import * as jsonDescriptor from 'local/transaction/utils/proto/transaction.pb.json';


const genPayloadPb = (payload, type) => {
  const root = protobuf.Root.fromJSON(jsonDescriptor);
  const PayloadTarget = root.lookupType(type);
  const message = PayloadTarget.create(payload);
  return PayloadTarget.encode(message).finish().toString('hex');
};

describe('# payload', () => {
  describe('# createAddCertificationPayload', () => {
    it('should be matched with the expected result', () => {
      const type = PAYLOAD_TYPES[ADD_CERTIFICATION].charAt(0).toUpperCase() +
        PAYLOAD_TYPES[ADD_CERTIFICATION].slice(1);
      const payload = createAddCertificationPayload({
        issueTime: 1535002808,
        expirationTime: 1566538808,
        hash: '9eca7128409f609b2a72fc24985645665bbb99152b4b14261c3c3c93fb17cf54',
      });
      const target = '08b891f9db0510b8f8fdea051a209eca7128409f609b2a72fc24985645665bbb99152b4b14261c3c3c93fb17cf54';
      expect(genPayloadPb(payload, type)).to.be.eql(target);
      expect(recoverPayloadWithType(target, ADD_CERTIFICATION)).to.be.eql(payload);
    });
  });

  describe('# createDataPayload', () => {
    it('should be matched with the expected result', () => {
      const type = PAYLOAD_TYPES[DATA_UPLOAD].charAt(0).toUpperCase() +
        PAYLOAD_TYPES[DATA_UPLOAD].slice(1);
      const payload = createDataPayload('9eca7128409f609b2a72fc24985645665bbb99152b4b14261c3c3c93fb17cf54');
      const target = '0a209eca7128409f609b2a72fc24985645665bbb99152b4b14261c3c3c93fb17cf54';
      expect(genPayloadPb(payload, type)).to.be.eql(target);
      expect(recoverPayloadWithType(target, DATA_UPLOAD)).to.be.eql(payload);
    });
  });

  describe('# createDefaultPayload', () => {
    it('should be matched with the expected result', () => {
      const type = PAYLOAD_TYPES[VALUE_TRANSFER].charAt(0).toUpperCase() +
        PAYLOAD_TYPES[VALUE_TRANSFER].slice(1);
      const payload = createDefaultPayload('Hello MediBloc');
      const target = '0a0e48656c6c6f204d656469426c6f63';
      expect(genPayloadPb(payload, type)).to.be.eql(target);
      expect(recoverPayloadWithType(target, VALUE_TRANSFER)).to.be.eql(payload);
    });
  });

  describe('# createRevokeCertificationPayload', () => {
    it('should be matched with the expected result', () => {
      const type = PAYLOAD_TYPES[REVOKE_CERTIFICATION].charAt(0).toUpperCase() +
        PAYLOAD_TYPES[REVOKE_CERTIFICATION].slice(1);
      const payload = createRevokeCertificationPayload('9eca7128409f609b2a72fc24985645665bbb99152b4b14261c3c3c93fb17cf54');
      const target = '0a209eca7128409f609b2a72fc24985645665bbb99152b4b14261c3c3c93fb17cf54';
      expect(genPayloadPb(payload, type)).to.be.eql(target);
      expect(recoverPayloadWithType(target, REVOKE_CERTIFICATION)).to.be.eql(payload);
    });
  });

  describe('# createVotePayload', () => {
    it('should be matched with the expected result', () => {
      const type = PAYLOAD_TYPES[VOTE].charAt(0).toUpperCase() +
        PAYLOAD_TYPES[VOTE].slice(1);
      const payload = createVotePayload(['03528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c939',
        '03e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21']);
      const target = '0a2103528fa3684218f32c9fd7726a2839cff3ddef49d89bf4904af11bc12335f7c9390a2103e7b794e1de1851b52ab0b0b995cc87558963265a7b26630f26ea8bb9131a7e21';
      expect(genPayloadPb(payload, type)).to.be.eql(target);
      expect(recoverPayloadWithType(target, VOTE)).to.be.eql(payload);
    });
  });
});
