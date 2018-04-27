import axios from 'axios';

// request sends HTTP request.
// TODO: Fix after HTTP spec confirmed
const request = async (config) => {
  const res = await axios(config);
  return res.data;
};

// TODO: impl asyncRequest
const asyncRequest = () => {};

export default { request, asyncRequest };
