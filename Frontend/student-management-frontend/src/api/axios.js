import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token before every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 🔑 retrieve token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('🚀 Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Debug response
instance.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default instance;
