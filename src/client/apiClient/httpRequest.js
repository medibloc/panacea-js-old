import axios from 'axios';

// TODO: Add retry logic
// request sends HTTP request. it execute errorCallback if request fails.
const request = (config, errorCallback) => axios(config)
  .then(res => res.data)
  .catch((err) => {
    errorCallback();
    if (typeof err.response !== 'undefined') {
      throw new Error(err.reseponse.data.error);
    } else {
      throw new Error(err.message);
    }
  });

// TODO: impl asyncRequest
const asyncRequest = () => {};

export { request, asyncRequest };
