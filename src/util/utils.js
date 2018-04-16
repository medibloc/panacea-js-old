// import crypto from 'crypto';

// export const getByteLen = (str) => {
// 	return str.toString().replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;
// 	// var m = encodeURIComponent(str).match(/%[89ABab]/g);
// 	// return str.length + (m ? m.length : 0);
// };


// export const genHash = (message, algorithm = 'sha256') => {
// 	return crypto.createHash(algorithm).update(message).digest();
// };
