import axios from 'axios';

// ✅ URL CORRECTA DEL BACKEND EN RENDER
const API_BASE_URL = 'https://universalbot-dsko.onrender.com';

console.log('🔗 Conectando a API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // Aumentar timeout a 20 segundos
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
  console.log('📤 Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Interceptor para responses con mejor debugging
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Error de API:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.error || error.message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
