const createDataPayload = hash => ({
  Hash: Buffer.from(hash, 'hex').toString('base64'),
});

export default {
  createDataPayload,
};
