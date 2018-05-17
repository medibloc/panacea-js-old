import axios from 'axios';

// request sends HTTP request.
const request = config => axios(config).then(res => res.data);

// asyncRequest sends HTTP request and hands over the response to callback.
const asyncRequest = (config, cb) => request(config).then(res => cb(null, res)).catch(cb);

export default { request, asyncRequest };
