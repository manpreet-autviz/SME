import axios from 'axios';

const instance   = axios.create({
  baseURL: 'http://example.com/api/',
});

// Add a request interceptor to set token in header
instance .interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance