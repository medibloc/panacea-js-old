import axios from 'axios';

// request sends HTTP request.
const request = config => axios(config)
  .then((res) => {
    // TODO: Fix after HTTP spec confirmed
    if (res.status >= 300) {
      if (res.body && res.body.message) {
        return {
          status: res.status,
          message: res.body.message,
        };
      }
      throw new Error(`Status ${res.status} : An unknown error has occurred.`);
    }
    return res.data;
  });

// TODO: impl asyncRequest
const asyncRequest = () => {};

export { request, asyncRequest };
