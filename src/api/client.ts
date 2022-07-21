import axios from 'axios';

const client = axios.create();

// client.defaults.baseURL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://192.168.0.55:10005'
//     : 'http://center.logiall.com:10002';

client.defaults.baseURL = 'http://center.logiall.com:10002';
export default client;
