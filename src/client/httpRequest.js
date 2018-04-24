import axios from 'axios';

// request sends HTTP request.
// TODO: Fix after HTTP spec confirmed
const request = config => axios(config).then(res => res.data);

// TODO: impl asyncRequest
const asyncRequest = () => {};

export { request, asyncRequest };
