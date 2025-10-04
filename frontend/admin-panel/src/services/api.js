import axios from 'axios';

// ✅ URL CORRECTA DEL BACKEND 
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://universalbot-dsko.onrender.com/api';

console.log('🔗 Conectando a API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log('📤 Request:', {
    method: config.method?.toUpperCase(),
    url: config.url,
    data: config.data
  });
  
  return config;
}, (error) => {
  console.error('❌ Request Error:', error);
  return Promise.reject(error);
});

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      responseData: error.response?.data
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Mejor manejo de errores
    const enhancedError = {
      ...error,
      message: error.response?.data?.message || error.message || 'Error de conexión',
      status: error.response?.status,
      data: error.response?.data
    };
    
    return Promise.reject(enhancedError);
  }
);

export default api;
