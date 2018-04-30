import axios from 'axios';

// request sends HTTP request.
// TODO: Fix after HTTP spec confirmed
const request = async (config) => {
  try {
    const res = await axios(config);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// TODO: impl asyncRequest
const asyncRequest = () => {};

export default { request, asyncRequest };
