import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://server.messi1.top/is/api/',
  withCredentials: true,
  timeout: 10000,
});

export default instance;
