import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://interview.microsoftstudent.club/api',
  withCredentials: true,
  timeout: 10000,
});

export default instance;
