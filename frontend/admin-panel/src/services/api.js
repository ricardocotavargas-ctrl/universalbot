import axios from 'axios';

// Detectar URL base automáticamente
const getAPIBaseURL = () => {
  // Si estamos en desarrollo
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  }
  
  // Si estamos en producción
  return process.env.REACT_APP_API_URL || 'https://universalbot-backend.onrender.com/api';
};

const API_BASE_URL = getAPIBaseURL();

console.log('📡 Conectando a API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos timeout
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('El servidor está tardando demasiado en responder. Intenta nuevamente.');
    }
    
    if (!error.response) {
      throw new Error('Error de conexión. Verifica tu internet.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
