import axios from 'axios';

// TODO: Add retry logic
// request sends HTTP request. it execute errorCallback if request fails.
const request = (config, errorCallback) => axios(config)
  .then((res) => {
    // TODO: Fix after HTTP spec confirmed
    if (res.status >= 300) {
      throw new Error(`Status ${res.status}`);
    }
    return res.data;
  })
  .catch((err) => {
    errorCallback();
    // TODO: Fix after HTTP spec confirmed
    if (typeof err.response !== 'undefined') {
      throw new Error(err.response.data.error);
    } else {
      throw new Error(err.message);
    }
  });

// TODO: impl asyncRequest
const asyncRequest = () => {};

export { request, asyncRequest };
