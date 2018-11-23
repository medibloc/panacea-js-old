import axios from 'axios';
import http from 'http';
import https from 'https';


const connectedAxios = axios.create({
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
});

// request sends HTTP request.
const request = config => connectedAxios.request(config)
  .then(res => res.data)
  .catch((err) => { throw err.response; });

// asyncRequest sends HTTP request and hands over the response to callback.
const asyncRequest = (config, cb) => request(config).then(res => cb(null, res)).catch(cb);

export default { request, asyncRequest };
