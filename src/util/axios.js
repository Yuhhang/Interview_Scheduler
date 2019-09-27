import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://is.messi1.top/api',
  withCredentials: true,
  timeout: 10000,
});

export default instance;
