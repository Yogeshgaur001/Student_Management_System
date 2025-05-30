import axios from 'axios';

// 🔧 Create a reusable axios instance
const instance = axios.create({
  baseURL: 'http://localhost:3000', // ✅ adjust if needed for production
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Add Authorization header if token exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🔍 Dev logging (disable in prod)
    if (import.meta.env.MODE === 'development') {
      console.log('🚀 Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// ✅ Handle and debug responses
instance.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === 'development') {
      console.log('✅ Response:', response.data);
    }
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Optional: handle auth error globally
    if (error.response?.status === 401) {
      // localStorage.removeItem('token'); // if you want to force logout
      // window.location.href = '/login';  // optional redirect
    }

    return Promise.reject(error);
  }
);

export default instance;
